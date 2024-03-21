import { f as scrapeGuardahd, h as scrapeFrembed, i as scrapeMeinecloud, j as scrapeVerdahd, k as scrapeEurostreaming, l as scrapeKinokiste, m as scrapeCinehdplus, e as eventHandler, g as getRouterParam, c as convertImdbIdToTmdbId, n as getShowMediaDetails, d as getMedia } from '../../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'vm2';
import 'cheerio';
import '@movie-web/providers';

var _a;
const languages = ((_a = process.env.foreign_provider_languages) == null ? void 0 : _a.split(",")) || [];
async function scrapeCustom(imdbId, season, episode) {
  let finalstreams = [];
  if (episode == 0 || episode == "0") {
    for (const language of languages) {
      if (language.includes("it")) {
        const streams = await scrapeGuardahd(imdbId);
        if (streams != null) {
          for (let i = 0; i < streams.length; i++) {
            finalstreams.push(streams[i]);
          }
        }
      } else if (language.includes("fr")) {
        const streams = await scrapeFrembed(imdbId, 0, 0);
        if (streams != null) {
          for (let i = 0; i < streams.length; i++) {
            finalstreams.push(streams[i]);
          }
        }
      } else if (language.includes("de")) {
        const streams = await scrapeMeinecloud(imdbId);
        if (streams != null) {
          for (let i = 0; i < streams.length; i++) {
            finalstreams.push(streams[i]);
          }
        }
      } else if (language.includes("es")) {
        const streams = await scrapeVerdahd(imdbId);
        if (streams != null) {
          for (let i = 0; i < streams.length; i++) {
            finalstreams.push(streams[i]);
          }
        }
      }
    }
  } else {
    for (const language of languages) {
      if (language.includes("it")) {
        const streams = await scrapeEurostreaming(imdbId, season, episode);
        if (streams != null) {
          for (let i = 0; i < streams.length; i++) {
            finalstreams.push(streams[i]);
          }
        }
      } else if (language.includes("fr")) {
        const streams = await scrapeFrembed(imdbId, season, episode);
        if (streams != null) {
          for (let i = 0; i < streams.length; i++) {
            finalstreams.push(streams[i]);
          }
        }
      } else if (language.includes("de")) {
        const streams = await scrapeKinokiste(imdbId, season, episode);
        if (streams != null) {
          for (let i = 0; i < streams.length; i++) {
            finalstreams.push(streams[i]);
          }
        }
      } else if (language.includes("es")) {
        const streams = await scrapeCinehdplus(imdbId, season, episode);
        if (streams != null) {
          for (let i = 0; i < streams.length; i++) {
            finalstreams.push(streams[i]);
          }
        }
      }
    }
  }
  return finalstreams;
}

const scrape_english = process.env.scrape_english;
const sources = ["showbox", "vidsrc", "vidsrcto"];
const _imdb_ = eventHandler(async (event) => {
  const path = getRouterParam(event, "imdb");
  const nonEncoded = decodeURIComponent(path);
  const imdb = nonEncoded.split(".")[0];
  const mediaInfo = {
    imdbid: imdb.split(":")[0],
    season: imdb.split(":")[1],
    episode: imdb.split(":")[2]
  };
  const output = { streams: [] };
  if (scrape_english == "true") {
    const tmdb = await convertImdbIdToTmdbId(mediaInfo.imdbid);
    const media = await getShowMediaDetails(tmdb, mediaInfo.season, mediaInfo.episode);
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
  const foreignstreams = await scrapeCustom(mediaInfo.imdbid, mediaInfo.season, mediaInfo.episode);
  for (const foreignstream of foreignstreams) {
    output.streams.push(foreignstream);
  }
  return output;
});

export { _imdb_ as default };
//# sourceMappingURL=_imdb_.mjs.map
