// Schema that will be inserted into the electron-store
import { PluginConfig } from "./types";
import { Schema } from "electron-store";
export const getPluginSchema = (): Schema<PluginConfig> => {
	return {};
};
