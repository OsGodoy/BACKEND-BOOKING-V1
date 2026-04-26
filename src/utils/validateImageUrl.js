export const isValidImageUrl = (url) => {
  const allowedHosts = [
    "covers.openlibrary.org",
    "images.cdn1.buscalibre.com",
    "images-na.ssl-images-amazon.com",
    "m.media-amazon.com",
  ];

  try {
    const parsed = new URL(url);
    return allowedHosts.includes(parsed.hostname);
  } catch {
    return false;
  }
};
