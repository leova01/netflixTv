import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


const options = {
  params:{
    include_video: 'true',
    laguage: 'es-ES',
    page: '1',
    sort_by: 'popularity.desc',
    loop: true,
},
 headers:{
  accept: 'application/json',
  Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmRlZWY0M2NjZGQzZjhiZDZmYjBhZTViMzQ4OTUxZSIsIm5iZiI6MTcyMjY2MDA2NS4zNTE3NjgsInN1YiI6IjY2YWRiM2NmOGM0YmJkYzYxMmIwYTRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aNnOcDbeOR95ue61NnwJDyScgTwN0tZ2M9rRoozWsDI'
}
}

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  http=inject(HttpClient);
  
   getMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', options)
  }

  getTvShows() {
    return this.http.get('https://api.themoviedb.org/3/discover/tv', options)
  }

  getBannerImage(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/images`, options)
  }

  getBannerVideo(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
  }

  getBannerDetail(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, options);
  }

  getNowPlayingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing', options)
  }

  getPopularMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular', options)
  }

  getTopRated() {
    return this.http.get('https://api.themoviedb.org/3/movie/top_rated', options)
  }

  getUpcomingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming', options)
  }

  getDetails(movie_id: any){
    
      return this.http.get(`https://api.themoviedb.org/3/movie/${movie_id}`, options)
  }

  constructor() { }
}
