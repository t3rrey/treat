import { colors, spacing } from "@/lib/consts/theme";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export type FilterType = "rated" | "unrated";

interface FilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TouchableOpacity
        style={[styles.button, activeFilter === "rated" && styles.buttonActive]}
        onPress={() => onFilterChange("rated")}
      >
        <Text
          style={[
            styles.buttonText,
            activeFilter === "rated" && styles.buttonTextActive,
          ]}
        >
          Rated
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          activeFilter === "unrated" && styles.buttonActive,
        ]}
        onPress={() => onFilterChange("unrated")}
      >
        <Text
          style={[
            styles.buttonText,
            activeFilter === "unrated" && styles.buttonTextActive,
          ]}
        >
          Unrated
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  contentContainer: {
    gap: spacing.md,
  },
  button: {
    height: 36,
    paddingHorizontal: spacing.lg,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  buttonActive: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.primaryDark,
  },
  buttonTextActive: {
    color: colors.white,
  },
});
