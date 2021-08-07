export default function Nav() {
  return (
    <div className="nav">
      <div
        className="pane"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          fontSize: "1.2rem",
        }}
      >
        <div>
          <button
            onClick={(e) => {
              document.querySelector(".splash").classList.toggle("fade");
            }}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div>
          <button>logo</button>
        </div>
        <div>
          <button
            onClick={(e) => {
              const x = document.getElementById("search");

              if (x.style.display === "none") {
                x.style.display = "block";
              } else {
                x.style.display = "none";
              }
            }}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <style jsx>{`
        .nav {
          background-color: rgb(var(--base-blue));
          z-index: 100000;
          position: relative;
        }
        .pane button {
          background-color: transparent;
          border: none;
          color: #fff;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
