import Nav from "./../nav";
import Search from "../search";
import Splash from "../header/splash";
import { useRef, useState, useEffect } from "react";

export default function Find() {
  const [keys] = useState(["movies", "collection", "people", "tv"]);
  const [currKey, setCurrKey] = useState(keys[0]);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const sentinelRef = useRef();
  useEffect(() => {
    setPageNum(1);

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPageNum((p) => p + 1);
      }
    }, options);
    observer.observe(sentinelRef.current);
    const currObjt = sentinelRef.current;
    return () => observer.unobserve(currObjt);
  }, [query]);

  // useEffect(() => {
  //   console.log(
  //     `https://api.themoviedb.org/3/search/${encodeURI(currKey)}?api_key=${
  //       process.env.NEXT_PUBLIC_API_KEY
  //     }&page=${encodeURI(pageNum)}`
  //   );
  // }, [pageNum]);
  return (
    <div className="find">
      <Nav />
      <Search />
      <Splash />
      <div className="boundary">
        <div className="sections">
          <div className="aside">
            <h2
              style={{
                color: "#fff",
                padding: "1rem 3rem",
                backgroundColor: "rgb(1,180,220)",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              Search Results
            </h2>
            <div className="tags">
              {keys.map((k) => (
                <div className="tag" key={k} onClick={() => setCurrKey(k)}>
                  <span>{k}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="main"></div>
        </div>
      </div>

      <div ref={sentinelRef} style={{ height: "100px" }}></div>
      <style jsx>{`
        .sections {
          display: flex;
          max-width: 1200px;
          margin: 2rem auto;
        }
        .aside h2 + div {
          border: 1px solid #eee;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        .main {
          margin-left: 2rem;
        }
        .tag {
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-transform: capitalize;
        }
        .tag:hover {
          background-color: #eee;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
