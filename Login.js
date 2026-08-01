import axios from "axios";
import api from "./api";
import { useState } from "react";
function Login() {
  return (
    <div>
      <button
        onClick={() => {
          window.location.href = "https://cs2xtn-8080.csb.app/auth/github";
        }}
      >
        Continue with Github
      </button>

      <button
        onClick={() => {
          window.location.href = "https://cs2xtn-8080.csb.app/auth/google";
        }}
      >
        Continue with Google
      </button>
    </div>
  );
}
export default Login;
