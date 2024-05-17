import { useState, useRef, useEffect } from "react";
import "../css/Login.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [userLogin, setUserLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const usernameRef = useRef();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  // Event handling functions
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);

    axios
      .post(`http://localhost:4000/users/getUser`, {
        username: userLogin.username,
        password: userLogin.password,
      })
      .then((response) => {
        if (response.data.user !== undefined) {
          setError(false);
          setUserLogin({ username: "", password: "" });
          navigate(`/Profile/${response.data.user.username}`);
        } else {
          setUserLogin({ username: "", password: "" });
          setError(true);
          setErrorMessage(response.data);
        }
      })
      .catch((err) => {
        setError(!error);
        setErrorMessage("Error occured");
      });
  };

  useEffect(() => {
    usernameRef.current.focus(null);
  }, []);

  function handleChange(e) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      <div className="row content">
        <div className="col-md-6">
          <img
            src="https://png.pngtree.com/png-vector/20191003/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1786166.jpg"
            alt="Login"
            width="100px"
            height="100px"
            style={{
              marginLeft: "60%",
              marginBottom: "0%",
              borderRadius: "50px",
            }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <input
              type="text"
              value={userLogin.username}
              onChange={handleChange}
              placeholder="Username"
              name="username"
              ref={usernameRef}
              className="form-control"
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              value={userLogin.password}
              onChange={handleChange}
              placeholder="Password"
              name="password"
              required
              className="form-control"
              autoComplete="off"
            />
          </div>

          <button
            className="btn btn-outline-success mt-3"
            style={{ width: "100%" }}
            type="submit"
          >
            Login
          </button>
        </form>
        <p style={{ color: "red", marginTop: "5%" }}>
          {error ? errorMessage : ""}
        </p>
        <p>
          Go to my org <a href="/orgs/login"> sign in</a>
        </p>
      </div>
    </>
  );
}

export default Login;
