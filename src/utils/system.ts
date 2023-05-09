import { FileExists } from "#types/system";
import { access } from "fs";
export function fileExists(
	path: string,
	callBackIfExists: () => void,
	callBackIfError?: () => void
) {
	access(path, (err) => {
		if (err && callBackIfError) {
			callBackIfError();
		}
		callBackIfExists();
	});
}
