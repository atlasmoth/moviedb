export default function Scroll({ items, title, updateKey, currKey }) {
  return (
    <div className="scroll">
      <h2>{title}</h2>
      <div className="scrollArea">
        {items.map((i) => (
          <span
            key={i}
            className={currKey === i && "active"}
            onClick={() => updateKey(i)}
          >
            {i}
          </span>
        ))}
      </div>
      <style jsx>{`
        .scroll {
          display: flex;
          margin: 1rem 0px;
          align-items: center;
          padding-bottom: 1rem;
        }
        .scrollArea {
          margin-left: 1rem;
          border: 1px solid rgb(var(--base-blue));
          border-radius: 20px;
          display: flex;
          align-items: center;
          text-transform: capitalize;
        }
        .scrollArea span {
          cursor: pointer;
          border-radius: 20px;
          padding: 5px 1rem;
          font-weight: bold;
        }
        .scrollArea span.active {
          background: linear-gradient(
            to right,
            rgba(195, 254, 207, 1) 0%,
            rgba(30, 213, 169, 1) 100%
          );
          color: rgb(var(--base-blue));
        }
      `}</style>
    </div>
  );
}
Scroll.defaultProps = {
  items: [],
};
