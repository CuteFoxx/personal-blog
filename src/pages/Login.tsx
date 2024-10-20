import { FormEvent, useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("password", password);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    fetch("https://alicesblog.site/api/v1/login", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          context?.setUser(data);
          navigate("/profile");
        }
      });
    e.preventDefault();
  };

  return (
    <div className="login-page">
      <h1>Login into account</h1>
      <form
        action="/api/v1/login"
        method="POST"
        className="login-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          value={name}
          onInput={(event: any) => setName(event.target.value)}
        />
        <input
          type="password"
          name="password"
          id=""
          value={password}
          onInput={(e: any) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
