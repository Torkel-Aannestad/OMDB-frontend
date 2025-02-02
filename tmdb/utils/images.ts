const imageSizes = {
  backdrop: {
    w300: "w300",
    w780: "w780",
    w1280: "w1280",
    original: "original",
  },
  logo: {
    w45: "w45",
    w92: "w92",
    w154: "w154",
    w185: "w185",
    w300: "w300",
    w500: "w500",
    original: "original",
  },
  poster: {
    w92: "w92",
    w154: "w154",
    w185: "w185",
    w342: "w342",
    w500: "w500",
    w780: "w780",
    original: "original",
  },
  profile: {
    w45: "w45",
    w185: "w185",
    h632: "h632",
    original: "original",
  },
  still: {
    w92: "w92",
    w185: "w185",
    w300: "w300",
    original: "original",
  },
  original: "original",
};

export type ImageSize = (typeof imageSizes)[keyof typeof imageSizes];
export type PosterSize = keyof typeof imageSizes.poster;
export type BackdropSize = keyof typeof imageSizes.backdrop;
export type ProfileSize = keyof typeof imageSizes.profile;
export type LogoSize = keyof typeof imageSizes.logo;

function url(path: string, type: ImageSize = "original") {
  if (!path) {
    console.error("Invalid image path provided.");
    return "/placeholder.png";
  }
  return `https://image.tmdb.org/t/p/${type}/${path}`;
}

function poster(path: string, size: PosterSize = "original") {
  return url(path, imageSizes.poster[size]);
}

function backdrop(path: string, size: BackdropSize = "original") {
  return url(path, imageSizes.backdrop[size]);
}

function profile(path: string, size: ProfileSize = "original") {
  return url(path, imageSizes.profile[size]);
}

function logo(path: string, size: LogoSize = "original") {
  return url(path, imageSizes.logo[size]);
}

/**
 * Object containing functions to generate URLs for different types of TMDB images.
 */
export const tmdbImage = {
  url,
  poster,
  backdrop,
  profile,
  logo,
};
