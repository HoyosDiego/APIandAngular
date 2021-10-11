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
    return this.HttpClient.get(this.url + '/' + id)
  }

  addMovie(movie: any) {
    return this.HttpClient.post(this.url, movie)
  }

  deleteMovie(id: number) {
    return this.HttpClient.delete(this.url + '/' + id)
  }

  editMovie(movie_id: number, movie: any) {
    return this.HttpClient.put(this.url + '/' + movie_id, movie);
  }

}

export interface Movie {
  title?: any;
  cast?: any;
  crew?: any;
}



