import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { MovieSelectedDetails } from "../interfaces/data-interface";
import { ToastController } from "@ionic/angular";
import { stringify } from "querystring";
@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  allMoviesfavorites: MovieSelectedDetails[] = [];
  existence: boolean = false;
  language: string = "en";
  init:string;
  last:string;

  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.loadfavoritesinStorage();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      position: "middle",
      color: "dark",
      message,
      duration: 3000,
    });
    toast.present();
  }

  settingInitialDate(date:string){
    this.storage.set("init", date);
  }

  settingLastDate(date:string){
    this.storage.set("last", date);
  }

  cleanStorage(){
    return this.storage.clear()
  }

  getInitDateAtStorage() {
    return this.storage.get("init").then((result) => {
      if (result == null) {
        result = [];
      }
      this.init = result;
      console.log(this.init);
      return this.init
    });
  }

  getLastDateAtStorage() {
    return this.storage.get("last").then((result) => {
      if (result == null) {
        result = [];
      }
      this.last = result;
      console.log(this.last);
      return this.last
    });
  }
  saveLanguageAtStorage(language: string) {
    this.storage.set("language", language);
  }

  getLanguageAtStorage() {
    return this.storage.get("language").then((result) => {
      if (result == null) {
        result = [];
      }
      this.language = result;
      console.log(this.language);
      return this.language
    });
  }

  saveAtStorage(movieToSave: MovieSelectedDetails) {
    let movieInStorageExists: boolean = false;
    let message: string = "";

    for (const movie of this.allMoviesfavorites) {
      if (movie.id == movieToSave.id) {
        movieInStorageExists = true;

        break;
      }
    }

    if (movieInStorageExists) {
      this.existence = true;
      console.log(this.existence);
      this.allMoviesfavorites = this.allMoviesfavorites.filter(
        (movie) => movie.id !== movieToSave.id
      );
      message = "Movie Removed From Storage";
      this.presentToast(message);
    } else {
      this.existence = false;
      console.log(this.existence);

      this.allMoviesfavorites.push(movieToSave);
      message = "Movie Added to Storage";
      this.presentToast(message);
    }
    this.storage.set("favorites", this.allMoviesfavorites);
  }

  async loadfavoritesinStorage() {
    return this.storage.get("favorites").then((result) => {
      if (result == null) {
        result = [];
      }
      this.allMoviesfavorites = result;
      console.log(this.allMoviesfavorites);

      return this.allMoviesfavorites;
    });
  }

  async movieExistInStorage(id) {
    await this.loadfavoritesinStorage();

    const exist = await this.allMoviesfavorites.find((movie) => movie.id == id);
    if (exist) {
      return true;
    } else return false;
  }
}
