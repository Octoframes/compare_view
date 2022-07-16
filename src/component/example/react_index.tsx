// used to test component
import React from "react";
import { createRoot } from "react-dom/client";
import ReactApp from "./react_app";

const container = document.getElementById("react-root") as HTMLElement;
const root = createRoot(container);
root.render(<ReactApp />);

