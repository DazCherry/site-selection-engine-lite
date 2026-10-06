import {build} from 'esbuild';
await build({stdin:{contents:"export {PMTiles, ResolvedValueCache} from 'pmtiles'; export {VectorTile} from '@mapbox/vector-tile'; export {PbfReader} from 'pbf';",resolveDir:process.cwd()},bundle:true,format:'esm',platform:'browser',target:'es2022',minify:true,legalComments:'inline',outfile:'dist/vendor/tiles.mjs'});
