import Nav from "./../nav";
import Search from "../search";
import Splash from "../header/splash";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

export default function Find() {
  const [keys] = useState(["movie", "person", "tv"]);
  const [currKey, setCurrKey] = useState(keys[0]);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  useEffect(() => {
    var urlParams = new URLSearchParams(window.location.search);

    setQuery(decodeURI(urlParams.get("query")));
  }, []);
  const sentinelRef = useRef();
  useEffect(() => {
    setPageNum(1);
    setItems([]);
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
  }, [query, currKey]);

  useEffect(() => {
    if (query.trim().length > 0) {
      fetch(
        `https://api.themoviedb.org/3/search/${encodeURI(currKey)}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&page=${encodeURI(pageNum)}&query=${query}`
      )
        .then(async (res) => {
          if (res.ok && res.status === 200) return res.json();
          throw await res.json();
        })
        .then((data) => {
          if (data.results) {
            setItems((r) => [...r, ...data.results]);
          }
        })
        .catch(console.log);
    }
  }, [pageNum]);
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
          <div className="main">
            {items.map((i) => (
              <Link
                href={`/media/${currKey}?id=${i.id}`}
                key={Number(i.id) * Math.random() * Math.random()}
              >
                <a>
                  <div
                    className="item"
                    key={Number(i.id) * Math.random() * Math.random()}
                  >
                    <div className="img">
                      {" "}
                      <img
                        src={
                          i.poster_path
                            ? `https://www.themoviedb.org/t/p/w260_and_h390_bestv2/` +
                              i.poster_path
                            : `https://via.placeholder.com/150/eee/000?Text=MovieDB`
                        }
                        alt="poster"
                      />
                    </div>
                    <div className="message">
                      <h4>{i.title || i.name}</h4>
                      <p>
                        <small>{i?.overview?.substr(0, 100) + "..."}</small>
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div ref={sentinelRef} style={{ height: "100px" }}></div>
      <style jsx>{`
        .sections {
          display: grid;
          max-width: 1200px;
          margin: 2rem auto;
          grid-template-columns: 2fr 7fr;
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
        .item {
          display: flex;
          align-items: center;
          border-radius: 10px;
          box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.2);
          margin-bottom: 2rem;
          overflow: hidden;
          height: 150px;
        }
        .item .img {
          flex-basis: 100px;
          flex-shrink: 0;
        }
        img {
          height: 160px;
          object-fit: cover;
        }
        .message {
          padding: 1rem;
          flex-grow: 1;
        }
        @media only screen and (min-width: 701px) {
          .main {
            margin-left: 2rem;
            flex-basis: 4fr;
          }
          .aside h2 + div {
            border: 1px solid #eee;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          h2 {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
        }
        @media only screen and (max-width: 700px) {
          .sections {
            grid-template-columns: 1fr;
          }
          .aside h2 + div {
            margin-bottom: 1rem;
          }
          .tags {
            display: flex;
            flex-wrap: no-wrap;
            overflow-x: scroll;
          }
          .tag {
            flex-grow: 1;
            display : flex;
            justify-content : center;
          }
          
      `}</style>
    </div>
  );
}
