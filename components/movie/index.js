import { useRef, useEffect } from "react";
export default function Movie(props) {
  console.log(props);

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
                <span>{props.data.runtime}</span>
              </div>
              <div className="average">
                <p>{props.data.vote_average}</p>
                <Canvas average={Number(props.data.vote_average || 0)} />
              </div>
              <p>
                <em>{props.data.tagline}</em>
              </p>
              <h2>Overview</h2>
              <div className="overview">{props.data.overview}</div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .tags span {
          padding-right: 0.5rem;
          margin-right: 0.5rem;
        }
        .tags span::after {
          display : block;
          width : 5px;
          height : 5px;
          border-radius : 50%:
          background-color : #fff;
          margin-left : 100%;
          content : "cme";
        }
        .title {
          font-size: 2rem;
        }
        .banner {
          min-height: 60vh;
          background-image: linear-gradient(
              to top,
              rgba(var(--base-blue), 0.8) 0%,
              rgba(var(--base-blue), 0.8) 30%
            ),
            url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${props.data.backdrop_path}");
          background-size: cover;
          background-repeat: no-repeat;
          background-position: top left;
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
    ctx.lineWidth = 5;
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
