import type { Doc, Id } from "./_generated/dataModel";

// Document types
export type User = Doc<"users">;
export type Place = Doc<"places">;
export type Review = Doc<"reviews">;

// ID types
export type UserId = Id<"users">;
export type PlaceId = Id<"places">;
export type ReviewId = Id<"reviews">;

// Category and status enums
export type PlaceCategory = Place["category"];
export type PlaceStatus = Place["status"];

// Input types for creating/updating (without system fields)
export type CreateUserInput = {
  name: string;
  email?: string;
};

export type CreatePlaceInput = {
  name: string;
  googlePlaceId?: string;
  address: string;
  imageUrl?: string;
  category: PlaceCategory;
  status: PlaceStatus;
  priority?: number;
  addedBy: UserId;
  addedAt: number;
};

export type CreateReviewInput = {
  placeId: PlaceId;
  userId: UserId;
  tasteRating: number;
  priceRating: number;
  serviceRating: number;
  coffeeRating?: number;
  foodsEaten?: string[];
  notes?: string;
  visitedAt: number;
};

// Aggregated types for UI
export type PlaceWithReviews = Place & {
  reviews: Review[];
  averageRatings: {
    taste: number;
    price: number;
    service: number;
    coffee?: number;
    overall: number;
  };
};

export type ReviewWithUser = Review & {
  user: User;
};

export type PlaceWithDetails = Place & {
  reviews: ReviewWithUser[];
  addedByUser: User;
  averageRatings: {
    taste: number;
    price: number;
    service: number;
    coffee?: number;
    overall: number;
  };
};
