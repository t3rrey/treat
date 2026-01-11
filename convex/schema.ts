import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table (you and your girlfriend)
  users: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  // Places table - restaurants, cafes, coffee shops
  places: defineTable({
    name: v.string(),
    googlePlaceId: v.optional(v.string()),
    address: v.string(),
    imageUrl: v.optional(v.string()),
    category: v.union(
      v.literal("restaurant"),
      v.literal("cafe"),
      v.literal("coffee_shop"),
      v.literal("both"),
      v.literal("other")
    ),
    status: v.union(v.literal("want_to_try"), v.literal("visited")),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    priority: v.optional(v.number()),
    addedBy: v.id("users"),
    addedAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_category", ["category"]),

  // Reviews table - individual ratings per visit
  reviews: defineTable({
    placeId: v.id("places"),
    userId: v.id("users"),

    // Ratings: 1.0-10.0 scale
    tasteRating: v.number(),
    priceRating: v.number(),
    serviceRating: v.number(),
    coffeeRating: v.optional(v.number()),

    foodsEaten: v.optional(v.array(v.string())),
    notes: v.optional(v.string()),
    visitedAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_place", ["placeId"])
    .index("by_user", ["userId"]),
});
