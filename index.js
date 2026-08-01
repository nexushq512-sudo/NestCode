import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Files from "./Files";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Files />
  </StrictMode>
);
