import assert from "node:assert/strict";
import test from "node:test";
import { offerFlower } from "./flower-bed.ts";

test("fills 24 slots, then replaces slots in order without shifting the rest", () => {
  let bed = { offerings: [], nextSlot: 0, revision: 0 };
  for (let i = 0; i < 24; i++) bed = offerFlower(bed, "chrysanthemum");
  const full = bed;
  assert.equal(bed.nextSlot, 0);
  bed = offerFlower(bed, "lily");
  assert.equal(bed.offerings.length, 24);
  assert.equal(bed.offerings[0], "lily");
  assert.equal(full.offerings[0], "chrysanthemum");
  bed = offerFlower(bed, "sunflower");
  assert.deepEqual(bed.offerings.slice(0, 3), ["lily", "sunflower", "chrysanthemum"]);
  assert.equal(bed.nextSlot, 2);
  for (let i = 2; i < 24; i++) bed = offerFlower(bed, "lily");
  assert.equal(bed.nextSlot, 0);
  bed = offerFlower(bed, "pink-rose");
  assert.equal(bed.offerings[0], "pink-rose");
  assert.equal(bed.offerings[1], "sunflower");
  assert.equal(bed.revision, 49);
});

test("continues from the saved cursor after reloading, even for the same flower", () => {
  const saved = { offerings: Array(24).fill("lily"), nextSlot: 7, revision: 0 };
  const bed = offerFlower(JSON.parse(JSON.stringify(saved)), "lily");
  assert.equal(bed.nextSlot, 8);
  assert.equal(bed.revision, 1);
  assert.equal(bed.offerings.length, 24);
});
