import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Layout from "./layout/Layout";

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/:movieId" element={<MovieDetails />} />
        </Routes>
      </Layout>
  );
}

export default App;
