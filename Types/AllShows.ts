export interface SearchedData {
  show: AllShows;
}
export interface AllData {
  _embedded: {
    show: AllShows;
  };
}
export interface AllShows {
  id: string;
  name: string;
  image: {
    medium: string;
    original: string;
  };
}
