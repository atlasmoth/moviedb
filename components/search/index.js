import { useEffect, useState } from "react";
import Link from "next/link";

export default function Search() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.trim().length === 0) setItems([]);

    if (query.trim().length > 0) {
      const asyncFetcher = async () => {
        try {
          const { results } = await (
            await fetch(
              `https://api.themoviedb.org/3/search/multi?api_key=${
                process.env.NEXT_PUBLIC_API_KEY
              }&query=${encodeURI(query)}&page=1`
            )
          ).json();
          setItems(results);
        } catch (error) {
          console.log(error);
        }
      };
      asyncFetcher();
    }
  }, [query]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { trending } = Object.fromEntries(new FormData(e.target));

    location.href = `/search?query=${trending}`;
  };
  return (
    <div className="search" id="search">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="icon-search">
          <span>
            <i className="fas fa-search"></i>
          </span>
          <span>
            <input
              type="search"
              name="trending"
              id="trending"
              placeholder="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </span>
        </div>
      </form>

      <div className="trends">
        <ul>
          <li>
            <p>
              <i className="fas fa-chart-line"></i> Trending
            </p>
          </li>
          {items.map((i) => (
            <li key={i.id}>
              <Link
                href={`/search?query=${encodeURIComponent(i.title || i.name)}`}
              >
                <a>
                  <p>
                    <i className="fas fa-search"></i>&nbsp; &nbsp; &nbsp;
                    {i.title || i.name} {i.media_type && `in ${i.media_type}`}
                  </p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .search {
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          z-index: 90;
          background: #fff;
          color: rgb(var(--base-blue));
          display: none;
          transition: 0.3s ease;
        }
        .icon-search {
          display: flex;
          align-items: center;
          padding: 0px 1rem;
        }
        .icon-search span:nth-of-type(2) {
          flex-grow: 1;
        }
        input[name="trending"] {
          width: 100%;
          padding: 1rem;
          border: none;
        }
        input[name="trending"]::placeholder {
          font-style: italic;
          text-transform: capitalize;
        }
        .trends {
          position: absolute;
          left: 0;
          right: 0;
          background-color: #fff;
        }
        .trends ul {
          list-style: none;
        }
        .trends li {
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          border-collapse: collapse;
        }
        .trends li p {
          padding: 5px 1rem;
          color: inherit;
        }
        .trends li:first-of-type p {
          font-weight: bold;
          font-size: 1.3rem;
        }
      `}</style>
    </div>
  );
}
