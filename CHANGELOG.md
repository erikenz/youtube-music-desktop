# Release Notes

## Version 1.7.4-beta - 29/05/2023

### New Features

-   Added styles to the plugins window
-   Implemented loading animation while installing a plugin
-   Added @material-tailwind/react to help with components and styling
-   Added @heroicons/react for icons

### Refactors

-   The plugins window now contains both the install plugin and browse plugin windows

## Version 0.7.3-beta - 19/05/2023

### New features

-   Child window spawns near parent window
-   Added function to update the store with new schemas
-   Plugin schemas are now added into the store when loaded
-   Plugins can be downloaded and deleted
-   Plugins can be enabled and disabled
-   Plugins can have a menu for configuration
-   Added ipcHandlers

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
