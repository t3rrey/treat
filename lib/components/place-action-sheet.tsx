import { colors, spacing } from "@/lib/consts/theme";
import { PlaceWithRating } from "@/lib/types";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheet } from "./bottom-sheet";

interface PlaceActionSheetProps {
  visible: boolean;
  onClose: () => void;
  place: PlaceWithRating | null;
}

export const PlaceActionSheet: React.FC<PlaceActionSheetProps> = ({
  visible,
  onClose,
  place,
}) => {
  if (!place) return null;

  const isRated = place.averageRating !== null;

  const handleOpen = () => {
    // Open in Google Maps
    const query = encodeURIComponent(place.address || place.name);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(url);
    onClose();
  };

  const handleRate = () => {
    // Navigate to rate flow with place info
    router.push({
      pathname: "/(tabs)/rate-food",
      params: { placeId: place._id },
    });
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={styles.content}>
        <Text style={styles.placeName} numberOfLines={1}>
          {place.name}
        </Text>
        <Text style={styles.placeAddress} numberOfLines={1}>
          {place.address}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleOpen}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="open-in-new"
                size={24}
                color={colors.white}
              />
            </View>
            <Text style={styles.actionText}>Open</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleRate}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={isRated ? "refresh" : "star"}
                size={24}
                color={colors.white}
              />
            </View>
            <Text style={styles.actionText}>
              {isRated ? "Re-rate" : "Rate"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
  },
  placeName: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  placeAddress: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray500,
    marginBottom: spacing.xl,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    gap: spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.primaryDark,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.gray900,
  },
});
