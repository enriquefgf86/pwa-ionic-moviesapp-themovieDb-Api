import { ModalController } from "@ionic/angular";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Movie } from "src/app/interfaces/data-interface";
import { MovieDetailComponent } from "../movie-detail/movie-detail.component";

@Component({
  selector: "app-slide-img-second-movie",
  templateUrl: "./slide-img-second-movie.component.html",
  styleUrls: ["./slide-img-second-movie.component.scss"],
})
export class SlideImgSecondMovieComponent implements OnInit {
  @Input() recentMoviesPosters: Movie[] = [];
  @Output() loadMoreBillboard = new EventEmitter();
  sliderOptions = {
    // slidesPerView: 3.5,
    freeMode: true,
    
    breakpoints:{
      200:{
        spaceBetween: -5,
        slidesPerView: 2.3,
      },
      350:{
        spaceBetween: -5,
        slidesPerView:2.7,
      },
      460:{
        slidesPerView: 4.3,
      }
      ,
      510:{
        slidesPerView: 4.6,
      }
      ,
      710:{
        slidesPerView: 5.6,
      }
      ,
      810:{
        slidesPerView: 6.3,
      }
      ,
      1350:{
        slidesPerView: 8.3,
      }
      ,
      1550:{
        slidesPerView:11.3,
      }
      
    }
  };
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    // console.log(this.recentMoviesPosters);
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
