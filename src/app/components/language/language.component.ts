import { DataStorageService } from "src/app/services/data-storage.service";
import { MoviesDataService } from "./../../services/movies-data.service";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-language",
  templateUrl: "./language.component.html",
  styleUrls: ["./language.component.scss"],
})
export class LanguageComponent implements OnInit {
  // iconLanguage = require("../../../assets/language.png");
  @Output() languageSelected = new EventEmitter<string>();
  language: string="en";
  languages: string[] = ["en", "es", "fr", "pt", "it", "ru", "nl", "de"];
  // state: boolean = false;

  constructor(
    private movieDataService: MoviesDataService,
    private storageService: DataStorageService
  ) {}

  async ngOnInit() {
    let language = await this.storageService.getLanguageAtStorage();

      this.language = language;
      
    
  }

  countrySelected(event) {
    console.log(event.detail.value);
    this.languageSelected.emit(event.detail.value);

    // this.movieDataService.changeLanguageEmitter(event.detail.value);
  }
}
