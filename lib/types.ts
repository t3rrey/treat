import type { Doc } from "@/convex/_generated/dataModel";

export type Place = Doc<"places">;

export interface PlaceWithRating extends Place {
  averageRating: number | null;
}
