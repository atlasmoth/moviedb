import Nav from "../nav";
import styles from "./header.module.css";
import Splash from "./splash";

const FormSearch = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="search">
        <span>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="search for a movie,tv show, person..."
          />
        </span>
        <span>
          <input type="submit" value="Search" />
        </span>
      </div>
      <style jsx>{`
        .search {
          display: grid;
          align-items: center;
          margin: 2rem 0px;
          grid-template-columns: repeat(6, 1fr);
          justify-content: center;
        }
        .search span:first-of-type {
          grid-column: 1 / span 7;
          grid-row-start: 1;
        }
        .search span:nth-of-type(2) {
          grid-row-start: 1;
          grid-column: 7 / span 1;
          z-index: 2;
        }
        .search span:first-of-type input {
          padding-left: 1rem;
        }
        .search input {
          width: 100%;
          border-radius: 3rem;
          border: none;
          height: 3rem;
          line-height: 3rem;
        }

        .search span:nth-of-type(2) input {
          background: linear-gradient(
            to right,
            rgba(30, 213, 169) 0%,
            rgba(1, 180, 280) 100%
          );
          color: #fff;
          padding: 0px 1.5rem;
          font-weight: bold;
          position: relative;
          cursor: pointer;
        }
      `}</style>
    </form>
  );
};
export default function Header() {
  return (
    <>
      <div className={styles.header}>
        <Nav />
        <Splash />
        <div className="boundary">
          <h1
            style={{
              fontSize: "3rem",
              textShadow: "0px 0px 0px 1px rgba(0,0,0,.2)",
              marginTop: "2rem",
            }}
          >
            Welcome.
          </h1>
          <h2>Millions of movies, TV shows and people to discover.</h2>
          <h2>Explore now.</h2>
          <FormSearch />
        </div>
      </div>
    </>
  );
}
