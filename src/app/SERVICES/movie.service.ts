import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class MovieService {

  url = '/api'

  constructor(private HttpClient: HttpClient) { }

  getMovie() {
    return this.HttpClient.get(this.url)
  }

  getMovieid(id: number) {
    console.log("get por id ", id)
    return this.HttpClient.get(this.url + '/' + id)
  }

  addMovie(movie: any) {
    return this.HttpClient.post(this.url, movie)
  }

  deleteMovie(id: number) {
    console.log("deletemovie ", id)
    return this.HttpClient.delete(this.url + '/' + id)
  }

  editMovie(movie_id: number, movie: any) {
    console.log("modificando ", movie)
    return this.HttpClient.put(this.url + '/' + movie_id, movie);
  }

}

export interface Movie {
  title?: any;
  cast?: any;
  crew?: any;
}



