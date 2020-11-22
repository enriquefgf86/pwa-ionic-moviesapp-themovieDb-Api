import { Movie } from "./../../interfaces/data-interface";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { MovieDetailComponent } from "../movie-detail/movie-detail.component";

@Component({
  selector: "app-slide-imgs-first",
  templateUrl: "./slide-imgs-first.component.html",
  styleUrls: ["./slide-imgs-first.component.scss"],
})
export class SlideImgsFirstComponent implements OnInit {
  @Input() recentMovies: Movie[] = [];
  @Output() moreMovies = new EventEmitter();
  @ViewChild(IonSlides) slides:any;//refieriendoonos al slide para poder establecer los breakpoints

  sliderOptions = {
    slidesPerView: 1.3,
    freeMode: true,
    breakpoints:{
      300:{
        slidesPerView: 1.3,
      },
      405:{
        slidesPerView: 1.9,
      }
      ,
      510:{
        slidesPerView: 2.3,
      }
      ,
      810:{
        slidesPerView: 3.3,
      }
      ,
      1350:{
        slidesPerView: 6.3,
      }
      
      
    }
    
    // spaceBetween:-420
  };
  constructor(private modalController: ModalController) {}

  ngOnInit() {
  }


  // swiperConditions(){
  //   var swiper = new Swiper('.swiper-container', {
  //     // Default parameters
  //     slidesPerView: 1,
  //     spaceBetween: 10,
  //     // Responsive breakpoints
  //     breakpoints: {
  //       // when window width is >= 320px
  //       320: {
  //         slidesPerView: 2,
  //         spaceBetween: 20
  //       },
  //       // when window width is >= 480px
  //       480: {
  //         slidesPerView: 3,
  //         spaceBetween: 30
  //       },
  //       // when window width is >= 640px
  //       640: {
  //         slidesPerView: 4,
  //         spaceBetween: 40
  //       }
  //     }
  //   })
  // }

  async showMovieDetail(movieId: string) {
    const modal = await this.modalController.create({
      component: MovieDetailComponent,
      componentProps: {
        movieId,
      },
    });
    return await modal.present();
  }

  loadMoreMovies(event) {
    console.log(event);
    return this.moreMovies.emit()
  }
}
