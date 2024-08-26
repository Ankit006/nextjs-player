export interface ISong {
  audio: File;
  name: string;
  artist: string;
  poster: File | undefined;
  duration: string;
}
