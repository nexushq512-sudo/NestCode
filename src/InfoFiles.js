import { useState } from "react";
import InputFile from "./InputFile";
function InfoFiles() {
  
  function Rename() {
    setRenamedName(fileName);
  }

  function Delete() {
    setFileName(null);
  }

  return (
    <>
      <button onClick={Rename}>Rename</button>
      <button onClick={Delete}>Delete</button>
    </>
  );
}
export default InfoFiles;
