import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "moviesInPairsbackdropPath",
})
export class MoviesInPairsbackdropPathPipe implements PipeTransform {
  transform(arr: any[]): any[] {
    const pairsOfMovies = arr.reduce((result, value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);

    console.log(pairsOfMovies);

    return pairsOfMovies;
  }
}
