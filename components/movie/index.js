import { useRef, useEffect, useState } from "react";
import Link from "next/link";
export default function Movie(props) {
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${props.data.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((res) => res.json())
      .then(({ cast }) => {
        cast = cast.filter(
          (c) =>
            c.profile_path && c.profile_path.trim() > "" && c.popularity > 4
        );
        cast.sort((a, b) => b.popularity - a.popularity);

        setCast(cast);
      })
      .catch(console.log);

    // get recommendations
    fetch(
      `https://api.themoviedb.org/3/movie/${props.data.id}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        results.sort((a, b) => b.vote_average - a.vote_average);

        setRecommendations(results);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="movie">
      <div className="banner">
        <div className="boundary">
          <div className="info">
            <div className="img">
              <img
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${props.data.poster_path}`}
                alt="poster"
              />
            </div>
            <div className="details">
              <h2 className="title">
                {props.data.title} (
                {new Date(props.data.release_date).getFullYear()})
              </h2>
              <div className="tags">
                <span>
                  {new Date(props.data.release_date).toLocaleDateString()}
                </span>
                <span>
                  {props.data.genres.reduce((a, b) => (a += `${b.name} ,`), "")}
                </span>
                <span>{(Number(props.data.runtime) / 60).toFixed(1)}h</span>
              </div>
              <div className="average">
                <p>{props.data.vote_average}</p>
                <Canvas average={Number(props.data.vote_average || 0)} />
              </div>
              <p className="tagline">
                <em>{props.data.tagline}</em>
              </p>
              <h2>Overview</h2>
              <div className="overview">{props.data.overview}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="boundary">
        <h2>Top Billed Cast</h2>
        <div className="scrollDivs">
          {cast.map((m) => (
            <div className="card" key={m.id}>
              <Link href={`/media/person?id=${m.id}`}>
                <a>
                  <div className="poster">
                    <img
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${m.profile_path}`}
                      alt="poster"
                    />
                  </div>
                  <div style={{ fontWeight: "bold", marginTop: "1.5rem" }}>
                    <p>{m.name}</p>
                  </div>
                  <div>
                    <p>{m.character}</p>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="boundary">
        <h2>Recommendations</h2>
        {recommendations.length > 0 && <Latest movies={recommendations} />}
      </div>
      <style jsx>{`
        .tags {
          display: flex;
          align-items: center;
        }
        .tags span {
          margin-right: 1rem;
        }
        .tags span:first-of-type ~ span {
          position: relative;
          padding-left: 0.5rem;
          margin-left: 0.5rem;
        }
        .tags span:first-of-type ~ span::before {
          color: #fff;
          content: ".";
          font-size: 3rem;
          position: absolute;
          bottom: -5px;
          left: -10px;
        }
        .title {
          font-size: 2rem;
        }
        .banner {
          min-height: 50vh;
          background-image: linear-gradient(
              to top,
              rgba(var(--base-blue), 0.8) 0%,
              rgba(var(--base-blue), 0.8) 30%
            ),
            url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${props
              .data.backdrop_path}");
          background-size: cover;
          background-repeat: no-repeat;
          background-position: top center;
        }
        .info {
          display: flex;
          align-items: center;
        }
        .overview {
          margin: 0.5rem 0px;
        }
        .img {
          flex-grow: 0;
          flex-shrink: 0;
        }
        .details {
          flex-grow: 1;
          color: #fff;
          padding: 1rem;
          flex-shrink: 1;
        }
        .img img {
          width: 20vw;
          border-radius: 10px;
        }
        .tagline {
          margin: 0.5rem 0px;
          color: #ddd;
        }
        .average {
          height: 60px;
          width: 60px;
          color: #fff;
          background-color: rgb(var(--base-blue));
          border-radius: 50%;
          font-size: 1rem;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          grid-template-areas: "inner";
          place-items: center;
          cursor: pointer;
          transition: 0.3s ease;
          margin: 1rem 0px;
        }

        .average p {
          z-index: 2;
          grid-area: inner;
        }
        .average:hover {
          transform: scale(1.2);
        }
        @media only screen and (max-width: 768px) {
          .info {
            flex-wrap: wrap;
          }
          .title {
            font-size: 1rem;
          }
        }
        .scrollDivs {
          margin: 1rem 0px;
          padding-bottom: 1rem;
          overflow-x: scroll;
          display: grid;
          grid-template-columns: repeat(${cast.length}, 150px);
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
      `}</style>
    </div>
  );
}
function Latest({ movies }) {
  const [background, setBackground] = useState(
    `https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces//${
      movies[0].backdrop_path || movies[0].poster_path
    }`
  );

  return (
    <div className="house">
      <div className="boundary">
        <div className="scrollDivs">
          {movies.map((m) => (
            <div className="card" key={m.id}>
              <Link href={`/media/movie?id=${m.id}`}>
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
          grid-template-columns: repeat(${movies.length}, 300px);
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
          height: 60px;
          width: 60px;
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
    ctx.lineWidth = 3;
    ctx.strokeStyle = hsl_col_perc(average * 10);
    ctx.arc(30, 30, 25, 0, 2 * Math.PI * (average / 10));
    ctx.stroke();
  }, [canvasRef]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="canvas"
        height="60px"
        width="60px"
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
