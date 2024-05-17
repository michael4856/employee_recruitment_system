import { IconContext } from "react-icons";
import { FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";

function Profile_Dropdown({ searchBy }) {
  return (
    <div className="dropdown-container">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle sort-btn"
          type="button"
          data-bs-toggle="dropdown"
          id="dropdownMenuButton"
          aria-expanded="false"
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingRight: "10px",
          }}
        >
          <IconContext.Provider
            value={{
              color: "white",
              className: "fs-4",
            }}
          >
            <FaLayerGroup
              style={{
                cursor: "pointer",
                title: "Sign In",
                marginRight: "20px",
                color: "red",
              }}
            />
          </IconContext.Provider>
          Filter Jobs By
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <Link
            className="dropdown-item item"
            to="#"
            onClick={() => {
              searchBy({ departement: "all" });
            }}
          >
            All
          </Link>

          <Link
            className="dropdown-item item"
            to="#"
            onClick={() => {
              searchBy({ departement: "Health Care" });
            }}
          >
            Health Care
          </Link>
          <Link
            className="dropdown-item item"
            to="#"
            onClick={() => {
              searchBy({ departement: "Computer Science" });
            }}
          >
            Computer Science
          </Link>
          <Link
            className="dropdown-item item"
            to="#"
            onClick={() => {
              searchBy({ departement: "Engineering" });
            }}
          >
            Engineering
          </Link>
          <Link
            className="dropdown-item item"
            to="#"
            onClick={() => {
              searchBy({ departement: "Other" });
            }}
          >
            Other
          </Link>
          <Link
            className="dropdown-item item"
            to="#"
            onClick={() => {
              searchBy({ departement: "Politics" });
            }}
          >
            Politics
          </Link>
          <Link
            className="dropdown-item item"
            to="#"
            onClick={() => {
              searchBy({ createdAt: "time" });
            }}
          >
            Time Posted
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Profile_Dropdown;
