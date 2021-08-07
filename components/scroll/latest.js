import { useEffect, useState } from "react";
import Scroll from ".";

export default function Latest() {
  const [keys] = useState(["tv", "movie"]);
  const [currKey, setCurrKey] = useState(keys[0]);
  const [media, setMedia] = useState([]);
  useEffect(() => {
    fetch(`


https://api.themoviedb.org/3/${encodeURI(currKey)}/latest?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }`)
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
          title={"Latest"}
          updateKey={(idx) => setCurrKey(idx)}
          items={keys}
          currKey={currKey}
        />
        <div className="scrollDivs">
          {media.map((m) => (
            <div className="card" key={m.id}>
              <div className="poster">
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${
                    m.backdrop_path || m.poster_path
                  }`}
                  alt="poster"
                />
                <div className="average">
                  <p>{m.vote_average}</p>
                </div>
              </div>
              <div style={{ fontWeight: "bold", marginTop: "1.5rem" }}>
                <p>{m.title || m.name}</p>
              </div>
              <div>
                <p>{m.first_air_date}</p>
              </div>
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
