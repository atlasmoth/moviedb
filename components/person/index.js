import { useEffect, useState } from "react";
import Link from "next/link";
export default function Movie(props) {
  const [movies, setMovies] = useState([]);
  const [fullList, setFullList] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${props.data.id}/combined_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((res) => res.json())
      .then(({ cast, crew }) => {
        setMovies([
          ...cast,
          ...crew.filter(
            (c) =>
              !cast.find((ca) => ca.id === c.id) &&
              (c.backdrop_path || c.poster_path)
          ),
        ]);
        setFullList([
          ...cast,
          ...crew.filter((c) => !cast.find((ca) => ca.id === c.id)),
        ]);
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
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${props.data.profile_path}`}
                alt="poster"
              />
            </div>
            <div className="details">
              <h2 className="title">{props.data.name}</h2>

              <h2>Biography</h2>
              <div className="overview">{props.data.biography}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="boundary">
        <h2>Known For</h2>
        <div className="scrollDivs">
          {movies.map((m) => (
            <div className="card" key={m.id}>
              <Link href={`/media/${m.media_type}?id=${m.id}`}>
                <a>
                  <div className="poster">
                    <img
                      src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${
                        m.backdrop_path || m.poster_path
                      }`}
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
        <h2>Work</h2>
        <ul className="list">
          {fullList.map((f) => (
            <li id={f.id} key={f.id}>
              <Link href={`/media/${f.media_type}?id=${f.id}`}>
                <a>
                  <span>
                    {f.release_date || f.first_air_date
                      ? new Date(
                          f.release_date || f.first_air_date
                        ).getFullYear()
                      : "-"}
                  </span>
                  <b>{f.name || f.title}</b> as {f.character}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .list {
          list-style: none;
        }
        .list li {
          padding: 5px 0px;
        }
        .list li span {
          margin-right: 2rem;
          text-align: center;
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
          );
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
          .img {
            margin: 0 auto;
          }
          .img img {
            width: 40vw;
            height: 150px;
            object-fit: cover;
          }
        }
        .scrollDivs {
          margin: 1rem 0px;
          padding-bottom: 1rem;
          overflow-x: scroll;
          display: grid;
          grid-template-columns: repeat(${movies.length}, 150px);
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
