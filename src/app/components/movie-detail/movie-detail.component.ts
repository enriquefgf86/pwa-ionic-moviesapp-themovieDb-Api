import {
  Cast,
  ImagesMovieSelected,
  MovieSelectedCredit,
  MovieSelectedDetails,
} from "./../../interfaces/data-interface";
import { MoviesDataService } from "./../../services/movies-data.service";
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { DataStorageService } from "src/app/services/data-storage.service";
import { Observable } from "rxjs";

import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player/ngx";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-movie-detail",
  templateUrl: "./movie-detail.component.html",
  styleUrls: ["./movie-detail.component.scss"],
})
export class MovieDetailComponent implements OnInit {
  @Input() movieId;
  @ViewChild("videoPlayer") videoplayer: ElementRef;

  language: string;
  movieDetail: MovieSelectedDetails = {};
  MovieImg: ImagesMovieSelected = {};
  castOfArtist: Cast[] = [];
  readMoreOverview = 100;
  existence: boolean = false;
  x: string;
  movieCredits: MovieSelectedCredit;

  slideOptions = {
    initialSlide: 0,
    speed: 400,
    autoplay: true,
  };

  sliderOptions = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: -20,
  };

  constructor(
    private movieSelectedDetails: MoviesDataService,
    private modalController: ModalController,
    private favoriteStorage: DataStorageService,
    private movieService: MoviesDataService,
    private youtube: YoutubeVideoPlayer,
    private domSanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    let existence = await this.favoriteStorage.movieExistInStorage(
      this.movieId
    );

    this.existence = await existence;

    let language = await this.favoriteStorage.getLanguageAtStorage();

    this.language = await language;

    this.movieSelectedDetails
      .getMovieSelecteddetails(this.movieId, this.language)
      .subscribe(async (result) => {
        this.movieDetail = result;

        this.movieService
          .getTrailersYoutube(result.original_title)
          .subscribe((result1) => {
            console.log(result1);

            this.x = `https://www.youtube.com/embed/${result1.items[0].id.videoId}`;
            this.youtube.openVideo(`${result1.items[0].id.videoId}`);

            console.log(this.x);
          });
      });

    this.movieSelectedDetails
      .getMovieSelectedImages(this.movieId, this.language)
      .subscribe((result) => {
        // console.log(result);
        this.MovieImg = result;
      });

    this.movieSelectedDetails
      .getMovieSelectedCredits(this.movieId)
      .subscribe((result) => {
        // console.log(result);
        this.castOfArtist = result.cast;
      });
  }
  videoPlays(event) {
    console.log(event);
  }
  toggleVideo() {
    this.videoplayer.nativeElement.contentWindow.postMessage(
      '{"event":"command","func":"' + "playVideo" + '","args":""}',
      "*"
    );
  }

  async onSave() {
    await this.favoriteStorage.saveAtStorage(this.movieDetail);
    let existence = await this.favoriteStorage.existence;
    this.existence = await existence;
    console.log("movie in storage" + this.existence);
    setTimeout(() => {
      //  this.modalDismiss();
    }, 1000);
  }

  // slidesDidLoad(slides: IonSlides) {
  //   slides.startAutoplay();
  // }

  modalDismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  sanitizeVideo(video: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(video);
  }
  //in order to play videos en ionic es necesario pasarlo por el dom sanitizer primero
  //importado de angualr platform-vbrowser}
}
