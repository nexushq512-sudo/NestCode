import { useState } from "react";

function DashboardInput({ onCreate }) {
  const [projectName, setProjectName] = useState("");

    function projectCreateBtn() {
        if (!projectName.trim()) return;

            onCreate(projectName);

                setProjectName("");
                  }

                    return (
                        <div>
                              <input
                                      className="ProjectName"
                       placeholder="Enter your project name"
               onChange={(e) => setProjectName(e.target.value)}
                           value={projectName}
                                  />

                           <button
                                className="ProjectCreateBtn"
                             onClick={projectCreateBtn}
                                 >
                              Create Project
                         </button>
                               </div>
                                 );
                       }

                        export default DashboardInput;