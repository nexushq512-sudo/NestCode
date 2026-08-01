import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

function Output({ files, projectType, onClose }) {
  const sandpackFiles = {};

  files.forEach((file) => {
    sandpackFiles[`/${file.name}`] = {
      code: file.code || "",
    };
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Output Header */}
      <div
        style={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 15px",
          borderBottom: "1px solid #333",
        }}
      >
        <h3>Output</h3>

        <button onClick={onClose}>Close</button>
      </div>

      {/* Sandpack */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
        }}
      >
        <SandpackProvider
          template={projectType || "vanilla"}
          files={sandpackFiles}
          options={{
            autorun: true,
            recompileMode: "immediate",
            recompileDelay: 300,
          }}
        >
          <SandpackLayout
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <SandpackPreview
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}

export default Output;
