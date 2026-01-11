import { api } from "@/convex/_generated/api";
import { AddPlaceSheet } from "@/lib/components/add-place-sheet";
import {
  FilterButtons,
  FilterType,
} from "@/lib/components/home/filter-buttons";
import { Header } from "@/lib/components/home/header";
import { PlacesMapView } from "@/lib/components/home/map-view";
import { PlaceCard } from "@/lib/components/home/restaurant-card";
import { SearchBar } from "@/lib/components/home/search-bar";
import { PlaceActionSheet } from "@/lib/components/place-action-sheet";
import { colors, spacing } from "@/lib/consts/theme";
import { PlaceWithRating } from "@/lib/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Home() {
  const places = useQuery(api.places.list);
  const [selectedPlace, setSelectedPlace] = useState<PlaceWithRating | null>(
    null
  );
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [isAddSheetVisible, setIsAddSheetVisible] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("rated");

  const filteredPlaces = useMemo(() => {
    if (!places) return [];

    return places.filter((place) => {
      // Filter by rated/unrated
      const hasRating = place.averageRating != null;
      if (activeFilter === "rated" && !hasRating) return false;
      if (activeFilter === "unrated" && hasRating) return false;

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return place.name.toLowerCase().includes(query);
      }

      return true;
    });
  }, [places, activeFilter, searchQuery]);

  const handlePlacePress = (place: PlaceWithRating) => {
    setSelectedPlace(place);
    setIsSheetVisible(true);
  };

  const handleCloseSheet = () => {
    setIsSheetVisible(false);
  };

  const handleAddPress = () => {
    setIsAddSheetVisible(true);
  };

  const handleCloseAddSheet = () => {
    setIsAddSheetVisible(false);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Header />

        {viewMode === "list" ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
            <FilterButtons
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
            <View style={styles.placeList}>
              {places === undefined ? (
                <ActivityIndicator
                  size="large"
                  color={colors.primary}
                  style={styles.loader}
                />
              ) : filteredPlaces.length === 0 ? (
                <Text style={styles.emptyText}>
                  {places.length === 0
                    ? "No places yet. Add your first one!"
                    : "No places match your search."}
                </Text>
              ) : (
                filteredPlaces.map((place) => (
                  <PlaceCard
                    key={place._id}
                    place={place}
                    onPress={() => handlePlacePress(place)}
                  />
                ))
              )}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.mapContainer}>
            <PlacesMapView
              places={filteredPlaces}
              onPlacePress={handlePlacePress}
            />
            <View style={styles.mapOverlay}>
              <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
              <FilterButtons
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </View>
          </View>
        )}

        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
            <MaterialIcons name="add" size={24} color={colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => setViewMode(viewMode === "list" ? "map" : "list")}
          >
            <MaterialIcons
              name={viewMode === "list" ? "map" : "list"}
              size={20}
              color={colors.white}
            />
            <Text style={styles.mapButtonText}>
              {viewMode === "list" ? "Map" : "List"}
            </Text>
          </TouchableOpacity>
        </View>

        <PlaceActionSheet
          visible={isSheetVisible}
          onClose={handleCloseSheet}
          place={selectedPlace}
        />

        <AddPlaceSheet
          visible={isAddSheetVisible}
          onClose={handleCloseAddSheet}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  placeList: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
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
  mapContainer: {
    flex: 1,
  },
  mapOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  fabContainer: {
    position: "absolute",
    bottom: 96,
    right: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  addButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    height: 48,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    gap: spacing.sm,
  },
  mapButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.white,
  },
});
