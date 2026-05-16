export interface DiaryItem {
  id: number;
  content: string;
  date: string;
  images?: string[];
  location?: string;
  mood?: string;
  tags?: string[];
}

export interface FriendItem {
  id: number;
  title: string;
  imgurl: string;
  desc: string;
  siteurl: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "web" | "mobile" | "desktop" | "other";
  techStack: string[];
  status: "completed" | "in-progress" | "planned";
  liveDemo?: string;
  sourceCode?: string;
  startDate: string;
  endDate?: string;
  featured?: boolean;
  tags?: string[];
  visitUrl?: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  type: "education" | "work" | "project" | "achievement";
  startDate: string;
  endDate?: string;
  location?: string;
  organization?: string;
  position?: string;
  skills?: string[];
  achievements?: string[];
  links?: { name: string; url: string; type: "website" | "certificate" | "project" | "other" }[];
  icon?: string;
  color?: string;
  featured?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "frontend" | "backend" | "database" | "tools" | "other";
  level: "beginner" | "intermediate" | "advanced" | "expert";
  experience: { years: number; months: number };
  projects?: string[];
  certifications?: string[];
  color?: string;
}

export interface Device {
  name: string;
  image: string;
  specs: string;
  description: string;
  link: string;
}

export type DeviceCategory = { [categoryName: string]: Device[] } & { 自定义?: Device[] };

export interface AnimeItem {
  title: string;
  status: "watching" | "completed" | "planned";
  rating: number;
  cover: string;
  description: string;
  episodes: string;
  year: string;
  genre: string[];
  studio: string;
  link: string;
  progress: number;
  totalEpisodes: number;
  startDate: string;
  endDate?: string;
}

export interface AlbumPhoto {
  id?: string;
  src: string;
  thumbnail?: string;
  alt?: string;
  title?: string;
  description?: string;
  tags?: string[];
  date?: string;
  location?: string;
  width?: number;
  height?: number;
  camera?: string;
  lens?: string;
  settings?: {
    aperture?: string;
    shutter?: string;
    iso?: number;
    focal?: string;
  };
}

export interface AlbumInfo {
  mode?: 'external' | string;
  hidden?: boolean;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  tags?: string[];
  layout?: 'grid' | 'masonry' | string;
  columns?: number;
  cover?: string;
  photos?: AlbumPhoto[];
}

export interface PostMeta {
  title: string;
  published: string;
  description?: string;
  tags?: string[];
  category?: string;
  author?: string;
  permalink?: string;
  pinned?: boolean;
  draft?: boolean;
  image?: string;
  updated?: string;
  pubDate?: string;
  date?: string;
  licenseName?: string;
  licenseUrl?: string;
  sourceLink?: string;
  encrypted?: boolean;
  password?: string;
  passwordHint?: string;
  comment?: boolean;
  alias?: string;
  priority?: number;
}

export interface Post {
  meta: PostMeta;
  content: string;
}