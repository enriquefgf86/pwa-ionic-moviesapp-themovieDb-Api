import {
  AllGenres,
  Genre,
  MovieSelectedCredit,
  multiSearch,
  youtubeSearch,
} from "./../interfaces/data-interface";
import { LanguageComponent } from "./../components/language/language.component";
import { environment } from "./../../environments/environment";
import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  ImagesMovieSelected,
  MovieSelectedDetails,
  ResultMovieDb,
} from "../interfaces/data-interface";
import { Observable } from "rxjs";

const url = environment.urlMoviesMain;
const apiKey = environment.apiMovieKey;
const ypoutubeApiKey = environment.youtbeApi;
const youtubeUrl = environment.urlYoutubeSearch;
const headers = new HttpHeaders({
  "Access-Control-Allow-Origin": "http://localhost:8100",
});

@Injectable({
  providedIn: "root",
})
export class MoviesDataService {
  pageCounter: number = 0;
  pageCounterMultiSearch: number = 0;

  public changeLanguage: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) {}

  private executeMoviesQuery<T>(query: string) {
    query = `${url}${query}`;
    return this.http.get<T>(query);
  }

  private executeMoviesQueryYoutube<T>(query: string) {
    query = `${youtubeUrl}${query}`;
    return this.http.get<T>(query);
  }

  getMoviesByReleasedDates(
    initDate: string,
    lastDate: string,
    language: string
  ) {
    // const today = new Date();
    // const lastDay = new Date(
    //   today.getFullYear(),
    //   today.getMonth() + 1,
    //   0
    // ).getDate();
    // let monthFirstDay = "01";
    // let monthString;
    // const month = today.getMonth() + 1;

    // if (month < 10) {
    //   monthString = "0" + month;
    // } //conformando las fechas dinamicamente especificandos si el mes es septiembre o inferior
    // else {
    //   monthString = month;
    // }

    // initDate = `${today.getFullYear}-${monthString}-${monthFirstDay}`;
    // lastDate = `${today.getFullYear}-${monthString}-${lastDay}`;
    this.pageCounter++;
    return this.executeMoviesQuery<ResultMovieDb>(
      `discover/movie?primary_release_date.gte=${initDate}&primary_release_date.lte=${lastDate}&language=${language}&page=${this.pageCounter}&api_key=${apiKey}`
    );
  }

  getMoviesMostPopular(popularity: string, language: string) {
    this.pageCounter++;
    return this.executeMoviesQuery<ResultMovieDb>(
      `discover/movie?api_key=${apiKey}&language=${language}&sort_by=${popularity}&page=${this.pageCounter}`
    );
  }

  multiSearchQuery(search: string, language: string) {
    this.pageCounterMultiSearch++;
    return this.executeMoviesQuery<multiSearch>(
      `search/multi/?api_key=${apiKey}&language=${language}&query=${search}&page=${this.pageCounterMultiSearch}`
    );
  }

  getMovieSelecteddetails(movie_id: string, language: string) {
    return this.executeMoviesQuery<MovieSelectedDetails>(
      `movie/${movie_id}?api_key=${apiKey}&language=${language}`
    );
  }

  getMovieSelectedCredits(movie_id: string) {
    return this.executeMoviesQuery<MovieSelectedCredit>(
      `movie/${movie_id}/credits?api_key=${apiKey}`
    );
  }

  getMovieSelectedImages(movie_id: string, language: string) {
    return this.executeMoviesQuery<ImagesMovieSelected>(
      `movie/${movie_id}/images?api_key=${apiKey}&include_image_language=${language}`
    );
  }

  getMoviegenres(language: string) {
    return this.executeMoviesQuery<AllGenres>(
      `genre/movie/list?api_key=${apiKey}&language=${language}`
    );
  }

  getTrailersYoutube(searchTrailer: string) {
    return this.executeMoviesQueryYoutube<youtubeSearch>(
      `q=${searchTrailer}&topicId=%2Fm%2F02vxn&key=${ypoutubeApiKey}`
    );
  }

  getVideoEmbededUrl(videoId: string) {
    return this.http.get<any>(`https://www.youtube.com/embed/${videoId}`, {
      headers,
    });
  }

  // changeLanguageEmitter(value: string) {
  //   this.changeLanguage.emit(value);
  // }

  pagesRebooter() {
    return (this.pageCounter = 0);
  }
  pagesRebooterMultisearch() {
    return (this.pageCounterMultiSearch = 0);
  }
}
