import { DataStorageService } from "src/app/services/data-storage.service";
import { MovieDetailComponent } from "./../components/movie-detail/movie-detail.component";
import { Movie } from "./../interfaces/data-interface";
import { MoviesDataService } from "./../services/movies-data.service";
import { Component, OnInit } from "@angular/core";
import { ResultMovieDb } from "../interfaces/data-interface";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  //variables query for dates
  date: Date = new Date(); //variable de fecha corriente que determina el mes en
  //curso para determinar mes inicial y final

  init: string = this.getInitialAndLastDaysDefault(
    new Date(this.date.getFullYear(), this.date.getMonth(), 1).toDateString()
  ); //iniciandose la variable init con el dia incial por defecto del mes
  // en curso por default
  last: string = this.getInitialAndLastDaysDefault(
    new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).toString()
  ); //iniciandose la variable lastt con el dia incial por defecto del mes
  // en curso por default

  language: string;
  initState: boolean = false;
  lastState: boolean = true;
  disabled: boolean = true;

  //variables query for popularity
  adultRating: boolean = false;
  video: boolean = false;
  popularity: string;
  popularityState: boolean = false;
  popularityDisplay: string;

  recentMovies: Movie[] = [];
  mostPopularMovies: Movie[] = [];

  customPickerOptions: any;

  sliderOptions = {
    slidesPerView: 1.4,
    freeMode: true,
    autoplay: true,
  };
  constructor(
    private dataMoviesService: MoviesDataService,
    private modalController: ModalController,
    private languageStorage: DataStorageService
  ) {}

  async ngOnInit() {
    let init = await this.languageStorage.getInitDateAtStorage();
    

    let last = await this.languageStorage.getLastDateAtStorage();
    this.init = init;
    this.last = last;
    console.log(this.init, this.last);

    if (this.popularityState) {
      this.popularity = "popularity.asc";
      this.popularityDisplay = "Ascending";
    } else {
      this.popularity = "popularity.desc";
      this.popularityDisplay = "Descending";
    }
    this.gettingAllData(this.init, this.last, this.language);

    this.gettingAllDataPopularity(this.popularity, this.language);
    this.initState = false;
    this.lastState = false;
  }

  async detailImgSelected() {
    const modal = await this.modalController.create({
      component: MovieDetailComponent,
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }

  dateInitChange(event?) {
    this.initState = true;
    this.init = event.detail.value.slice(0, 10);
    this.languageStorage.settingInitialDate(event.detail.value.slice(0, 10));//salvando en storage las dates
  }
  dateLastChange(event?) {
    this.lastState = true;
    this.last = event.detail.value.slice(0, 10);
    this.languageStorage.settingLastDate(event.detail.value.slice(0, 10));//salvando en storage las dates
  }

  async receiveLanguageselected(event) {
    console.log(event);
    this.language = await event;
    this.languageStorage.saveLanguageAtStorage(this.language);//salvando en storage las language
    console.log(this.language);

    this.mostPopularMovies = await [];
    this.recentMovies = await [];
   
    this.gettingAllData(this.init, this.last, this.language);
    this.gettingAllDataPopularity(this.popularity, this.language);
   
    console.log(this.recentMovies);
    console.log(this.mostPopularMovies);
  }

  loadMoreMovies() {
    this.gettingAllData(this.init, this.last, this.language);
  }
  loadMoreBillboardMovies() {
    this.gettingAllData(this.init, this.last, this.language);
  }

  async rangeOn() {
    if (this.initState && this.lastState) {
      this.disabled = await false;
      this.recentMovies = await [];
      this.gettingAllData(this.init, this.last, this.language);
    }
  }

  popularityOrder() {
    this.popularityState = !this.popularityState;
    console.log(this.popularityState);

    if (this.popularityState) {
      this.popularity = "popularity.asc";
      this.popularityDisplay = "Ascending";
    }
    if (!this.popularityState) {
      this.popularity = "popularity.desc";
      this.popularityDisplay = "Descending";
    }
    this.mostPopularMovies = [];
    this.gettingAllDataPopularity(this.popularity, this.language);
  }

  chargeMovies() {
    this.gettingAllDataPopularity(this.popularity, this.language);
  }

  gettingAllData(init: string, last: string, language: string) {
    this.dataMoviesService
      .getMoviesByReleasedDates(init, last, language)
      .subscribe((result) => {
        const tempArray = [...this.recentMovies, ...result.results];
        console.log(result);
        this.recentMovies = tempArray;
        console.log(this.recentMovies);
      });
  }

  gettingAllDataPopularity(popularity: string, language: string) {
    this.dataMoviesService
      .getMoviesMostPopular(popularity,language)
      .subscribe((result) => {
        console.log(result);
        const tempArray = [...this.mostPopularMovies, ...result.results];
        //en este caso al exitir un pippe referente a la manejo de url de imagenes y demas
        //se hace imporisble utilizar directamente el this.mostPopularMovies.push(...result.results);
        //por lo que se hace necesario crear una variable que se encarge de manejar el proceso
        //de data del array y los que se vayan sumando por separado para depsues proceder a su suma
        this.mostPopularMovies = tempArray;
      });
  }

  cleanStorage(){
    this.languageStorage.cleanStorage()
  }

  getInitialAndLastDaysDefault(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  } //metodo para establecer valores de dia inicial y final del mes en curso  para determinar
  //el rango de busqueda de peliculas para el primer slide
}
