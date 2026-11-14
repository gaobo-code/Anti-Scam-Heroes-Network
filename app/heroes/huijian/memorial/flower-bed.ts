import type { FlowerId } from "./flowers";

export type FlowerBed = { offerings: FlowerId[]; nextSlot: number; revision: number };

export function offerFlower(bed: FlowerBed, flower: FlowerId): FlowerBed {
  const offerings = [...bed.offerings];
  offerings[bed.nextSlot] = flower;
  return { offerings, nextSlot: (bed.nextSlot + 1) % 24, revision: bed.revision + 1 };
}
