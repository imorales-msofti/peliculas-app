import React, { Component } from 'react';
import moment from 'moment';
export default class Pelicula extends Component {

  render() {
    const img_base_url = process.env.REACT_APP_MOVIE_DB_IMG_BASE_URL;
    const poster_size = "w342";
    let img_url;

    //Valida si existe imagen, en caso que no establece una imagen por Defalut
    if(this.props.pelicula.poster_path){

      img_url = `${img_base_url}${poster_size}${this.props.pelicula.poster_path}`;
    }
    else{
      img_url = `${process.env.PUBLIC_URL}/noImagenAvailable.jpg`;
      
    }
    return (
      <div className="col-md-6">
        <div className="img-container" onClick={e=> this.props.handleClick(this.props.pelicula.id)}>
          <img src={img_url} alt="" className="img-fluid" />
          <div className="positioning">
            <p className="text-left">{this.props.pelicula.original_title}</p>
            <br/>
            <p className="text-left">{moment(this.props.pelicula.release_date).format("DD-MMM-YYYY")}</p>
            <p className="text-right"><i className="far fa-star" style={{'color':'#fffb00'}}></i>&nbsp;{this.props.pelicula.vote_average}</p>
          </div>

        </div>
      </div>
    )
  }
}
