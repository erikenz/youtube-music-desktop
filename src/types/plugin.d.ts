export interface Plugin {
	name: string;
	displayName: string;
	start: () => void;
	stop: () => void;
	getConfig: () => object;
	front?: () => void;
	back?: () => void;
}
export interface PluginFiles {
	name: string;
	dir: string;
	files: string[];
}
export interface PluginGitHub {
	download_url: string | null;
	git_url: string;
	html_url: string;
	name: string;
	path: string;
	sha: string;
	size: number;
	type: "dir" | "file";
	url: string;
	_links: {
		git: string;
		html: string;
		self: string;
	};
}
