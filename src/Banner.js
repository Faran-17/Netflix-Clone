import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]); // randonm movies

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ] // The above math func will randomly load any movie in the banner
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  // The below func will add ... to the description of the movie
  // if there is too much text. Via Stackoverflow
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    /** Header will contain the bkgrnd img */
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
        backgroundPosition: "center center",
      }}
    >
      {/* Title */}
      <div className="banner__contents">
        <h1 className="banner_title">
          {/**Condition if can find movie name then load name from other conditions */}
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/** div 2 buttons */}
        <div className="banner__buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        {/** description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
