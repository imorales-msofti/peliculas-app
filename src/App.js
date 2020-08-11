import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Pelicula from './components/Pelicula';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      peliculas: [],
    };

    // this.handleInputImg = this.handleInputImg.bind(this);
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">

          <div class="container">
            <div class="row">
              {
                this.state.peliculas.map((itemPelicula, index) =>
                  <Pelicula pelicula={itemPelicula} />
                )
              }
            </div>

          </div>

        </header>
      </div>
    );
  }


  componentDidMount() {

    console.log('env', process.env);

    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=es-MX&page=1`;
    fetch(url)
      .then(request => request.json())
      .then(data => {
        this.setState({ peliculas: data.results })
      });
  }

}

