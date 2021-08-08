import { useEffect, useRef, useState } from "react";
import Scroll from ".";
import Link from "next/link";

export default function Trending() {
  const [keys] = useState(["day", "week"]);
  const [currKey, setCurrKey] = useState(keys[0]);
  const [media, setMedia] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/all/${encodeURI(
        currKey
      )}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setMedia(results);
      })
      .catch(console.log);
  }, [currKey]);

  return (
    <>
      <div className="boundary">
        <Scroll
          title={"Trending"}
          updateKey={(idx) => setCurrKey(idx)}
          items={keys}
          currKey={currKey}
        />
        <div className="scrollDivs">
          {media.map((m) => (
            <div className="card" key={m.id}>
              <Link href={`/media/${currKey}?id=${m.id}`}>
                <a>
                  <div className="poster">
                    <img
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${m.backdrop_path}`}
                      alt="poster"
                    />
                    <div className="average">
                      <p>{m.vote_average}</p>
                      <Canvas average={Number(m.vote_average || 0)} />
                    </div>
                  </div>
                  <div style={{ fontWeight: "bold", marginTop: "1.5rem" }}>
                    <p>{m.title || m.name}</p>
                  </div>
                  <div>
                    <p>{m.release_date}</p>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
        <style jsx>{`
          .scrollDivs {
            margin: 1rem 0px;
            padding-bottom: 1rem;
            overflow-x: scroll;
            display: grid;
            grid-template-columns: repeat(${media.length}, 100px);
            grid-gap: 1rem;
            grid-auto-rows: auto;
            background-image: url("https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg");
            background-repeat: repeat-x;
            background-position: center;
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
          }
          .poster img {
            border-radius: 10px;
            height: 60%;
            width: 100%;
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
    </>
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
