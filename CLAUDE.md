# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Hack The Earth" — a Three.js scene of a rotating globe that the user zooms through three stages (title → global overview → content). Zooming into a region ("continent") reveals a textured content panel with a header, stat labels, and a back button. Built with vanilla JS + Vite, no framework.

## Commands

```bash
npm install       # install dependencies
npx vite           # start the dev server
npx vite build      # production build -> dist/
npm run deploy      # build, then publish dist/ to gh-pages via `gh-pages -d dist`
```

There is no test suite and no linter configured in this repo.

`vite-plugin-glsl` is registered in `vite.config.js`, so files under `src/shaders/` are processed (with `#include` resolution) and available as strings. consumers now pull them through the `Assets` registry as a `'shader'` asset rather than importing each file directly (`earth.js` still has two leftover, now-unused `import ... from '../../shaders/atmosphere/*.glsl'` lines) — see "Shaders" below.

Deployment also happens automatically via `.github/workflows/deploy.yml` (builds with `npx vite build` and deploys `dist/` to GitHub Pages). Note the workflow's trigger is `on: push: breanches: [main]` — that's a typo for `branches`, so as written the workflow will not actually trigger on pushes to `main`.

`vite.config.js` sets `base: '/hacktheearth/'`, which matters for asset URLs both in dev and in the built output.

## Architecture

### Static-class module pattern

There are no long-lived instances passed around. Every core system (`World`, `Camera`, `Zoom`, `Assets`, `Input`, `Lights`, `Debug`, `Renderer`) is a class used purely for its `static` members — state lives on the class itself, and setup happens through an explicit `Init()`/`CreateScene()` static method rather than a constructor. When reading or extending one of these, treat the class as a namespaced singleton module, not an object you instantiate.

`Earth`, `Continent`, `Button`, and `Label` are the exception — these *are* instantiated normally (`new Earth(scene)`, `new Continent(scene, config)`, etc.) because a scene can have more than one of them.

### Startup sequence (`src/main.js`)

Two core singletons are now constructed at class-body level so they exist before any `Init()` runs: `World.scene = new three.Scene()` and `Camera.camera = new three.PerspectiveCamera(...)`. This lets `Renderer.Init` receive both up front. `World.Init` and the camera construction inside `Camera.Init` are correspondingly gutted (mostly commented out).

1. `Debug.Init()` — appends the `stats.js` FPS panel to the DOM.
2. `Renderer.Init(World.scene, Camera.camera)` — builds the `WebGLRenderer` + `EffectComposer` post-processing chain and appends the canvas (see "Renderer" below).
3. `World.Init(renderer)` — now essentially a no-op; just stashes the renderer reference. The axes helper moved to `CreateScene`.
4. `Debug.Toggle()` — hides the `lil-gui` panel *and* the stats panel by default; the backtick/tilde key (wired in `main.js`'s `OnKeydown`) toggles both back on.
5. `Assets.Init(callback)` + `Assets.LoadList(config.assets)` — kicks off async loading of every asset in `src/config.js`, wrapped in a `three.LoadingManager`. `Assets` also drives the `.loading-bar` DOM element via `onProgress`/`onLoad`.
6. When loading completes (`CreateScenePostLoad`): `World.CreateScene()` calls `Camera.Init()`, then `Lights.Init(scene)`, then builds the `Earth`, calls `Button.Init()`, and instantiates one `Continent` per entry in `config.continents`. Then `Camera.HideLoadingOverlay()` fades the camera-parented black overlay plane, and `Input.Init()` wires up all DOM event listeners. A module-level `loaded` flag flips true.
7. The render loop is registered unconditionally at module top-level (no more `Start()` function): each frame runs `Debug.UpdateStart()` → `World.Update(time)` (guarded by `loaded`) → `Renderer.Render()` → `Debug.UpdateEnd()`.

**Resize handling** is no longer in `main.js` — it's split: `Renderer.OnWindowResize` resizes the renderer + composer, and a listener added inside `Camera.Init` updates the camera aspect.

Content (which continents exist, their labels, camera angles, and which loaded assets they use) is entirely data-driven from `src/config.js` — adding a new zoomable region ("Sponsors", "Team", etc.) means adding an entry to `config.continents` and pointing it at assets already listed in `config.assets`, not writing new scene-building code.

### The zoom system (`src/components/zoom.js`)

`Zoom.zoomLayer` is `0` (title) / `1` (far — full globe) / `2` (near — inside a continent). `Zoom.UpdateZoomLayer(±1)` drives a single gsap tween of a shared `tweenObj` (`progress`, `prevProgress`, `titleScale`, `farScale`, `nearScale`, `currentLayer`, `newLayer`) and is the only thing that advances `zoomLayer`.

Other systems never poll `zoomLayer` inside `Zoom` itself — they register callbacks on `Zoom` and react:
- `AddZoomCondition(fn)` — called before a transition starts; returning `false` vetoes the zoom. `Continent.FindValidCameraPos` is registered here (from `World.CreateScene`) to block zooming into layer 2 unless the camera is aimed near a continent's camera position — and as a side effect it sets `Camera.targetCameraPos` and marks that continent `#active`.
- `AddZoomStartListener(fn)` / `AddZoomListener(fn)` (fires every tween tick) / `AddZoomEndListener(fn)` — `Camera`, `Earth`, and `Continent` all register listeners in their constructors to animate their own scale/color/position in response, so `Zoom` itself has no knowledge of what's in the scene.

This is the main extension point: a new interactive object usually means calling `Zoom.AddZoomListener`/`AddZoomEndListener` in its constructor rather than modifying `Zoom` or `World`.

### Renderer (`src/components/renderer.js`)

New, untracked module that took the renderer setup out of `main.js`. Owns a static `three.WebGLRenderer` and an `EffectComposer` (`Renderer.effects`). `Renderer.Init(scene, camera)` configures the renderer (`PCFShadowMap` shadows, `CineonToneMapping`, `SRGBColorSpace` output, pixel ratio capped at 2), appends the canvas, and builds the post-processing chain: `RenderPass` → `ShaderPass(GammaCorrectionShader)` → `SMAAPass`. `effects.passes[2]` (SMAA) is disabled when the device pixel ratio is > 1. `Renderer.Render()` calls `effects.render()` (the old `renderer.render(scene, camera)` path in `main.js` is gone). `Renderer` also owns its own `resize` listener.

Note: the `WebGLRenderer` is now constructed with no options — the `{ stencil: ... }` flag that used to be in `main.js` is gone entirely. References to that flag elsewhere in this doc are stale; the dead stencil-buffer technique described under "Earth" is unaffected (it was already dead code).

### Camera (`src/components/camera.js`)

Owns the `three.PerspectiveCamera` and `OrbitControls`. Position is driven two different ways depending on zoom layer: layers 0↔1 interpolate camera distance from origin along the current direction (`CAMERA_ZOOM_DISTANCE`), while entering layer 2 lerps the camera toward `Camera.targetCameraPos` (set by `Continent.FindValidCameraPos`).

`Camera` also owns a `Raycaster`-based hover/click system independent of zoom: `Camera.AddRaycastListener(mesh, hoverCallback, clickCallback)` registers an object to be tested every frame against `Input.cursor`; `Button` uses this for its back-button click handling.

`Camera.Init` also builds a **loading overlay** — a `PlaneGeometry(2, 2)` with an inline `ShaderMaterial` (clip-space passthrough vert, solid black frag with a `uAlpha` uniform) parented directly to the camera so it fills the view. `Camera.HideLoadingOverlay()` (called from `CreateScenePostLoad`) gsap-tweens `uAlpha` to 0 over 3s. This is separate from the `.loading-bar` DOM element driven by `Assets`.

### Input (`src/components/input.js`)

Single place for all raw DOM listeners (pointer/wheel/mouse/touch). Normalizes cursor position, detects double-click/double-tap (maps to `Zoom.OnDoubleClick`), wheel scroll (`Zoom.OnScroll`), and on mobile (`Utility.IsMoble()`) a fast-swipe gesture that zooms out. Anything needing raw input should add a listener here rather than attaching to `window` elsewhere.

### Assets (`src/components/assets.js`)

Static registry wrapping three.js's `GLTFLoader` (+`DRACOLoader`), `TextureLoader`, `FontLoader`, and `HDRLoader`. `Assets.LoadList(config.assets)` fires all loads; every other system fetches a finished asset by name via `Assets.GetAsset(name)`, which asserts if the name isn't loaded yet — so anything reading an asset must run after the `Assets.Init` load-complete callback. Asset `type` in `config.js` selects the loader:
- `'model'`, `'texture'`, `'font'`
- `'dataTexture'` — a `TextureLoader` load forced to `three.NoColorSpace` (textures read as data, e.g. the tree density map, not as sRGB color)
- `'enviroment'` — HDR via `HDRLoader`, mapped `EquirectangularRefractionMapping`, consumed by `Lights.Init` as `scene.environment`
- `'shader'` — synchronous, not a loader. `path` names a *folder* under `src/shaders/` (e.g. `'shaders/water'`). Every `.glsl` under `src/shaders/` is eagerly pulled at module load via `import.meta.glob('../shaders/**/*.glsl', { eager: true, import: 'default' })` (so `vite-plugin-glsl` still resolves `#include`s), then filtered to the requested folder and returned as a bundle keyed by file stem — e.g. `Assets.GetAsset('waterShader')` → `{ includes, vertex, fragment }`.

The load-progress hooks live in the `Assets` constructor: `onProgress` scales the `.loading-bar` DOM element (`scaleX(loaded/total)`), and `onLoad` runs the callback then gsap-animates the bar back to 0.

### Lights (`src/components/lights.js`)

`Lights.Init(scene)` (called from `World.CreateScene`, after `Camera.Init`) creates the single `three.DirectionalLight` (with shadow camera bounds), adds a purely decorative white `IcosahedronGeometry` "sun" mesh at the light's position × 5, and sets `scene.environment` to the loaded `enviroment` HDR asset plus `scene.environmentIntensity`. `Lights.directionalLight` is exposed statically — `Earth`'s atmosphere shader reads `Lights.directionalLight.position` every frame to compute its day/night terminator. (The `DirectionalLightHelper` is commented out.)

### Debug (`src/components/debug.js`)

Wraps a single static `lil-gui` instance *and* a `stats.js` FPS panel. `Debug.Init()` (first call in `main.js`) mounts the stats panel. `Debug.GetFoulder(name)` (sic — folder) returns a closed `GUI` folder for a system to add controls to; `Debug.Toggle()` shows/hides both the GUI and the stats DOM and is wired to the backtick/tilde key in `main.js`. `Debug.UpdateStart`/`Debug.UpdateEnd` (aliases of `stats.begin`/`stats.end`) bracket the work in the render loop. Consumers: `Earth`'s atmosphere day/night colors, and a `"world"` folder with a `debugDraws` toggle for the axes helper.

### Label (`src/components/objects/label.js`)

Builds 3D text out of individual per-letter meshes (`TextGeometry`) rather than a single mesh, so each letter can be positioned along a curve. Two placement modes:
- `PositionText(long, lati, distance)` — wraps letters around the globe surface at a given spherical coordinate (used for continent headers and stat labels).
- `PositionTextTop(rotation, distance)` — arcs letters in a flat plane above the camera (used only for the title).

`Utility.GetSphericalPosition(long, lati, distance)` (angles in radians) is the shared coordinate system used throughout — labels, continent camera positions, and the back button (`Button`) all position themselves in it. `Utility.PositionObjWithCamera({ controls, obj, dist, longRemap, laitRemap })` builds on top of it to place an object relative to the current camera orbit angle (via `AzimuthalToLong`/`PolarToLati`) — used by `Earth` to keep the title label facing the camera.

### Earth (`src/components/objects/earth.js`)

The `earth` GLTF (`config.assets` → `'earth'`) has two children: `earth.children[0]` is the water mesh, `earth.children[1]` is a group of `[landSuface, landBellow]` — the flat continent tops, and the geometry underneath water plus the vertical cliff edge between land and sea. Water's geometry is replaced with a plain `IcosahedronGeometry`, and its material gets a custom vertex shader (see "Shaders" below) that displaces each vertex outward along its normal by Perlin noise, producing waves.

**Land/water overlap:** the water waves can rise above land locally, which used to make water render on top of land at coastlines. An earlier attempt fixed this with a stencil-buffer trick — land wrote to the stencil buffer and water discarded fragments where the stencil was set — but that made land geometry on the *far* side of the globe (whose triangles can still face the camera at a bump, escaping backface culling) incorrectly veto the water that should have been occluding it, since the stencil test rejects a fragment before depth is ever considered. That code is now dead (commented out in `Earth.SeperateLandMaterials` and in `Continent`'s constructor) in favor of a much simpler fix: the wave displacement itself is clamped (`min(abs(perlinClassic3D(...)), 0.7) * normal * 0.05` in `src/shaders/water/vertex.glsl`) and the base water radius was pulled in from `1.03` to `1`, so waves are kept short enough to stay under land in practice. If wave-vs-land popping resurfaces (e.g. after retuning wave height), the stencil/UV-mask approaches are the fallback, not the clamp value alone.

`Earth` also builds an **atmosphere** shell (`IcosahedronGeometry(1.15, 3)`, `BackSide`, transparent `ShaderMaterial` — `depthWrite: false`, `precision: 'lowp'`) — a Fresnel-edge glow that blends `uDayColor`/`uNightColor` (tunable via `Debug.GetFoulder('atmosphere_material')`) based on `uLightPosition`. The fake specular sun-glint is commented out in `atmosphere/fragment.glsl`. There is also a commented-out `atmospherePlane` (a `CircleGeometry` billboard) experiment; the `#atmospherePlane` field and a `lookAt` call in `Update` are dead as long as it stays commented.

`Earth.#CreateProps(scene)` scatters trees, now as **instanced meshes**: `Utility.GeneratePoissonDiskPoints` produces evenly-spaced sample points over a 2D UV rectangle, each is tested against the `treeDistribution` data texture via `Utility.SampleTextureUV` (grayscale density, rejection-sampled against `Math.random()`), and surviving points are turned into `Matrix4` transforms on the globe surface via `Utility.GetSphericalPosition` + `Utility.RotationMatrixFromDownVector`. The `trees_2.glb` model has 5 variant meshes; `Utility.RandomIntegersSummingTo(count, 5)` splits the surviving count among them, and each variant becomes one `InstancedMesh` sharing a single `MeshStandardMaterial` (`vertexColors: true`; the per-variant GLTF materials are `dispose()`d). A separate `InstancedMesh` of invisible `ConeGeometry` handles shadow casting. Trees now barely shrink on zoom (`propScale = 1 - tweenObj.nearScale * 0.2`), via the same `Zoom.AddZoomListener` callback that drives land color and cloud/title scale.

### Continent (`src/components/objects/continent.js`)

A continent's model (`config.continents[i].modelFile`) can be either a single mesh or a `Group` shaped like `Earth`'s land (`[surface, bellow]`) — `Continent` checks `model.isGroup` and assigns/copies the flat `farEarthColor` material onto whichever shape it finds. The stencil-based material split (`Earth.SeperateLandMaterials`) was tried here too and is now commented out for the same reason described under "Earth".

### Shaders (`src/shaders/`)

Plain `.glsl` files processed by `vite-plugin-glsl` (which resolves `#include`s) and spliced into `MeshStandardMaterial`/`ShaderMaterial` instances through `onBeforeCompile`, replacing include points like `#include <common>` and `#include <begin_vertex>` rather than building materials from scratch. `src/shaders/includes/noise.glsl` holds the shared Perlin noise function (`perlinClassic3D`). `water/` is the wave displacement described above; `atmosphere/` is a from-scratch vertex+fragment `ShaderMaterial` (not an override) for the glow shell.

`earth.js` no longer `import`s these files one-by-one — it fetches folder bundles from the asset registry (`Assets.GetAsset('waterShader').vertex` etc.), declared as `type: 'shader'` entries in `config.js`. See "Assets" above for how the bundle is built. `water/fragment.glsl` is a stub (`this file should be unused`) — the water material is `MeshStandardMaterial` and only its vertex stage is overridden.

### Directory layout

- `src/main.js` — entry point; init order and render loop (resize handling now lives in `renderer.js` and `camera.js`).
- `src/config.js` — data: the asset manifest and per-continent content config.
- `src/components/world.js`, `camera.js`, `zoom.js`, `input.js`, `assets.js`, `lights.js`, `debug.js`, `renderer.js`, `utility.js` — core static systems.
- `src/components/objects/` — `earth.js`, `continent.js`, `label.js`, `button.js` — instantiable scene content built from `config.js`.
- `src/shaders/` — `.glsl` source used by `earth.js` via `vite-plugin-glsl` imports; see "Shaders" above.
