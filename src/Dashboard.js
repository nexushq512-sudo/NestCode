import { useState } from "react";
import DashboardInput from "./DashboardInput";

function Dashboard() {

    const [projects, setProjects] = useState(() => {
            const savedProjects = localStorage.getItem("nestcode_projects");

                    return savedProjects
                                ? JSON.parse(savedProjects)
                                            : [];
                                                });

                                                    const createProject = (projectName) => {

                                                            const newProject = {
                                                                        id: Date.now(),
                                                                                    name: projectName
                                                                                            };

                                                                                                    const updatedProjects = [...projects, newProject];

                                                                                                            setProjects(updatedProjects);

                                                                                                                    localStorage.setItem(
                                                                                                                                "nestcode_projects",
                                                                                                                                            JSON.stringify(updatedProjects)
                                                                                                                                                    );
                                                                                                                                                        };

                                                                                                                                                            return (
                                                                                                                                                                    <div className="projectContainer">

                                                                                                                                                                                <h2>My Projects</h2>

                                                                                                                                                                                            <DashboardInput onCreate={createProject} />

                                                                                                                                                                                                        {projects.map((project) => (
                                                                                                                                                                                                                        <div key={project.id}>
                                                                                                                                                                                                                                            {project.name}
                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                        ))}

                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                    export default Dashboard;
                                                          
                                                              
                                                                                        
                                                                                                      
                                                                                                                        
                                                                                                                                    

                                                                                                                                                
                                                                                                                                                                
                                                                                                                                                                

                                                                                                                                                                                                                