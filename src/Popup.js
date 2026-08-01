import { useState } from "react";

function Popup({ file, renameFile, deleteFile, close }) {
  const [rename, setRename] = useState("");

  return (
    <div className="popup">
      <input
        type="text"
        placeholder="Enter your renamed name"
        value={rename}
        onChange={(e) => setRename(e.target.value)}
      />

      <div className="popup-buttons">
        <button
          onClick={() => {
            if (!rename.trim()) return;

            renameFile(file.id, rename.trim());
            close();
          }}
        >
          Rename
        </button>

        <button
          className="delete-btn"
          onClick={() => {
            deleteFile(file.id);
            close();
          }}
        >
          Delete
        </button>

        <button className="cancel-btn" onClick={close}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Popup;
