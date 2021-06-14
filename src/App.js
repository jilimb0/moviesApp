import "./App.css"

import axios from "axios"

import AddFilm from "./components/AddFilm/index.js"
import { useEffect, useState } from "react"

function App() {
  const [MOVIES, setMovies] = useState([])

  async function getMovies() {
    setMovies(
      await axios
        .get("http://localhost:3001/films")
        .then(({ data }) => data)
        .catch((e) => {
          throw e
        })
    )
  }

  /** Troubles with data sending (empty body) */

  // async function postMovies(id, title, year, format, stars) {
  //   const data = {
  //     id,
  //     Title: title,
  //     "Release Year": year,
  //     Format: format,
  //     Stars: stars,
  //   }
  //   console.log(data)
  //   return await axios
  //     .post("http://localhost:3001/films", data, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => console.log(res.data))
  //     .catch((error) => console.error(error))
  // }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="App">
      <header>
        {/* <button
          className="addFilm"
          onClick={() => {
            postMovies(
              24,
              "Knocked Up",
              2007,
              "Blu - Ray",
              "Seth Rogen, Katherine Heigl, Paul Rudd, Leslie Mann"
            )
          }}
        >
          ADD
        </button> */}

        <button>Sort by Alphabet</button>
        <input
          type="search"
          name="Search"
          id=""
          placeholder="Title or actor's name..."
        />
      </header>
      <section>
        {MOVIES.map(
          ({
            id,
            Title: title,
            "Release Year": year,
            Format: format,
            Stars: stars,
          }) => {
            return (
              <div className="movie" key={id}>
                <div className="filmId">Film ID: {id}</div>
                <div className="title">Title: {title}</div>
                <div className="year">Release year: {year}</div>
                <div className="format">Format: {format}</div>
                <div className="stars">Film stars: {stars}</div>
              </div>
            )
          }
        )}
      </section>
    </div>
  )
}

export default App
