import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImgPipesPipe } from "./img-pipes.pipe";
import { MoviesInPairsbackdropPathPipe } from './movies-in-pairsbackdrop-path.pipe';

@NgModule({
  declarations: [ImgPipesPipe, MoviesInPairsbackdropPathPipe],
  imports: [CommonModule],
  exports: [ImgPipesPipe,MoviesInPairsbackdropPathPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PipesModule {}
