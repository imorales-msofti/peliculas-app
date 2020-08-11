import React, { Component } from 'react';

export default class Pelicula extends Component {

  render() {
    const img_base_url = process.env.REACT_APP_MOVIE_DB_IMG_BASE_URL;
    // const img_url = "https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg";
    // http://image.tmdb.org/t/p/w500/3eg0kGC2Xh0vhydJHO37Sp4cmMt.jpg
    const poster_size = "w500";
    const img_url = `${img_base_url}${poster_size}${this.props.pelicula.poster_path}`;

    console.log("img_url", img_url);

    return (
      <div className="col-md-6">
        <img src={img_url} alt="" className="img-fluid" />
        <p className="text-center">{this.props.pelicula.original_title}</p>
        <p className="text-center">{this.props.pelicula.vote_average}</p>
        <p className="text-center">{this.props.pelicula.release_date}</p>

      </div>
    )
  }
}
