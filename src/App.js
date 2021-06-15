import "./App.scss"

import axios from "axios"

// import AddFilm from "./components/AddFilm/index.js"
import { useEffect, useState } from "react"

function useForceUpdate() {
  const [value, setValue] = useState(0)
  return () => setValue((value) => value + 1)
}

function App() {
  const [MOVIES, setMovies] = useState([])

  const forceUpdate = useForceUpdate()

  const [searchTerm, setSearchTerm] = useState("")

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

  function sortByAlphabet() {
    const sortedMovies = MOVIES.sort((a, b) => (a.Title > b.Title ? 1 : -1))

    setMovies(sortedMovies)

    forceUpdate()
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

      <main>
        <div className="wrap-search">
          <button onClick={() => sortByAlphabet()}>Sort by Alphabet</button>
          <input
            name="search"
            type="text"
            maxLength="30"
            placeholder="Type here title or actor's name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
          />
        </div>
        <div className="item-list">
          {searchTerm === ""
            ? MOVIES.map(
                ({
                  id,
                  Title: title,
                  "Release Year": year,
                  Format: format,
                  Stars: stars,
                }) => {
                  return (
                    <div className="movie" key={id}>
                      <div className="title">Title: {title}</div>
                      <div className="year">Release year: {year}</div>
                      <div className="format">Format: {format}</div>
                      <div className="stars">Film stars: {stars}</div>
                      <div className="filmId">Film ID: {id}</div>
                    </div>
                  )
                }
              )
            : MOVIES.filter(
                ({
                  id,
                  Title: title,
                  "Release Year": year,
                  Format: format,
                  Stars: stars,
                }) => {
                  return (
                    title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    stars.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    format.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    year.toString().includes(searchTerm.toString()) ||
                    id.toString().includes(searchTerm.toString())
                  )
                }
              ).map(
                ({
                  id,
                  Title: title,
                  "Release Year": year,
                  Format: format,
                  Stars: stars,
                }) => {
                  return (
                    <div className="movie" key={id}>
                      <div className="title">Title: {title}</div>
                      <div className="year">Release year: {year}</div>
                      <div className="format">Format: {format}</div>
                      <div className="stars">Film stars: {stars}</div>
                      <div className="filmId">Film ID: {id}</div>
                    </div>
                  )
                }
              )}
        </div>
      </main>
    </div>
  )
}

export default App
