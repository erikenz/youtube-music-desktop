# Release Notes

## Version 0.0.1-beta - 09/05/2023

### New features

-   Child window spawns near parent window
-   Added function to update the store with new schemas
-   Plugin schemas are now added into the store when loaded

### Refactors

-   Changed window to install plugins to be opened from Manage Plugins window
-   Removed menu.ts from plugin files and now the config will be read from the store and displayed on the plugin config page inside Manage Plugins window
-   Plugin files will now consist of:
    -   back.ts: modify the functionality of the app
    -   front.[ts|tsx]: change existing components or add new ones to the UI
    -   config.ts: the schema used to save the plugin configuration
    -   index.mts: default export for the plugin information and functions
    -   types.d.ts: file to create interfaces if necessary

### Bug Fixes

-   Window spawned with offset when loading coords from store