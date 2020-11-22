import { ModalController } from "@ionic/angular";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Movie } from "src/app/interfaces/data-interface";
import { MovieDetailComponent } from "../movie-detail/movie-detail.component";

@Component({
  selector: "app-slide-img-popular",
  templateUrl: "./slide-img-popular.component.html",
  styleUrls: ["./slide-img-popular.component.scss"],
})
export class SlideImgPopularComponent implements OnInit {
  @Input() mostPopularMovies: Movie[] = [];
  @Output() chargeMoreMovies = new EventEmitter();

  constructor(private modalController: ModalController) {}

  sliderOptions = {
    slidesPerView: 3.1,
    freeMode: true,

    breakpoints: {
      190: {
        slidesPerView: 1.3,
      },
      290: {
        slidesPerView: 2.3,
      },

      510: {
        slidesPerView: 5.3,
      },
      810: {
        slidesPerView: 7.3,
      },
      1350: {
        slidesPerView: 10.3,
      },
      1550: {
        slidesPerView: 14.3,
      },
    },
  };
  ngOnInit() {}

  chargeMore() {
    this.chargeMoreMovies.emit();
  }

  async showMovieDetail(movieId: string) {
    const modal = await this.modalController.create({
      component: MovieDetailComponent,
      componentProps: {
        movieId,
      },
    });
    console.log(movieId);
    return await modal.present();
  }
}
