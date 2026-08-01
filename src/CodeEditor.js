import { useState } from "react";
import axios from "axios";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

function CodeEditor({ activeFile, updateCode }) {
  function getLanguage() {
    if (!activeFile) return [];

    if (activeFile.name.endsWith(".html")) return [html()];
    if (activeFile.name.endsWith("css")) return [css()];
    if (activeFile.name.endsWith("js")) return [javascript()];
    if (activeFile.name.endsWith(".jsx")) return [javascript({ jsx: true })];
    if (activeFile.name.endsWith(".ts"))
      return [javascript({ typescript: true })];
    if (activeFile.name.endsWith(".tsx"))
      return [javascript({ typescript: true, jsx: true })];
  }
  return (
    <>
      <CodeMirror
        value={activeFile?.code || ""}
        height="500px"
        theme={vscodeDark}
        extensions={getLanguage()}
        onChange={updateCode}
      />
    </>
  );
}
export default CodeEditor;
