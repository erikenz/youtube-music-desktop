export interface Shortcuts {
	nextSong?: string;
	previousSong?: string;
	playPause?: string;
	volumeUp?: string;
	volumeDown?: string;
	mute?: string;
	like?: string;
	dislike?: string;
	shuffle?: string;
	repeat?: string;
}
export interface PluginConfig {
	shortcuts: {
		enabled: boolean;
		actions: Shortcuts;
		overrideMediaKeys: boolean;
	};
}
