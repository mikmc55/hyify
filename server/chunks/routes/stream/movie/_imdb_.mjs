import { e as eventHandler, g as getRouterParam, c as convertImdbIdToTmdbId, a as getMovieMediaDetails, d as getMedia } from '../../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'vm2';
import 'cheerio';
import '@movie-web/providers';

const scrape_english = process.env.scrape_english;
const sources = ["showbox", "vidsrc", "vidsrcto"];
const _imdb_ = eventHandler(async (event) => {
  const output = {
    streams: []
  };
  const path = getRouterParam(event, "imdb");
  const imdb = path.split(".")[0];
  if (scrape_english == "true") {
    const tmdb = await convertImdbIdToTmdbId(imdb);
    const media = await getMovieMediaDetails(tmdb);
    for (const source of sources) {
      const stream = await getMedia(media, source);
      for (const embed in stream) {
        const streams = stream[embed].stream;
        for (const streamItem of streams) {
          if (streamItem.type === "file") {
            for (const qualityKey in streamItem.qualities) {
              const quality = streamItem.qualities[qualityKey];
              output.streams.push({
                name: "Stremify",
                type: "url",
                url: quality.url,
                title: `${source} - ${qualityKey}p (${embed})`
              });
            }
          } else if (streamItem.type == "hls") {
            output.streams.push({
              name: "Stremify",
              type: "url",
              url: streamItem.playlist,
              title: `${source} - auto (${embed})`
            });
          }
        }
      }
    }
  }
  return output;
});

export { _imdb_ as default };
//# sourceMappingURL=_imdb_.mjs.map
