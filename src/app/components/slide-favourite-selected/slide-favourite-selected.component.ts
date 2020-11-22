import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Movie } from "src/app/interfaces/data-interface";
import { MovieDetailComponent } from "../movie-detail/movie-detail.component";

@Component({
  selector: "app-slide-favourite-selected",
  templateUrl: "./slide-favourite-selected.component.html",
  styleUrls: ["./slide-favourite-selected.component.scss"],
})
export class SlideFavouriteSelectedComponent implements OnInit {
  @Input() recentMoviesPosters: Movie[] = [];
  @Output() loadMoreBillboard = new EventEmitter();
  sliderOptions = {
    slidesPerView: 3.5,
    freeMode: true,
    spaceBetween: -30,
  };
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log(this.recentMoviesPosters);
  }

  async showMovieDetail(movieId: string) {
    const modal = await this.modalController.create({
      component: MovieDetailComponent,
      componentProps: {
        movieId,
      },
    });
    return await modal.present();
  }

  loadMoreMovies() {
    this.loadMoreBillboard.emit();
  }
}
