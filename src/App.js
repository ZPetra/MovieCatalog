import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Layout from "./layout/Layout";
import MovieContextProvider from "./store/MovieContextProvider";

function App() {
  return (
    <MovieContextProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/:movieId" element={<MovieDetails />} />
        </Routes>
      </Layout>
    </MovieContextProvider>
  );
}

export default App;
