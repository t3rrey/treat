import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getById = query({
  args: { id: v.id("places") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const places = await ctx.db.query("places").collect();

    const placesWithRatings = await Promise.all(
      places.map(async (place) => {
        const reviews = await ctx.db
          .query("reviews")
          .withIndex("by_place", (q) => q.eq("placeId", place._id))
          .collect();

        let averageRating: number | null = null;
        if (reviews.length > 0) {
          const totalRatings = reviews.reduce((sum, review) => {
            const ratings = [
              review.tasteRating,
              review.priceRating,
              review.serviceRating,
            ];
            if (review.coffeeRating !== undefined) {
              ratings.push(review.coffeeRating);
            }
            return (
              sum + ratings.reduce((a, b) => a + b, 0) / ratings.length
            );
          }, 0);
          averageRating =
            Math.round((totalRatings / reviews.length) * 10) / 10;
        }

        return {
          ...place,
          averageRating,
        };
      })
    );

    return placesWithRatings;
  },
});

export const listCoffeePlaces = query({
  args: {},
  handler: async (ctx) => {
    const places = await ctx.db
      .query("places")
      .withIndex("by_category")
      .collect();

    // Filter for coffee-related categories
    const coffeePlaces = places.filter(
      (place) =>
        place.category === "cafe" ||
        place.category === "coffee_shop" ||
        place.category === "both"
    );

    const placesWithRatings = await Promise.all(
      coffeePlaces.map(async (place) => {
        const reviews = await ctx.db
          .query("reviews")
          .withIndex("by_place", (q) => q.eq("placeId", place._id))
          .collect();

        let averageRating: number | null = null;
        if (reviews.length > 0) {
          const totalRatings = reviews.reduce((sum, review) => {
            const ratings = [
              review.tasteRating,
              review.priceRating,
              review.serviceRating,
            ];
            if (review.coffeeRating !== undefined) {
              ratings.push(review.coffeeRating);
            }
            return (
              sum + ratings.reduce((a, b) => a + b, 0) / ratings.length
            );
          }, 0);
          averageRating =
            Math.round((totalRatings / reviews.length) * 10) / 10;
        }

        return {
          ...place,
          averageRating,
        };
      })
    );

    // Sort by highest rating (null ratings at the end)
    return placesWithRatings.sort((a, b) => {
      if (a.averageRating === null && b.averageRating === null) return 0;
      if (a.averageRating === null) return 1;
      if (b.averageRating === null) return -1;
      return b.averageRating - a.averageRating;
    });
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    address: v.string(),
    category: v.union(
      v.literal("restaurant"),
      v.literal("cafe"),
      v.literal("coffee_shop"),
      v.literal("both"),
      v.literal("other")
    ),
    googlePlaceId: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get or create a default user for now
    let user = await ctx.db.query("users").first();
    if (!user) {
      const userId = await ctx.db.insert("users", {
        firstName: "Default",
        lastName: "User",
        email: "user@example.com",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      user = await ctx.db.get(userId);
    }

    const now = Date.now();
    const placeId = await ctx.db.insert("places", {
      name: args.name,
      address: args.address,
      category: args.category,
      googlePlaceId: args.googlePlaceId,
      imageUrl: args.imageUrl,
      status: "want_to_try",
      addedBy: user!._id,
      addedAt: now,
      updatedAt: now,
    });

    return placeId;
  },
});
