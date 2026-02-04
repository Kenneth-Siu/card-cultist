# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**Card Cultist** is an Electron-based desktop application for creating custom cards for Arkham Horror: the Card Game. It provides a UI for designing both player cards and campaign components, with canvas-based rendering for export.

- **Framework**: React with Razzle (SSR/SPA build tool)
- **Desktop**: Electron
- **Styling**: SCSS + Emotion
- **Version**: 4.2.15

## Project Structure

### Data Model

The application uses a hierarchical data model for campaigns:
- **Campaign** (src/pages/campaign/Campaign.js) - Top-level container with title, symbol, and campaign guide
  - **CardSet** (src/pages/cardSet/CardSet.js) - Collection of cards with methods for numbering and ordering
    - **Card** (src/pages/card/Card.js) - Individual card with frontFace and backFace
      - **CardFace** (src/pages/card/cardFaces/BlankFace/CardFace.js) - Base class for different face types

### Polymorphic Card Faces

The system uses **polymorphism** to handle 30+ card face types (Agenda, Act, Location, Asset, Enemy, Player, Investigator variants, etc.).

- Base class: `CardFace` with methods `getView()`, `getCanvas()`, and `getEmoji()`
- Card face instantiation: `getCardFaceClassInstance()` in src/helpers/getCardFaceClassInstance.js maps the `type` string to the correct class
- Face registry: listOfCardFaces.js exports the complete list and ordering for both rendering and encounter card numbering
- Each face type directory (e.g., src/pages/card/cardFaces/PlayerFace/) contains:
  - The face class extending CardFace
  - A Canvas component for rendering (uses HTML5 canvas API)
  - A View component for the UI editor

### Canvas Rendering System

Canvas-based card rendering uses a **layer-based architecture**:
- **CanvasLayer** (src/models/canvasLayers/CanvasLayer.js) - Base class with `draw(context)` method
- **CanvasTextLayer** - Renders text with support for formatting instructions (bold, italic, colors, etc.)
- **CanvasImageLayer** - Renders images with transforms
- Subclass examples: ConnectionSymbolLayer, EnemyDamageLayer, AgendaActBackSectionsLayer

### Text Rendering

Complex text parsing for card effects uses the **canvasTextWriter** system (src/helpers/canvasTextWriter/):
- Parses text into "atoms" (Word, Space, NewLine, AHSymbol)
- Supports inline instructions: `<b>`, `<i>`, `<color:red>`, `<fontsize:12>`, etc.
- Builds line layout and measures text for proper card placement
- File structure: atoms/ (basic elements), instructions/ (formatting), config.js (fonts/colors), makeLines.js (layout logic)

### Routing & UI Structure

- **src/pages/App.js** - Main router with 4 routes:
  - `/` - Campaign view (card set management)
  - `/card-set/:id` - Card set view (list of cards)
  - `/card-set/:cardSetId/card/:id` - Card editor
  - `/campaign-guide` - Campaign guide editor

- **CampaignContext** (src/components/CampaignContext.js) - React context for campaign state across routes

### File Persistence

- Campaigns saved as JSON files via Electron IPC bridge (src/preload/fileSystemIpc.js)
- Global save shortcut: Ctrl+S (save) / Ctrl+Shift+S (save as)
- Last opened campaign persists via .lastopened file

## Build & Development

### Node Version

This project requires **Node 16.x**. Use nvm to manage versions:

```bash
nvm use 16     # Switch to Node 16 (requires .nvmrc file)
nvm install 16 # Install Node 16 if not present
```

The .nvmrc file specifies Node 16 for automatic version selection in nvm. Electron 20.0.3 (the desktop framework) requires Node 16.x; newer Node versions may encounter compatibility issues.

### Scripts

- `npm start` - Start Electron app in dev mode with hot reload (Razzle dev server on port 3000)
- `npm run build` - Build static assets for production (creates /build directory)
- `npm test` - Run Jest tests in jsdom environment
- `npm run package` - Create portable Electron package
- `npm run make` - Build installers for all platforms (Windows, Mac, Linux)

### Running Tests

Tests use **Jest with jsdom**. Example test location: src/pages/App.test.js

```bash
npm test -- src/pages/card/Card.test.js  # Run single test file
npm test -- --watch                       # Watch mode
```

### Development Workflow

1. Run `npm start` - launches Electron window with dev server
2. Edit files - Razzle hot-reloads React components
3. The Electron main process (src/main.js) loads `http://localhost:3000`

### Build Configuration

- **Razzle** (src/razzle.config.js) configured for SPA mode with SCSS plugin
- **Electron Forge** (package.json config.forge) creates installers; main entry point: src/main.js
- **Preload script** (src/preload/preload.js) exposes `window.fs` IPC methods for file I/O

## Common Development Tasks

### Adding a New Card Face Type

1. Create directory: `src/pages/card/cardFaces/MyNewFace/`
2. Create MyNewFace.js extending CardFace with `static type = "MyNewType"`
3. Create MyNewFaceCanvas.js with canvas rendering logic (extend BaseCanvas)
4. Create MyNewFaceView.js with UI editor (import MyNewFaceCanvas and properties)
5. Add the class to listOfCardFaces.js export (in desired encounter order)
6. Import it at the top of listOfCardFaces.js

### Rendering Text on Canvas

Use CanvasTextLayer to handle complex text:
```javascript
const textLayer = new CanvasTextLayer(x, y, text, maxWidth, config);
textLayer.draw(context);
```
The text can contain formatting tags like `<b>bold</b>` or `<color:red>red text</color>`.

### Adding Canvas Elements

Create a new CanvasLayer subclass in src/models/canvasLayers/:
```javascript
export default class MyLayer extends CanvasLayer {
  constructor(x, y, data) {
    super(x, y);
    this.data = data;
  }

  draw(context) {
    // Canvas drawing code
  }
}
```

Then add to card face's canvas class array.

### Campaign Structure

Card export/import works with JSON. Campaign data flows:
1. User edits UI → CardFace/Card/CardSet state updates
2. Save triggers window.fs.saveCampaign() → JSON serialization
3. Load reads JSON → Campaign constructor reconstructs object hierarchy
4. CampaignContext refreshed → Views re-render

## Architecture Notes

- **No Redux/MobX** - State managed via Campaign/CardSet/Card classes and React Context
- **Stateful models** - Campaign, CardSet, Card are mutable classes, not immutable records
- **Late binding** - Card faces instantiated by type string at runtime (enables plugin-like architecture)
- **Canvas-first design** - Most cards rendered to canvas for high-fidelity export, not DOM
- **Electron IPC isolation** - File I/O only through window.fs bridge for security
- **Prettier formatting** (prettierrc) - Run `npx prettier --write src/` to format
