// Strapi v5 — flat response format (no more data.attributes wrapper)
export interface StrapiResponse<T> {
  data: StrapiData<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: StrapiData<T>;
  meta: object;
}

export type StrapiData<T> = T & {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  } | null;
  alternativeText: string | null;
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface Work {
  title: string;
  description: string;
  date: string;
  category: 'Escultura' | 'Pintura' | 'Fotografía' | 'Abstracto' | 'Realismo' | 'Cerámica';
  image: StrapiImage | null;
  other_images: StrapiImage[] | null;
  slug: string;
  featured: boolean;
  materials: string[];
}

export interface Home {
  hero_label: string;
  hero_title: string;
  hero_subtitle: string;
  hero_btn: string;
  hero_image: StrapiImage | null;
  featured_label: string;
  featured_title: string;
  featured_btn: string;
  artist_label: string;
  artist_title: string;
  artist_bio: string;
  artist_image: StrapiImage | null;
  artist_menu_label: string;
}

export interface Testimonial {
  username: string;
  text: string;
}
