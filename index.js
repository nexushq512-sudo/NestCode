import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Files from "./Files";
import Popup from "./Popup";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <>
    <Files />
  </>
);
