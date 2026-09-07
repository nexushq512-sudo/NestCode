import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { io } from "socket.io-client";

import "@xterm/xterm/css/xterm.css";

function xterm() {
  const terminalRef = useRef(null);

    useEffect(() => {
        // Create terminal
            const terminal = new Terminal({
                  cursorBlink: true,
                        fontSize: 14,
                              rows: 24,
                                    cols: 80
                                        });

                                            // Auto resize addon
                                                const fitAddon = new FitAddon();
                                                    terminal.loadAddon(fitAddon);

                                                        // Show terminal
                                                            terminal.open(terminalRef.current);

                                                                // Connect Socket.IO backend
                                                                    const socket = io("https://g8dvxl-50000.csb.app");

                                                                        // Backend → Terminal
                                                                            socket.on("terminal-output", (data) => {
                                                                                  terminal.write(data);
                                                                                      });

                                                                                          // Terminal → Backend
                                                                                              terminal.onData((data) => {
                                                                                                    socket.emit("terminal-input", data);
                                                                                                        });

                                                                                                            // Resize
                                                                                                                const resizeTerminal = () => {
                                                                                                                      fitAddon.fit();

                                                                                                                            socket.emit("terminal-resize", {
                                                                                                                                    cols: terminal.cols,
                                                                                                                                            rows: terminal.rows
                                                                                                                                                  });
                                                                                                                                                      };

                                                                                                                                                          resizeTerminal();

                                                                                                                                                              window.addEventListener("resize", resizeTerminal);

                                                                                                                                                                  terminal.focus();

                                                                                                                                                                      return () => {
                                                                                                                                                                            window.removeEventListener("resize", resizeTerminal);
                                                                                                                                                                                  socket.disconnect();
                                                                                                                                                                                        terminal.dispose();
                                                                                                                                                                                            };
                                                                                                                                                                                              }, []);

                                                                                                                                                                                                return (
                                                                                                                                                                                                    <div
                                                                                                                                                                                                          ref={terminalRef}
                                                                                                                                                                                                                style={{
                                                                                                                                                                                                                        width: "100%",
                                                                                                                                                                                                                                height: "100%",
                                                                                                                                                                                                                                        overflow: "hidden"
                                                                                                                                                                                                                                              }}
                                                                                                                                                                                                                                                  />
                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                    export default xterm;