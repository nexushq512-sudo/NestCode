import { useState } from "react";

function DashboardInput({ onCreate }) {

    const [projectName, setProjectName] = useState("");

        const handleCreate = () => {
                if (!projectName.trim()) return;

                        onCreate(projectName);

                                setProjectName("");
                                    };

                                        return (
                                                <div>

                                                            <input
                                                                            type="text"
                                                                                            placeholder="Enter your project name"
                                                                                                            value={projectName}
                                                                                                                            onChange={(e) => setProjectName(e.target.value)}
                                                                                                                                        />

                                                                                                                                                    <button onClick={handleCreate}>
                                                                                                                                                                    Create
                                                                                                                                                                                </button>

                                                                                                                                                                                        </div>
                                                                                                                                                                                            );
                                                                                                                                                                                            }

                                                                                                                                                                                            export default DashboardInput;