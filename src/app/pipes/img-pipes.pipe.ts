import { Pipe, PipeTransform } from "@angular/core";
const url: string = "https://image.tmdb.org/t/p/";
@Pipe({
  name: "imgPipes",
})
export class ImgPipesPipe implements PipeTransform {
  transform(img: string, size: string = "w500"): string {
    if (!img) {
      return "../../assets/default-movie.jpg";
    }
    if (img == null) {
      return "../../assets/default-movie.jpg";
    }

    const imgUrl = `${url}${size}/${img}`;
    // console.log("img url", imgUrl);
    return imgUrl;
  }
}
// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
