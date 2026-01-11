import { api } from "@/convex/_generated/api";
import { PlaceCard } from "@/lib/components/home/restaurant-card";
import { PlaceActionSheet } from "@/lib/components/place-action-sheet";
import { colors, spacing } from "@/lib/consts/theme";
import { PlaceWithRating } from "@/lib/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import * as Location from "expo-location";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SortMode = "rating" | "distance";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

type PlaceWithDistance = PlaceWithRating & { distance: number | null };

const isPlaceWithDistance = (
  place: PlaceWithRating | PlaceWithDistance
): place is PlaceWithDistance => "distance" in place;

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function Coffee() {
  const places = useQuery(api.places.listCoffeePlaces);
  const [selectedPlace, setSelectedPlace] = useState<PlaceWithRating | null>(
    null
  );
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("rating");
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const requestLocation = async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationError("Location permission denied");
      setIsLoadingLocation(false);
      return false;
    }

    const location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setIsLoadingLocation(false);
    return true;
  };

  const handleSortChange = async (mode: SortMode) => {
    if (mode === "distance" && !userLocation) {
      const success = await requestLocation();
      if (success) {
        setSortMode(mode);
      }
    } else {
      setSortMode(mode);
    }
  };

  useEffect(() => {
    Location.getForegroundPermissionsAsync().then(({ status }) => {
      if (status === "granted") {
        Location.getCurrentPositionAsync({}).then((location) => {
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        });
      }
    });
  }, []);

  const sortedPlaces = useMemo<Array<PlaceWithRating | PlaceWithDistance>>(() => {
    if (!places) return [];

    if (sortMode === "rating") {
      return [...places].sort((a, b) => {
        if (a.averageRating === null && b.averageRating === null) return 0;
        if (a.averageRating === null) return 1;
        if (b.averageRating === null) return -1;
        return b.averageRating - a.averageRating;
      });
    }

    if (sortMode === "distance" && userLocation) {
      return [...places]
        .map((place): PlaceWithDistance => {
          if (place.latitude != null && place.longitude != null) {
            return {
              ...place,
              distance: calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                place.latitude,
                place.longitude
              ),
            };
          }

          return {
            ...place,
            distance: null,
          };
        })
        .sort((a, b) => {
          if (a.distance === null && b.distance === null) return 0;
          if (a.distance === null) return 1;
          if (b.distance === null) return -1;
          return a.distance - b.distance;
        });
    }

    return places;
  }, [places, sortMode, userLocation]);

  const handlePlacePress = (place: PlaceWithRating) => {
    setSelectedPlace(place);
    setIsSheetVisible(true);
  };

  const handleCloseSheet = () => {
    setIsSheetVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Coffee</Text>
      </View>

      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortMode === "rating" && styles.sortButtonActive,
          ]}
          onPress={() => handleSortChange("rating")}
        >
          <MaterialIcons
            name="star"
            size={18}
            color={sortMode === "rating" ? colors.white : colors.primaryDark}
          />
          <Text
            style={[
              styles.sortButtonText,
              sortMode === "rating" && styles.sortButtonTextActive,
            ]}
          >
            Rating
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.sortButton,
            sortMode === "distance" && styles.sortButtonActive,
          ]}
          onPress={() => handleSortChange("distance")}
          disabled={isLoadingLocation}
        >
          {isLoadingLocation ? (
            <ActivityIndicator size="small" color={colors.primaryDark} />
          ) : (
            <MaterialIcons
              name="near-me"
              size={18}
              color={
                sortMode === "distance" ? colors.white : colors.primaryDark
              }
            />
          )}
          <Text
            style={[
              styles.sortButtonText,
              sortMode === "distance" && styles.sortButtonTextActive,
            ]}
          >
            Closest
          </Text>
        </TouchableOpacity>
      </View>

      {locationError && sortMode === "distance" && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{locationError}</Text>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {places === undefined ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loader}
          />
        ) : sortedPlaces.length === 0 ? (
          <Text style={styles.emptyText}>
            No coffee spots yet. Add some from the home tab!
          </Text>
        ) : (
          sortedPlaces.map((place) => {
            const distance = isPlaceWithDistance(place) ? place.distance : null;

            return (
              <View key={place._id}>
                <PlaceCard
                  place={place}
                  onPress={() => handlePlacePress(place)}
                />
                {sortMode === "distance" && typeof distance === "number" && (
                  <Text style={styles.distanceText}>
                    {distance < 1
                      ? `${Math.round(distance * 1000)}m away`
                      : `${distance.toFixed(1)}km away`}
                  </Text>
                )}
              </View>
            );
          })
        )}
      </ScrollView>

      <PlaceActionSheet
        visible={isSheetVisible}
        onClose={handleCloseSheet}
        place={selectedPlace}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.gray900,
  },
  sortContainer: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    backgroundColor: colors.white,
    gap: spacing.xs,
  },
  sortButtonActive: {
    backgroundColor: colors.primary,
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primaryDark,
  },
  sortButtonTextActive: {
    color: colors.white,
  },
  errorContainer: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: "#FEE2E2",
    borderWidth: 2,
    borderColor: "#DC2626",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  loader: {
    marginTop: spacing.xl,
  },
  emptyText: {
    textAlign: "center",
    color: colors.gray700,
    fontSize: 16,
    marginTop: spacing.xl,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.gray500,
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },
});
