import { useEffect } from "react";
import { debounce } from "debounce";

export default function Search() {
  useEffect(() => {}, []);
  return (
    <div className="search">
      <form>
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
        </ul>
      </div>
      <style jsx>{`
        .search {
          position: -webkit-sticky;
          position: sticky;
          top: 0;

          background: #fff;
          color: rgb(var(--base-blue));
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
          line-height: 30px;
          padding: 5px 1rem;
          color: inherit;
        }
        .trends li p:first-of-type {
          font-weight: bold;
          font-size: 1.3rem;
        }
      `}</style>
    </div>
  );
}
