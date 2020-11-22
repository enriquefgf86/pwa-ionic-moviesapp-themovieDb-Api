import { MovieSelectedDetails } from "./../interfaces/data-interface";
import { MoviesDataService } from "./../services/movies-data.service";
import { Component, OnInit } from "@angular/core";
import { Genre, Movie } from "../interfaces/data-interface";
import { DataStorageService } from "../services/data-storage.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  moviesFav: MovieSelectedDetails[] = [];
  language: string = "en";
  allGenres: Genre[] = [];
  favoritesByGenre: any[] = [];

  constructor(
    private storageservice: DataStorageService,
    private movieDataService: MoviesDataService
  ) {}

  async ngOnInit() {
    // await this.getFavorites();
    // await this.getAllGenres();

    // console.log(this.moviesFav);

    // this.getMoviesByGenre(this.allGenres, this.moviesFav)
  }

  async ionViewWillEnter(){
    await this.getFavorites();
    await this.getAllGenres();

    console.log(this.moviesFav);

    // this.getMoviesByGenre(this.allGenres, this.moviesFav)
  }//parecido al ngonInti pero para Ionic

  async getFavorites() {
    let moviesFav = await this.storageservice.loadfavoritesinStorage();

    if (moviesFav) {
      this.moviesFav = moviesFav;
    }

    await console.log(moviesFav);

    return (this.moviesFav = moviesFav);
  }

  getAllGenres() {
   this.movieDataService.getMoviegenres(this.language).subscribe((result) => {
      this.allGenres = result.genres;
      console.log(this.allGenres);
      this.getMoviesByGenre(this.allGenres,this.moviesFav)
    });
  }

  getMoviesByGenre(genres: Genre[], movies: MovieSelectedDetails[]) {
     (this.favoritesByGenre = []),
      genres.forEach((genre) => {
        this.favoritesByGenre.push({
          genre: genre.name,
          movies: movies.filter((movie) => {
            return movie.genres.find((genreId) => genreId.id === genre.id);
          }),
        });
      });
    console.log(this.favoritesByGenre);
  }
}
