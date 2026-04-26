import { isValidImageUrl } from "../utils/validateImageUrl.js";

export const getImageController = async (req, res) => {
  const { url } = req.query;

  if (!url || !isValidImageUrl(url)) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).end();
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.arrayBuffer();

    res.set("Content-Type", contentType);
    res.set("Cache-Control", "public, max-age=31536000, immutable");

    return res.send(Buffer.from(buffer));
  } catch (error) {
    if (error.name === "AbortError") {
      return res.status(504).json({ message: "Image request timeout" });
    }

    console.error(error);
    return res.status(502).json({ message: "Bad Gateway" });
  }
};
