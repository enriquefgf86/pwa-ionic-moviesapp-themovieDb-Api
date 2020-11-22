import { ModalController } from "@ionic/angular";
import { multiSearch, Result } from "./../interfaces/data-interface";
import { MoviesDataService } from "./../services/movies-data.service";
import { Component, OnInit } from "@angular/core";
import { MovieDetailComponent } from "../components/movie-detail/movie-detail.component";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  textSearch: string;
  language: string = "en";
  items: string[] = ["Kill Bill", "Spiderman", "action", "Leonardo DiCaprio"];
  allSearchResults: Result[] = [];

  constructor(
    private movieDataService: MoviesDataService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {}
  onSearchChange(event) {
    console.log(event);
    this.textSearch = event.detail.value;

    this.multiSearchFunction(this.textSearch, this.language);
  }

  async movieSelected(movieId: string) {
    const modal = await this.modalController.create({
      component: MovieDetailComponent,
      componentProps: {
        movieId,
      },
    });
    console.log(movieId);

    return await modal.present();
  }

  onSugerenceSelected(event) {
    console.log(event);
  }

  // async languageChange(event) {
  //   console.log(event);
  //   await this.movieDataService.pagesRebooterMultisearch();
  //   this.allSearchResults = await [];
  //   await this.multiSearchFunction(this.textSearch, event);
  // }

  loadMoreMovies(event) {
    console.log(event);
    this.multiSearchFunction(this.textSearch, this.language, event);
  }

  private async multiSearchFunction(text: string, language: string, event?) {
    if (text.length === 0) {
      this.allSearchResults = [];
      return 
    } //esto se ahace para cuando se blanque el cuadro de busqueda no salte un erorr por undefined
    await this.movieDataService.pagesRebooterMultisearch();
    this.movieDataService
      .multiSearchQuery(text, language)
      .subscribe((result) => {
        console.log(result);
        if (event) {
          event.target.complete();
          console.log(event);
        }
        
        
        const temporaryArray = [...this.allSearchResults, ...result.results];
        this.allSearchResults = temporaryArray;
        console.log(this.allSearchResults);
      });
  }
}
