import { useState } from "react";
import DashboardInput from "./DashboardInput";
import CodeEditor from "./CodeEditor";

function Dashboard() {
  const [projects, setProjects] = useState([]);

    function createProject(projectName) {
        if (!projectName.trim()) return;

            setProjects(prev => [
                  ...prev,
                        {
             id: crypto.randomUUID(),
                     name: projectName
                    }
                 ]);
                             }

           return (
                     <div>
            <button className="Create">
           Create
                </button>

   <DashboardInput onCreate={createProject} />

                   <div className="ProjectContainer">
          {projects.map(project => (
        <div className="ProjectBox" key={project.id}>
                                                                                                                    
      <h2 className="ProjectName">
    {project.name}
           </h2>

          <button className="ProjectOpenBtn">
             Open
              </button>

               <CodeEditor projectId={project.id} />
                                                                                                                                                                                                                            
                      </div>
          ))}
              </div>
                     </div>
                 );
              }

                 export default Dashboard;