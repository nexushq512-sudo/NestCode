import { useState } from "react";
import Popup from "./Popup";
import CodeEditor from "./CodeEditor";
import Output from "./Output";
import "./File.css";
import { useEffect } from "react";
import exportFile from "./FileExport";
function Files() {
  const [files, setFiles] = useState(() => {
    const savedFiles = localStorage.getItem("nestcode-files");

    return savedFiles ? JSON.parse(savedFiles) : [];
  });
  useEffect(() => {
    localStorage.setItem("nestcode-files", JSON.stringify(files));
  }, [files]);

  const [fileName, setFileName] = useState("");
  const [currentFile, setCurrentFile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const [menuFileId, setMenuFileId] = useState(null);
  const [code, setCode] = useState("");
  const [projectType, setProjectType] = useState("vanilla");
  function CreateFile() {
    if (files.some((file) => file.name === fileName.trim())) {
      alert("File already exists");
      return;
    }

    if (!fileName.trim()) return;

    const newFile = {
      id: Date.now(),
      name: fileName.trim(),
      code: "",
    };

    setFiles((prev) => [...prev, newFile]);
    setCurrentFile(newFile.id);
    setFileName("");
  }

  function deleteFile(id) {
    setFiles((prev) => prev.filter((file) => file.id !== id));

    if (currentFile === id) {
      setCurrentFile(null);
    }

    setMenuFileId(null);
  }
  function renameFile(id, newName) {
    setFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, name: newName } : file))
    );

    setMenuFileId(null);
  }
  const activeFile = files.find((file) => file.id === currentFile);

  function updateCode(newCode) {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === currentFile ? { ...file, code: newCode } : file
      )
    );
  }

  return (
    <>
      {/* LEFT FILE SYSTEM */}
      <div className="FileList">
        <div className="input">
          <input
            type="text"
            placeholder="Enter your file name"
            onChange={(e) => setFileName(e.target.value)}
            value={fileName}
          />

          <button
            onClick={CreateFile}
            disabled={!fileName.trim()}
            className="create"
          >
            +
          </button>
        </div>

        {files.map((file) => (
          <div key={file.id} className="fileItems">
            <span onClick={() => setCurrentFile(file.id)}>{file.name}</span>

            <button onClick={() => setMenuFileId(file.id)}>⋮</button>

            {menuFileId === file.id && (
              <Popup
                file={file}
                renameFile={renameFile}
                deleteFile={deleteFile}
                close={() => setMenuFileId(null)}
              />
            )}
          </div>
        ))}
      </div>

      {/* TOP RIGHT */}
      <div className="editor-toolbar">
        <button onClick={() => setShowOutput(true)}>▶ Run</button>

        <button
          onClick={() => {
            if (activeFile) {
              exportFile(activeFile);
            }
          }}
          disabled={!activeFile}
        >
          Export
        </button>
      </div>

      {/* CODE EDITOR */}
      {!showOutput ? (
        <CodeEditor
          key={activeFile?.id}
          activeFile={activeFile}
          updateCode={updateCode}
        />
      ) : (
        <Output
          files={files}
          projectType={projectType}
          onClose={() => setShowOutput(false)}
        />
      )}
    </>
  );
}
export default Files;
