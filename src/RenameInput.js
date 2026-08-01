import { useState } from "react";

function RenameInput() {
  const [createFiles, setCreateFiles] = useState(null);
  return (
    <>
      <input
        type="text"
        placeholder="Enter your rename name"
        onChange={(e) => setCreateFiles(e.target.value)}
        value={createFiles}
      />
    </>
  );
}

export default RenameInput;
