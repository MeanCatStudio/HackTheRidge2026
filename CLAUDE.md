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

Deployment also happens automatically via `.github/workflows/deploy.yml` (builds with `npx vite build` and deploys `dist/` to GitHub Pages). Note the workflow's trigger is `on: push: breanches: [main]` — that's a typo for `branches`, so as written the workflow will not actually trigger on pushes to `main`.

`vite.config.js` sets `base: '/hacktheearth/'`, which matters for asset URLs both in dev and in the built output.

## Architecture

### Static-class module pattern

There are no long-lived instances passed around. Every core system (`World`, `Camera`, `Zoom`, `Assets`, `Input`) is a class used purely for its `static` members — state lives on the class itself, and setup happens through an explicit `Init()`/`CreateScene()` static method rather than a constructor. When reading or extending one of these, treat the class as a namespaced singleton module, not an object you instantiate.

`Earth`, `Continent`, `Button`, and `Label` are the exception — these *are* instantiated normally (`new Earth(scene)`, `new Continent(scene, config)`, etc.) because a scene can have more than one of them.

### Startup sequence (`src/main.js`)

1. `World.Init(renderer)` — creates the `three.Scene`, lights, and axes helper. No camera or earth yet.
2. `Assets.Init(callback)` + `Assets.LoadList(config.assets)` — kicks off async loading of every model/texture/font listed in `src/config.js`, wrapped in a `three.LoadingManager`.
3. When loading completes (`CreateScenePostLoad`): `World.CreateScene()` creates the `Camera`, builds the `Earth`, calls `Button.Init()`, and instantiates one `Continent` per entry in `config.continents`. Then `Input.Init()` wires up all DOM event listeners.
4. `Start()` kicks off `renderer.setAnimationLoop`, which calls `World.Update(time)` every frame.

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

Static registry wrapping three.js's `GLTFLoader` (+`DRACOLoader`), `TextureLoader`, and `FontLoader`. `Assets.LoadList(config.assets)` fires all loads; every other system fetches a finished asset by name via `Assets.GetAsset(name)`, which asserts if the name isn't loaded yet — so anything reading an asset must run after the `Assets.Init` load-complete callback.

### Label (`src/components/objects/label.js`)

Builds 3D text out of individual per-letter meshes (`TextGeometry`) rather than a single mesh, so each letter can be positioned along a curve. Two placement modes:
- `PositionText(long, lati, distance)` — wraps letters around the globe surface at a given spherical coordinate (used for continent headers and stat labels).
- `PositionTextTop(rotation, distance)` — arcs letters in a flat plane above the camera (used only for the title).

`Utility.GetSphericalPosition(long, lati, distance)` (angles in radians) is the shared coordinate system used throughout — labels, continent camera positions, and the back button (`Button`) all position themselves in it.

### Directory layout

- `src/main.js` — entry point; init order, resize handling, render loop.
- `src/config.js` — data: the asset manifest and per-continent content config.
- `src/components/world.js`, `camera.js`, `zoom.js`, `input.js`, `assets.js`, `utility.js` — core static systems.
- `src/components/objects/` — `earth.js`, `continent.js`, `label.js`, `button.js` — instantiable scene content built from `config.js`.
