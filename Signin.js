import { useState } from "react";
import axios from "axios";
function Singin() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function SigninBtn() {
    //Backend connection through axios
  }
  return (
    <>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => e.target.value}
      />

      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => e.target.value}
      />

      <button onClick={SigninBtn}>Signin</button>
    </>
  );
}
export default Signin;
