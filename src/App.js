import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Pelicula from './components/Pelicula';
import Modal from 'react-modal';
import moment from 'moment';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      peliculas: [],
      modalIsOpen: false,
      pelicula:{},
      genresString:''
    };

    Modal.setAppElement('#root');
    this.closeModal = this.closeModal.bind(this);
    this.getMovieDetail = this.getMovieDetail.bind(this);
    this.handleClickMovie = this.handleClickMovie.bind(this);
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  getMovieDetail(peliculaID) {
    // const peliculaID = 100;
    const url = `https://api.themoviedb.org/3/movie/${peliculaID}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=es-MX`;
    const img_base_url = process.env.REACT_APP_MOVIE_DB_IMG_BASE_URL;
    const poster_size = "w342";

    fetch(url)
      .then(request => request.json())
      .then(data => {
        console.log("data-pelicula",data);
        this.setState({ pelicula: {
          ...data, 
          img_src:`${img_base_url}${poster_size}${data.poster_path}`,
          genresString:data.genres.map(m=>m.name).join(", ")}
        })
      });
  }

  handleClickMovie(event){
    this.getMovieDetail(event);

    this.setState({ modalIsOpen: true });
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">

          <div className="container">
            <div className="row">
              {
                this.state.peliculas.map((itemPelicula, index) =>
                  <Pelicula key={index} pelicula={itemPelicula} handleClick={this.handleClickMovie} />
                )
              }
            </div>
            <Modal isOpen={this.state.modalIsOpen} style={{ content: { top: '10%', left: '35%', right: '35%', bottom: 'auto',  height: '500px', overlfow: 'scroll', transform: 'translate(-10%, -10%)'} }}>
              <div>
                <button onClick={this.closeModal}><i className="fas fa-times"></i></button>
              </div>
              <img src={this.state.pelicula.img_src} alt="" className="img-fluid" />
              <br/>
              <h2>{this.state.pelicula.title}</h2>
              <br/>
              <h3>Duración</h3>
              <p>{this.state.pelicula.title}</p>
              <h3>Fecha de estreno</h3>
              <p>{moment(this.state.pelicula.release_date).format("DD-MMM-YYYY")}</p>
              <h3>Calificación</h3>
              <p>{this.state.pelicula.vote_average}</p>
              <h3>Géneros</h3>
              <p>{this.state.pelicula.genresString}</p>
              <h3>Descripción</h3>
              <p>{this.state.pelicula.overview}</p>
            </Modal>

          </div>

        </header>
      </div >
    );
  }


  componentDidMount() {

    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=es-MX&region=MX`;
    fetch(url)
      .then(request => request.json())
      .then(data => {
        this.setState({ peliculas: data.results });
        // this.getMovieDetail()
      });

      
  }

}

