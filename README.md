# YouTube Music Desktop

Unofficial Electron wrapper for YouTube Music with added features

## Features

### Plugins

-   **Shortcuts**: Allows adding shortcuts for play, pause, next, previous, volume up, volume down, mute, like, dislike

-   **Crossfade**: Adds a fade between songs

### Themes

## Download

### Linux

### Windows

### MacOS

## Contribute

### Dev

### Create a plugin

Create a folder in `plugins/YOUR-PLUGIN-NAME`:

-   config.ts template:

```ts
interface PluginConfig {}
const config: PluginConfig = {};
export default config;
```

-   front.ts template:

```ts

```

-   back.ts template:

```ts

```

-   menu.ts template:

```ts

```

**IMPORTANT:** the plugin must include at least one of those files to be recognized

## Credits

This is a typescript version inspired on [youtube-music](https://github.com/th-ch/youtube-music) from [th-ch](https://github.com/th-ch).

Credits to [th-ch](https://github.com/th-ch) and all the contributors to the [project](https://github.com/th-ch/youtube-music).

## License

MIT © [erikenz](https://github.com/erikenz)
