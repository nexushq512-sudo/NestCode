import { saveAs } from "file-saver";

function exportFile(file) {
  const blob = new Blob([file.code], {
    type: "text/plain;charset=utf-8",
  });

  saveAs(blob, file.name);
}

export default exportFile;
