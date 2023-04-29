import "./global.css";

import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
export const RenderApp = (Child: ReactNode) => root.render(Child);
