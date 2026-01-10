import { colors, spacing } from "@/lib/consts/theme";
import { Restaurant } from "@/lib/types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: restaurant.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <View style={styles.ratingBadge}>
            <MaterialIcons name="star" size={14} color={colors.primaryDark} />
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
          </View>
        </View>

        <Text style={styles.location} numberOfLines={1}>
          {restaurant.location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    marginBottom: spacing.md,
    gap: spacing.lg,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.xs,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.gray900,
    flex: 1,
    marginRight: spacing.sm,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.purpleLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.primaryDark,
  },
  location: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray700,
  },
});
