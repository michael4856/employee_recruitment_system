import "../css/congra.css";

function Congratulation() {
  return (
    <body style={{ width: "80%", marginLeft: "10%", borderRadius: "50px" }}>
      <div
        className="myContainer alert alert-success"
        style={{ width: "100%", background: "black", border: "none" }}
        role="alert"
      >
        <div className="bubbles">
          <span style={{ animationDuration: "3s" }}></span>
          <span style={{ animationDuration: "1s" }}></span>
          <span style={{ animationDuration: "55s" }}></span>
          <span style={{ animationDuration: "2s" }}></span>
          <span style={{ animationDuration: "5s" }}></span>
          <span style={{ animationDuration: "8s" }}></span>
          <span style={{ animationDuration: "3s" }}></span>
          <span style={{ animationDuration: "15s" }}></span>
          <span style={{ animationDuration: "2s" }}></span>
          <span style={{ animationDuration: "5s" }}></span>
          <span style={{ animationDuration: "8s" }}></span>
          <span style={{ animationDuration: "5s" }}></span>
          <span style={{ animationDuration: "6s" }}></span>
          <span style={{ animationDuration: "23s" }}></span>
          <span style={{ animationDuration: "8s" }}></span>
          <span style={{ animationDuration: "1s" }}></span>
          <span style={{ animationDuration: "3s" }}></span>
          <span style={{ animationDuration: "5s" }}></span>
        </div>
        <h4
          className="alert-heading "
          style={{
            color: "blue",
            fontSize: "50px",
            fontWeight: "bold",
            fontStyle: "italic",
            marginTop: "100px",
          }}
        >
          Congratulation !
        </h4>

        <hr />
        <div className="mb-0" style={{ color: "gray" }}>
          <p>Stay with us and explore more jobs</p>
          <p>Contact companies with the information provided below:</p>
        </div>
      </div>
    </body>
  );
}

export default Congratulation;
