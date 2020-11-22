import { SlideFavouriteSelectedComponent } from './slide-favourite-selected/slide-favourite-selected.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { LanguageComponent } from './language/language.component';
import { SlideImgPopularComponent } from "./slide-img-popular/slide-img-popular.component";
import { PipesModule } from "./../pipes/pipes.module";
import { IonicModule } from "@ionic/angular";
import { SlideImgsFirstComponent } from "./slide-imgs-first/slide-imgs-first.component";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SlideImgSecondMovieComponent } from "./slide-img-second-movie/slide-img-second-movie.component";

@NgModule({
  declarations: [
    SlideImgsFirstComponent,
    SlideImgSecondMovieComponent,
    SlideImgPopularComponent,
    LanguageComponent,MovieDetailComponent,SlideFavouriteSelectedComponent,
  ],
  imports: [CommonModule, IonicModule, PipesModule],
  exports: [
    SlideImgsFirstComponent,
    SlideImgSecondMovieComponent,
    SlideImgPopularComponent,
    LanguageComponent,MovieDetailComponent,SlideFavouriteSelectedComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
