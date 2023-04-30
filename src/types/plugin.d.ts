export interface Plugin {
	label: string;
	dir: string;
	files: string[];
	init?: () => {};
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
