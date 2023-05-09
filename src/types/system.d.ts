export interface FileExists {
	path: string;
	callBackIfExists: () => void;
	callBackIfError?: () => void;
}
