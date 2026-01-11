import { colors, spacing } from "@/lib/consts/theme";
import { PlaceWithRating } from "@/lib/types";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";

interface PlacesMapViewProps {
  places: PlaceWithRating[];
  onPlacePress: (place: PlaceWithRating) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  restaurant: "#FF6B6B",
  cafe: "#4ECDC4",
  coffee_shop: "#A0522D",
  other: colors.primary,
};

const DEFAULT_REGION: Region = {
  latitude: -33.8688,
  longitude: 151.2093,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export function PlacesMapView({ places, onPlacePress }: PlacesMapViewProps) {
  const placesWithCoords = useMemo(
    () => places.filter((p) => p.latitude != null && p.longitude != null),
    [places]
  );

  const initialRegion = useMemo(() => {
    if (placesWithCoords.length === 0) {
      return DEFAULT_REGION;
    }

    const lats = placesWithCoords.map((p) => p.latitude!);
    const lngs = placesWithCoords.map((p) => p.longitude!);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: Math.max((maxLat - minLat) * 1.5, 0.02),
      longitudeDelta: Math.max((maxLng - minLng) * 1.5, 0.02),
    };
  }, [placesWithCoords]);

  if (Platform.OS === "web") {
    return (
      <View style={styles.webFallback}>
        <MaterialIcons name="map" size={48} color={colors.gray500} />
        <Text style={styles.webFallbackText}>
          Map view is not available on web
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {placesWithCoords.map((place) => (
          <Marker
            key={place._id}
            coordinate={{
              latitude: place.latitude!,
              longitude: place.longitude!,
            }}
            pinColor={CATEGORY_COLORS[place.category] || colors.primary}
            onCalloutPress={() => onPlacePress(place)}
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{place.name}</Text>
                <Text style={styles.calloutSubtitle}>
                  {place.category.replace("_", " ")}
                  {place.averageRating && ` • ${place.averageRating}/10`}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {placesWithCoords.length === 0 && (
        <View style={styles.emptyOverlay}>
          <View style={styles.emptyCard}>
            <MaterialIcons
              name="location-off"
              size={32}
              color={colors.gray500}
            />
            <Text style={styles.emptyText}>
              No places with location data yet
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  callout: {
    padding: spacing.sm,
    minWidth: 150,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.gray900,
  },
  calloutSubtitle: {
    fontSize: 12,
    color: colors.gray700,
    marginTop: 2,
    textTransform: "capitalize",
  },
  emptyOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  emptyCard: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.gray300,
    alignItems: "center",
    gap: spacing.sm,
  },
  emptyText: {
    fontSize: 14,
    color: colors.gray700,
    textAlign: "center",
  },
  webFallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
    gap: spacing.md,
  },
  webFallbackText: {
    fontSize: 16,
    color: colors.gray500,
  },
});
