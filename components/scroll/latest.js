import { useEffect, useState, useRef } from "react";
import Scroll from ".";
import Link from "next/link";

export default function Latest() {
  const [keys] = useState(["tv", "movie"]);
  const [currKey, setCurrKey] = useState(keys[0]);
  const [media, setMedia] = useState([]);
  const [background, setBackground] = useState("");

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${encodeURI(currKey)}/top_rated?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&append_to_response=videos`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setMedia(results);
        const m = results[0];

        setBackground(
          `https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces//${
            m.backdrop_path || m.poster_path
          }`
        );
      })
      .catch(console.log);
  }, [currKey]);

  return (
    <div className="house">
      <div className="boundary">
        <Scroll
          title={"Top Rated"}
          updateKey={(idx) => setCurrKey(idx)}
          items={keys}
          currKey={currKey}
        />
        <div className="scrollDivs">
          {media.map((m) => (
            <div className="card" key={m.id}>
              <Link href={`/media/${currKey}?id=${m.id}`}>
                <a>
                  <div
                    className="poster"
                    style={{
                      backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces//${
                        m.backdrop_path || m.poster_path
                      })`,
                    }}
                    onClick={() => {
                      setBackground(
                        `https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces//${
                          m.backdrop_path || m.poster_path
                        }`
                      );
                    }}
                  >
                    <div className="play">
                      <i className="fas fa-play"></i>
                    </div>
                    <div className="average">
                      <p>{m.vote_average}</p>
                      <Canvas average={Number(m.vote_average || 0)} />
                    </div>
                  </div>
                  <div
                    style={{
                      fontWeight: "bold",
                      marginTop: "1.5rem",
                      textAlign: "center",
                    }}
                  >
                    <p>{m.title || m.name}</p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p>{m.first_air_date}</p>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .house {
          background-image: linear-gradient(
              to right,
              rgba(var(--base-blue), 0.75) 0%,
              rgba(var(--base-blue), 0.75) 100%
            ),
            url(${background});
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          color: #fff;
          transition: background 0.3s ease;
        }

        .scrollDivs {
          margin: 1rem 0px;
          padding-bottom: 1rem;
          overflow-x: scroll;
          display: grid;
          grid-template-columns: repeat(${media.length}, 300px);
          grid-gap: 1.5rem;
          grid-auto-rows: minmax(200px, auto);
        }

        .scrollDivs::-webkit-scrollbar {
          width: 10px;
        }

        .scrollDivs::-webkit-scrollbar-track {
          background-color: #e4e4e4;
          border-radius: 100px;
        }

        .scrollDivs::-webkit-scrollbar-thumb {
          border-radius: 100px;
          background-image: linear-gradient(
            rgba(195, 254, 207, 1) 0%,
            rgba(30, 213, 169, 1) 100%
          );
          box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
        }
        .poster {
          position: relative;
          cursor: pointer;
          transition: 0.3s ease;
          height: 70%;
          max-height: 80%;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 10px;
          display: flex;
        }
        .play {
          font-size: 3rem;
          color: #fff;
          margin: auto;
        }
        .poster:hover {
          transform: scale(1.1);
        }

        .average {
          height: 40px;
          width: 40px;
          color: #fff;
          background-color: rgb(var(--base-blue));
          position: absolute;
          border-radius: 50%;
          font-size: 0.7rem;
          bottom: -25px;
          left: 10px;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          grid-template-areas: "inner";
          place-items: center;
        }

        .average p {
          z-index: 2;
          grid-area: inner;
        }
      `}</style>
    </div>
  );
}
function Canvas({ average }) {
  const canvasRef = useRef();
  function hsl_col_perc(percent) {
    var a = percent / 100,
      b = (120 - 0) * a,
      c = b + 0;

    return "hsl(" + c + ", 100%, 50%)";
  }
  useEffect(() => {
    const can = canvasRef.current;
    const ctx = can.getContext("2d");
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = hsl_col_perc(average * 10);
    ctx.arc(20, 20, 15, 0, 2 * Math.PI * (average / 10));
    ctx.stroke();
  }, [canvasRef]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="canvas"
        height="40px"
        width="40px"
      ></canvas>
      <style jsx>
        {`
          .canvas {
            grid-area: inner;
            z-index: 1;
          }
        `}
      </style>
    </>
  );
}
