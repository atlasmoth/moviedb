import { useEffect, useState } from "react";
import Scroll from ".";

export default function Trending() {
  const [keys, setKeys] = useState(["day", "week"]);
  const [currKey, setCurrKey] = useState(keys[0]);

  useEffect(() => {
    fetch(`
https://api.themoviedb.org/3/trending/all/${encodeURI(currKey)}?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }`)
      .then((res) => res.json())
      .then(console.log)
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
        <div className="scrollDivs"></div>
        <style jsx>{`
          .scrollDivs {
            margin: 1rem 0px;
          }
        `}</style>
      </div>
    </>
  );
}
