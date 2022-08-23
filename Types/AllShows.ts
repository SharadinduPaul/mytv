export interface AllShows {
  _embedded: {
    show: {
      id: string;
      name: string;
      image: {
        medium: string;
        original: string;
      };
    };
  };
}
