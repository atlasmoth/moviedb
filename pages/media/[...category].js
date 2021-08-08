import Nav from "./../../components/nav";
import Search from "./../../components/search";
import Splash from "./../../components/header/splash";
import Movie from "../../components/movie";

export default function Category(props) {
  return (
    <div className="category">
      <Nav />
      <Search />
      <Splash />
      {props.category === "movie" && <Movie {...props} />}
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const {
    query: { id },
    params: { category },
  } = ctx;

  try {
    const data = await (
      await fetch(
        `https://api.themoviedb.org/3/${category[0]}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      )
    ).json();
    return {
      props: { data, category, id },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {},
  };
}
