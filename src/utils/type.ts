export type TMovie = {
    Title: string;
    Year: string;
    imdbID: string;
    Type?: string;
    Poster: string;
}

export type TUser = {
    email: string;
    name: string;
}

export type TMovieData = {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Genre: string;
    Actors: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    imdbRating: string;
    imdbID: string;
    Type: string;
    Production: string;
    Response: string;
  }

export type TMoviesListData = Pick<TMovieData, "Title" | "Year" | "imdbID" | "Type" | "Poster">

export type TMovieSearchResponse = {
    Search: TMoviesListData[];
    totalResults: string;
    Response: string;
}

export type TUserData = {
    name: string;
    password: string;
    favorites: string[];
  }
  

