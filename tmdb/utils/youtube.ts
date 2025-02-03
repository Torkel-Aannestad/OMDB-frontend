function video(key: string, autoplay: boolean = false) {
  return `https://www.youtube.com/embed/${key}?rel=0&showinfo=0&autoplay=${
    autoplay ? 1 : 0
  }`;
}

function thumbnail(key: string) {
  return `https://img.youtube.com/vi/${key}/hqdefault.jpg`;
}

export const yt = {
  video,
  thumbnail,
};
