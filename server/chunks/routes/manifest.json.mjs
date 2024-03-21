import { e as eventHandler, s as setHeader } from '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'vm2';
import 'cheerio';
import '@movie-web/providers';

const manifest = {
  "id": "com.stremify",
  "version": "2.7.0",
  "catalogs": [],
  "resources": [
    "stream"
  ],
  "types": [
    "movie",
    "series"
  ],
  "name": "Stremify",
  "description": "A multi-server streaming addon.",
  "idPrefixes": [
    "tt"
  ],
  "logo": "https://i.ibb.co/GWB1pwy/160156210.png"
};
const manifest_json = eventHandler((event) => {
  setHeader(event, "Access-Control-Allow-Origin", "*");
  setHeader(event, "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  setHeader(event, "Access-Control-Allow-Headers", "Content-Type, Authorization");
  return manifest;
});

export { manifest_json as default };
//# sourceMappingURL=manifest.json.mjs.map
