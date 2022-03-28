import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Layout from "./layout/Layout";

function App() {

  const paths = [
    { path: "popular", title: "Popular" },
    { path: "now_playing", title: "Now Playing" },
    { path: "top_rated", title: "Top Rated" },
   /*  { path: "latest", title: "Latest" }, */
    { path: "upcoming", title: "Upcoming" },
  ];

  return (
    <Layout paths={paths}>
      <Routes>
      <Route path="/" element={<Home />} />
        {paths.map((path, i) => (
          <Route key={i} path={path.path} element={<Home />} />
        ))}
        <Route path="/:movieId" element={<MovieDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
