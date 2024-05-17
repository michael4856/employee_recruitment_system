import { useEffect, useState } from "react";
import axios from "axios";
import Job from "./Job";
import ProfileAside from "./ProfileAside";

function PostsForUser({ username }) {
  const [searchData, setSearchData] = useState(null);
  const [dbJobs, setDbJobs] = useState(null);
  const [info, setInfo] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:4000/posts/getPosts", {
        searchData: searchData,
      })
      .then(function (response) {
        setDbJobs(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //Handle search by
  const handleSearchBy = (data) => {
    axios
      .post("http://localhost:4000/posts/getPosts", {
        searchData: data,
      })
      .then(function (response) {
        setInfo(`Jobs found for ${data.departement} : `);
        setDbJobs(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <ProfileAside searchBy={handleSearchBy} username={username} />
      <div
        style={{
          paddingTop: "4.5%",
          backgroundColor: "black",
          paddingBottom: "315px",
        }}
      >
        {info && (
          <div
            style={{
              marginTop: "2%",
              backgroundColor: "black",
              color: "green",
              fontStyle: "italic",
            }}
          >
            <h3>{info}</h3>
          </div>
        )}
        <div className="job-container">
          {dbJobs ? (
            dbJobs.map((job, index) => {
              return <Job key={job.id} jobData={job} username={username} />;
            })
          ) : (
            <h1
              style={{ color: "white", paddingLeft: "40%", marginTop: "10%" }}
            >
              Loading...
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostsForUser;
