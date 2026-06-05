export type Language = 'en' | 'vn';

export type Page = 'home' | 'artist' | 'about';

export interface Album {
  id: string;
  title: string;
  year: string;
  coverUrl: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  descriptionEn: string;
  descriptionVn: string;
}
