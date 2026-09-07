import { useEffect, useRef, useState } from "react";
import "./Terminal.css";

export default function Terminal() {
  const terminalRef = useRef(null);
    const socketRef = useRef(null);

      const [input, setInput] = useState("");
        const [output, setOutput] = useState("");

          useEffect(() => {
              terminalRef.current?.focus();

                  // Backend PTY server
                      const socket = new WebSocket("ws://localhost:3000/terminal");

                          socketRef.current = socket;

                              socket.onmessage = (event) => {
                                    setOutput((prev) => prev + event.data);
                                        };

                                            socket.onerror = () => {
                                                  setOutput((prev) => prev + "\r\n[Connection error]\r\n");
                                                      };

                                                          return () => {
                                                                socket.close();
                                                                    };
                                                                      }, []);

                                                                        function handleKeyDown(e) {
                                                                            e.preventDefault();

                                                                                if (e.key === "Enter") {
                                                                                      socketRef.current?.send("\r");

                                                                                            setInput("");
                                                                                                  return;
                                                                                                      }

                                                                                                          if (e.key === "Backspace") {
                                                                                                                socketRef.current?.send("\x7f");

                                                                                                                      setInput((prev) => prev.slice(0, -1));
                                                                                                                            return;
                                                                                                                                }

                                                                                                                                    if (e.key === "ArrowUp") {
                                                                                                                                          socketRef.current?.send("\x1b[A");
                                                                                                                                                return;
                                                                                                                                                    }

                                                                                                                                                        if (e.key === "ArrowDown") {
                                                                                                                                                              socketRef.current?.send("\x1b[B");
                                                                                                                                                                    return;
                                                                                                                                                                        }

                                                                                                                                                                            if (e.key === "ArrowLeft") {
                                                                                                                                                                                  socketRef.current?.send("\x1b[D");
                                                                                                                                                                                        return;
                                                                                                                                                                                            }

                                                                                                                                                                                                if (e.key === "ArrowRight") {
                                                                                                                                                                                                      socketRef.current?.send("\x1b[C");
                                                                                                                                                                                                            return;
                                                                                                                                                                                                                }

                                                                                                                                                                                                                    if (
                                                                                                                                                                                                                          e.key.length === 1 &&
                                                                                                                                                                                                                                !e.ctrlKey &&
                                                                                                                                                                                                                                      !e.altKey &&
                                                                                                                                                                                                                                            !e.metaKey
                                                                                                                                                                                                                                                ) {
                                                                                                                                                                                                                                                      socketRef.current?.send(e.key);

                                                                                                                                                                                                                                                            setInput((prev) => prev + e.key);
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                    return (
                                                                                                                                                                                                                                                                        <div
                                                                                                                                                                                                                                                                              ref={terminalRef}
                                                                                                                                                                                                                                                                                    className="terminal"
                                                                                                                                                                                                                                                                                          tabIndex={0}
                                                                                                                                                                                                                                                                                                onKeyDown={handleKeyDown}
                                                                                                                                                                                                                                                                                                    >
                                                                                                                                                                                                                                                                                                          <pre className="terminal-output">
                                                                                                                                                                                                                                                                                                                  {output}
                                                                                                                                                                                                                                                                                                                        </pre>

                                                                                                                                                                                                                                                                                                                              <div className="terminal-line">
                                                                                                                                                                                                                                                                                                                                      {input}
                                                                                                                                                                                                                                                                                                                                              <span className="cursor" />
                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                          }