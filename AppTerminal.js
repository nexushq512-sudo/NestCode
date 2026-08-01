import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "@xterm/addon-fit";
import { io } from "socket.io-client";
import "xterm/css/xterm.css";

function AppTerminal() {
  const terminalRef = useRef(null);

  useEffect(() => {
    // ========== SOCKET ==========
    const socket = io("http://localhost:8080"); // backend URL

    // ========== TERMINAL ==========
    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#1e1e2e",
        foreground: "#cdd6f4",
        cursor: "#89b4fa",
      },
      fontSize: 15,
      fontFamily: "monospace",
      disableStdin: false, // IMPORTANT
      convertEol: true,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    // ========== OPEN ==========
    term.open(terminalRef.current);
    fitAddon.fit();

    // ========== FORCE FOCUS (Main Fix) ==========
    setTimeout(() => {
      term.focus();
      const textarea = terminalRef.current?.querySelector("textarea");
      if (textarea) {
        textarea.focus();
        // Yeh line mobile/keyboard ke liye important hai
        textarea.setAttribute("autofocus", "true");
      }
    }, 200);

    // ========== WELCOME ==========
    term.writeln("\x1b[1;32m✅ NestCode Terminal Ready\x1b[0m");
    term.writeln("\x1b[1;34mType anything below...\x1b[0m");
    term.write("\r\n$ ");

    // ========== INPUT HANDLER (Typing) ==========
    term.onData((data) => {
      console.log("Typed:", data); // Debug
      socket.emit("terminal-input", data);
    });

    // ========== OUTPUT HANDLER ==========
    socket.on("terminal-output", (data) => {
      term.write(data);
    });

    // ========== RESIZE ==========
    const handleResize = () => {
      fitAddon.fit();
      socket.emit("terminal-resize", {
        cols: term.cols,
        rows: term.rows,
      });
    };
    window.addEventListener("resize", handleResize);

    // ========== CLICK FIX (Jab user click kare) ==========
    const handleContainerClick = () => {
      term.focus();
      const textarea = terminalRef.current?.querySelector("textarea");
      if (textarea) textarea.focus();
    };

    const container = terminalRef.current;
    container?.addEventListener("click", handleContainerClick);

    // ========== TOUCH FIX (Mobile) ==========
    const handleTouchStart = () => {
      term.focus();
      const textarea = terminalRef.current?.querySelector("textarea");
      if (textarea) textarea.focus();
    };
    container?.addEventListener("touchstart", handleTouchStart);

    // ========== CLEANUP ==========
    return () => {
      socket.disconnect();
      term.dispose();
      window.removeEventListener("resize", handleResize);
      container?.removeEventListener("click", handleContainerClick);
      container?.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{
        width: "100%",
        height: "400px",
        background: "#1e1e2e",
        borderRadius: "12px",
        padding: "6px",
        touchAction: "none",
        cursor: "text",
        overflow: "hidden",
      }}
    />
  );
}

export default AppTerminal;
