import { FilterButtons } from "@/lib/components/home/filter-buttons";
import { Header } from "@/lib/components/home/header";
import { RestaurantCard } from "@/lib/components/home/restaurant-card";
import { SearchBar } from "@/lib/components/home/search-bar";
import { colors, spacing } from "@/lib/consts/theme";
import { Restaurant } from "@/lib/types";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "Burger Kingpin",
    rating: 4.8,
    location: "Downtown",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC91lbyu4kCG4140ws0DvMlB1EHr_4jy3qIriIwr-dYxzideF8A6QEJXsCrUUII6qeMjQmfQV7dya2BFyOOv4j0xeuhfC8y34HNPBobUBQzjbfzSnTrVzFg-nZ2KnXPciu6O4ew65cGmbM5r7U5UQTdhpah2ll1DigZrBwU6q9fa9nV4S0_ku_SL0DZ9C_l083yDd9WGubyPj21SravGAQj9OAeiXVIFr73Ml_m_8sUiYYU8ay9j1B0PB3kzSJEBlk1dE3rFy8PsBl2",
  },
  {
    id: "2",
    name: "Sushi Zen",
    rating: 4.9,
    location: "West Side",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCs0TSITKYyO2wKhnVyWYqJTq7Mf9vDkDsz_TO6ez2dN980YkTDG4TzysQA5vUY-KItJLCBIaQ4fNlDUHUkJwkN3OinLNwLYJbnFjcYlgMmL9MQyPRlYTtcw2h_QkVp-BoY_Vo9lEiFE5bccbr8CsOS_a-W8-JQeuSGq3eh0LJCw2hRCEMIOrSIW_WM2kLEnjKvAptQsuzSjTE-CQMeFJ7jZypk41vg99HEGs-yDVp3zYfzXkmyFskpVj5kGfn7pjFv26DhzTRDVxKa",
  },
  {
    id: "3",
    name: "Pasta House",
    rating: 4.2,
    location: "Little Italy",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAu7ggG0gbFXIFeOxGEUsADpEtkg2B2NBHQdYjbPFf88zyFKsHKHvSGB3C-6_-iLingBQcEFdWqrdPh04d2SGg13nMZGJlqdJMTuH5L6JwlBtSho28kpRKAb-YIP4NUKhneVaO0rhDioaulAlLGn_ptNpeL1Rm2KA8a9rKrHqG-YIpCrzcW2oaUB1FlUTcmTVf0tvz4FWfIeXs9fSZ17jwlTk3ry-rlbnUId-fvg4GDbf5IdsWGjXuZ5r5d3hmocP1XtU2dUQYkP8-6",
  },
  {
    id: "4",
    name: "Taco Fiesta",
    rating: 4.7,
    location: "Market District",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC10tK1GcR1B45vAl4Ioo5j2Gf6R8DkRBbvreXzYu6-XhR9nsAhucSAEH4pGG5o926qdZGw_yEADkyoW_LwyDazEIA0HiLBWwtiTfZ2oYu3ckIF3DYsCRzlUfYPdeeKzSD3P6yBoAJiN2K6w3eaP_yD0sAYrI8JPeI7yBUUIqDwirYfbUqEBprukCVdMJKBdkZ7nkHTR7Dl0Lm_r6GmLuTFbbk7DE3j3Z7Q_ILBVt124C4tf8imHGQ_uNZGGnCLBvg3bO4N_Jj9uz59",
  },
  {
    id: "5",
    name: "The Green Bowl",
    rating: 4.6,
    location: "Business Center",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyPGe50GQCegAxXGToqrzrU2JGLNVgA8B0XO3Ti-L324hnN5nhvlmkayNYlbFDX2mSKNyEpKvyvcGCqm1DKCJ4F4huvzxr660VXI9o7XZXjRoAF1SXPakOsODMohWCP2NK4_bcFx1eQ9qOGvAoWEGKjrINZbsOm7C15Zhc4G7wY2-wO0qUvY0euJpTpD_3CuRV631uHIfvH8oQzRr8sl71mxR3JFqrkuU1NXrT0v4xBeivg3Q6Hdj94na-S0YlEvIhv44J1lf_eyak",
  },
];

export default function Home() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Header />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <SearchBar />
          <FilterButtons />

          <View style={styles.restaurantList}>
            {RESTAURANTS.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.mapButton}>
          <MaterialIcons name="map" size={20} color={colors.white} />
          <Text style={styles.mapButtonText}>Map View</Text>
        </TouchableOpacity>
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
  restaurantList: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  mapButton: {
    position: "absolute",
    bottom: 96,
    right: spacing.lg,
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
