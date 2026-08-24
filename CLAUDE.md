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

`vite-plugin-glsl` is registered in `vite.config.js`, so files under `src/shaders/` are imported directly as strings (e.g. `import vertexShader from '../../shaders/water/vertex.glsl'`) and spliced into Three.js materials via `onBeforeCompile` — see "Shaders" below.

Deployment also happens automatically via `.github/workflows/deploy.yml` (builds with `npx vite build` and deploys `dist/` to GitHub Pages). Note the workflow's trigger is `on: push: breanches: [main]` — that's a typo for `branches`, so as written the workflow will not actually trigger on pushes to `main`.

`vite.config.js` sets `base: '/hacktheearth/'`, which matters for asset URLs both in dev and in the built output.

## Architecture

### Static-class module pattern

There are no long-lived instances passed around. Every core system (`World`, `Camera`, `Zoom`, `Assets`, `Input`, `Lights`, `Debug`) is a class used purely for its `static` members — state lives on the class itself, and setup happens through an explicit `Init()`/`CreateScene()` static method rather than a constructor. When reading or extending one of these, treat the class as a namespaced singleton module, not an object you instantiate.

`Earth`, `Continent`, `Button`, and `Label` are the exception — these *are* instantiated normally (`new Earth(scene)`, `new Continent(scene, config)`, etc.) because a scene can have more than one of them.

### Startup sequence (`src/main.js`)

1. `World.Init(renderer)` — creates the `three.Scene` and axes helper only. No lights, camera, or earth yet. The `WebGLRenderer` is constructed with `{ stencil: true }` — a holdover from a since-abandoned stencil-buffer technique (see "Earth" below); nothing currently reads the stencil buffer, but nothing depends on removing the flag either.
2. `Debug.Toggle()` — hides the `lil-gui` debug panel by default (it's visible by construction); the backtick/tilde key (wired in `main.js`'s `OnKeydown`) toggles it back on.
3. `Assets.Init(callback)` + `Assets.LoadList(config.assets)` — kicks off async loading of every model/texture/font/HDR listed in `src/config.js`, wrapped in a `three.LoadingManager`.
4. When loading completes (`CreateScenePostLoad`): `World.CreateScene()` calls `Camera.Init()`, then `Lights.Init(scene)` (directional light + HDR `scene.environment`), then builds the `Earth`, calls `Button.Init()`, and instantiates one `Continent` per entry in `config.continents`. Then `Input.Init()` wires up all DOM event listeners.
5. `Start()` kicks off `renderer.setAnimationLoop`, which calls `World.Update(time)` every frame.

Content (which continents exist, their labels, camera angles, and which loaded assets they use) is entirely data-driven from `src/config.js` — adding a new zoomable region ("Sponsors", "Team", etc.) means adding an entry to `config.continents` and pointing it at assets already listed in `config.assets`, not writing new scene-building code.

### The zoom system (`src/components/zoom.js`)

`Zoom.zoomLayer` is `0` (title) / `1` (far — full globe) / `2` (near — inside a continent). `Zoom.UpdateZoomLayer(±1)` drives a single gsap tween of a shared `tweenObj` (`progress`, `prevProgress`, `titleScale`, `farScale`, `nearScale`, `currentLayer`, `newLayer`) and is the only thing that advances `zoomLayer`.

Other systems never poll `zoomLayer` inside `Zoom` itself — they register callbacks on `Zoom` and react:
- `AddZoomCondition(fn)` — called before a transition starts; returning `false` vetoes the zoom. `Continent.FindValidCameraPos` is registered here (from `World.CreateScene`) to block zooming into layer 2 unless the camera is aimed near a continent's camera position — and as a side effect it sets `Camera.targetCameraPos` and marks that continent `#active`.
- `AddZoomStartListener(fn)` / `AddZoomListener(fn)` (fires every tween tick) / `AddZoomEndListener(fn)` — `Camera`, `Earth`, and `Continent` all register listeners in their constructors to animate their own scale/color/position in response, so `Zoom` itself has no knowledge of what's in the scene.

This is the main extension point: a new interactive object usually means calling `Zoom.AddZoomListener`/`AddZoomEndListener` in its constructor rather than modifying `Zoom` or `World`.

### Camera (`src/components/camera.js`)

Owns the `three.PerspectiveCamera` and `OrbitControls`. Position is driven two different ways depending on zoom layer: layers 0↔1 interpolate camera distance from origin along the current direction (`CAMERA_ZOOM_DISTANCE`), while entering layer 2 lerps the camera toward `Camera.targetCameraPos` (set by `Continent.FindValidCameraPos`).

`Camera` also owns a `Raycaster`-based hover/click system independent of zoom: `Camera.AddRaycastListener(mesh, hoverCallback, clickCallback)` registers an object to be tested every frame against `Input.cursor`; `Button` uses this for its back-button click handling.

### Input (`src/components/input.js`)

Single place for all raw DOM listeners (pointer/wheel/mouse/touch). Normalizes cursor position, detects double-click/double-tap (maps to `Zoom.OnDoubleClick`), wheel scroll (`Zoom.OnScroll`), and on mobile (`Utility.IsMoble()`) a fast-swipe gesture that zooms out. Anything needing raw input should add a listener here rather than attaching to `window` elsewhere.

### Assets (`src/components/assets.js`)

Static registry wrapping three.js's `GLTFLoader` (+`DRACOLoader`), `TextureLoader`, `FontLoader`, and `HDRLoader`. `Assets.LoadList(config.assets)` fires all loads; every other system fetches a finished asset by name via `Assets.GetAsset(name)`, which asserts if the name isn't loaded yet — so anything reading an asset must run after the `Assets.Init` load-complete callback. Asset `type` in `config.js` selects the loader: `'model'`, `'texture'`, `'font'`, `'dataTexture'` (a `TextureLoader` load forced to `three.NoColorSpace` — for textures read as data, e.g. the tree density map, not as sRGB color), and `'enviroment'` (HDR via `HDRLoader`, mapped `EquirectangularRefractionMapping`, consumed by `Lights.Init` as `scene.environment`).

### Lights (`src/components/lights.js`)

`Lights.Init(scene)` (called from `World.CreateScene`, after `Camera.Init`) creates the single `three.DirectionalLight` (with shadow camera bounds) and sets `scene.environment` to the loaded `enviroment` HDR asset plus `scene.environmentIntensity`. `Lights.directionalLight` is exposed statically — `Earth`'s atmosphere shader reads `Lights.directionalLight.position` every frame to compute its day/night terminator.

### Debug (`src/components/debug.js`)

Thin wrapper around a single static `lil-gui` instance. `Debug.GetFoulder(name)` (sic — folder) returns a closed `GUI` folder for a system to add controls to; `Debug.Toggle()` shows/hides the whole panel and is wired to the backtick/tilde key in `main.js`. `Earth`'s atmosphere day/night colors are the current example consumer.

### Label (`src/components/objects/label.js`)

Builds 3D text out of individual per-letter meshes (`TextGeometry`) rather than a single mesh, so each letter can be positioned along a curve. Two placement modes:
- `PositionText(long, lati, distance)` — wraps letters around the globe surface at a given spherical coordinate (used for continent headers and stat labels).
- `PositionTextTop(rotation, distance)` — arcs letters in a flat plane above the camera (used only for the title).

`Utility.GetSphericalPosition(long, lati, distance)` (angles in radians) is the shared coordinate system used throughout — labels, continent camera positions, and the back button (`Button`) all position themselves in it. `Utility.PositionObjWithCamera({ controls, obj, dist, longRemap, laitRemap })` builds on top of it to place an object relative to the current camera orbit angle (via `AzimuthalToLong`/`PolarToLati`) — used by `Earth` to keep the title label facing the camera.

### Earth (`src/components/objects/earth.js`)

The `earth` GLTF (`config.assets` → `'earth'`) has two children: `earth.children[0]` is the water mesh, `earth.children[1]` is a group of `[landSuface, landBellow]` — the flat continent tops, and the geometry underneath water plus the vertical cliff edge between land and sea. Water's geometry is replaced with a plain `IcosahedronGeometry`, and its material gets a custom vertex shader (see "Shaders" below) that displaces each vertex outward along its normal by Perlin noise, producing waves.

**Land/water overlap:** the water waves can rise above land locally, which used to make water render on top of land at coastlines. An earlier attempt fixed this with a stencil-buffer trick — land wrote to the stencil buffer and water discarded fragments where the stencil was set — but that made land geometry on the *far* side of the globe (whose triangles can still face the camera at a bump, escaping backface culling) incorrectly veto the water that should have been occluding it, since the stencil test rejects a fragment before depth is ever considered. That code is now dead (commented out in `Earth.SeperateLandMaterials` and in `Continent`'s constructor) in favor of a much simpler fix: the wave displacement itself is clamped (`min(abs(perlinClassic3D(...)), 0.7) * normal * 0.05` in `src/shaders/water/vertex.glsl`) and the base water radius was pulled in from `1.03` to `1`, so waves are kept short enough to stay under land in practice. `renderer`'s `{ stencil: true }` flag in `main.js` is a harmless leftover from the old approach. If wave-vs-land popping resurfaces (e.g. after retuning wave height), the stencil/UV-mask approaches are the fallback, not the clamp value alone.

`Earth` also builds an **atmosphere** shell (`IcosahedronGeometry(1.15, 3)`, `BackSide`, transparent `ShaderMaterial` from `src/shaders/atmosphere/`) — a Fresnel-edge glow that blends `uDayColor`/`uNightColor` (tunable via `Debug.GetFoulder('atmosphere_material')`) based on `uLightPosition`, and fakes a specular sun glint reflected off `viewMatrix`'s right axis.

`Earth.#CreateProps(scene)` scatters trees: `Utility.GeneratePoissonDiskPoints` produces evenly-spaced sample points over a 2D UV rectangle, each is tested against the `treeDistribution` data texture via `Utility.SampleTextureUV` (grayscale density, rejection-sampled against `Math.random()`), and surviving points are placed on the globe surface via `Utility.GetSphericalPosition` with a coordinate remap to match the texture's UV layout. Trees scale down to zero (`propScale = 1 - tweenObj.nearScale`) as the camera zooms into a continent, via the same `Zoom.AddZoomListener` callback that drives land color and cloud/title scale.

### Continent (`src/components/objects/continent.js`)

A continent's model (`config.continents[i].modelFile`) can be either a single mesh or a `Group` shaped like `Earth`'s land (`[surface, bellow]`) — `Continent` checks `model.isGroup` and assigns/copies the flat `farEarthColor` material onto whichever shape it finds. The stencil-based material split (`Earth.SeperateLandMaterials`) was tried here too and is now commented out for the same reason described under "Earth".

### Shaders (`src/shaders/`)

Plain `.glsl` files imported as strings (via `vite-plugin-glsl`) and spliced into `MeshStandardMaterial`/`ShaderMaterial` instances through `onBeforeCompile`, replacing include points like `#include <common>` and `#include <begin_vertex>` rather than building materials from scratch. `src/shaders/includes/noise.glsl` holds the shared Perlin noise function (`perlinClassic3D`). `water/` is the wave displacement described above; `atmosphere/` is a from-scratch vertex+fragment `ShaderMaterial` (not an override) for the glow shell.

### Directory layout

- `src/main.js` — entry point; init order, resize handling, render loop.
- `src/config.js` — data: the asset manifest and per-continent content config.
- `src/components/world.js`, `camera.js`, `zoom.js`, `input.js`, `assets.js`, `lights.js`, `debug.js`, `utility.js` — core static systems.
- `src/components/objects/` — `earth.js`, `continent.js`, `label.js`, `button.js` — instantiable scene content built from `config.js`.
- `src/shaders/` — `.glsl` source used by `earth.js` via `vite-plugin-glsl` imports; see "Shaders" above.
