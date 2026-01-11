import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    placeId: v.id("places"),
    tasteRating: v.number(),
    priceRating: v.number(),
    serviceRating: v.number(),
    coffeeRating: v.optional(v.number()),
    foodsEaten: v.optional(v.array(v.string())),
    notes: v.optional(v.string()),
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
    const reviewId = await ctx.db.insert("reviews", {
      placeId: args.placeId,
      userId: user!._id,
      tasteRating: args.tasteRating,
      priceRating: args.priceRating,
      serviceRating: args.serviceRating,
      coffeeRating: args.coffeeRating,
      foodsEaten: args.foodsEaten,
      notes: args.notes,
      visitedAt: now,
      updatedAt: now,
    });

    // Update the place status to "visited"
    await ctx.db.patch(args.placeId, {
      status: "visited",
      updatedAt: now,
    });

    return reviewId;
  },
});
