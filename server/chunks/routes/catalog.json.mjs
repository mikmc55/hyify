import { e as eventHandler } from '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'vm2';
import 'cheerio';
import '@movie-web/providers';

const manifest = [
  {
    "manifest": {
      "id": "com.stremify",
      "version": "2.6.0",
      "catalogs": [],
      "resources": [
        "stream"
      ],
      "types": [
        "movie",
        "series"
      ],
      "name": "Stremify",
      "description": "A plugin that allows you to directly stream content from multiple different sources.",
      "idPrefixes": [
        "tt"
      ],
      "logo": "https://i.ibb.co/GWB1pwy/160156210.png"
    },
    "transportName": "http",
    "transportUrl": "http://localhost:3000/manifest.json"
  }
];
const catalog_json = eventHandler((event) => {
  return manifest;
});

export { catalog_json as default };
//# sourceMappingURL=catalog.json.mjs.map
