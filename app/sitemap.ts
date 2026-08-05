import type { MetadataRoute } from "next";

const baseUrl = "https://figueredo.adv.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/sobre", "/areas-de-atuacao"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
