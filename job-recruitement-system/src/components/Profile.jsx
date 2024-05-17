import PostsForUser from "./PostsForUser";
import "../css/Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/getUser/cookies")
      .then((response) => {
        if (response.data.valid) {
          setUsername(response.data.username);
        } else {
          navigate("/register");
        }
      })
      .catch((err) => {
        navigate("/");
      });
  }, []);

  return (
    <div>
      <PostsForUser username={username} />
    </div>
  );
}

export default Profile;
