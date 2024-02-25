import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { PNG } from "pngjs";
import extract from "../index.mjs";
import convertSpriteDecodedBufferToPng from "../src/convertSpriteDecodedBufferToPng.mjs";
import decodePNG8 from "../src/decodePNG8.mjs";
import decodeRLE8 from "../src/decodeRLE8.mjs";
import decodePCX from "../src/decodePCX.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buffer = readFileSync(`${__dirname}/files/vivi-v1.sff`);
const metadata = extract(buffer, { sprites: false, palettes: false });
console.log(metadata);

const data = extract(buffer, {
  sprites: true,
  palettes: true,
  //decodeSpriteBuffer: true,
  spriteGroups: [10017],
});
const sprite = data.sprites[7];
console.log(sprite);
//process.exit(0);
/*
for (const palette of data.palettes) {
  console.log(palette);
}
process.exit(0);
//*/
/*
const palette = data.palettes[sprite.paletteIndex];
for (let i = 0; i < palette.buffer.length; i += 4) {
  console.log(`Index ${i/4} R ${palette.buffer[i]}, G ${palette.buffer[i+1]}, B ${palette.buffer[i+2]}, A ${palette.buffer[i+3]}`);
}
*/
//console.log(palette);
const decoded = decodePCX(
  sprite.buffer,
  sprite.width,
  sprite.height,
  sprite.palette,
  //palette.buffer,
);
const png = convertSpriteDecodedBufferToPng(
  decoded,
  sprite.width,
  sprite.height,
);
writeFileSync("test.png", png);
