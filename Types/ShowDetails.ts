export interface ShowDetails {
  name: string;
  id: string;
  genres: string[];
  image: Image;
  language: string;
  premiered: string;
  schedule: Schedule;
  status: string;
  summary: string;
  url: string;
}
interface Image {
  medium: string;
  original: string;
}
interface Schedule {
  days: string[];
}
