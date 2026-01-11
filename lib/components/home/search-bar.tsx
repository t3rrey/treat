import { colors, spacing } from "@/lib/consts/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <MaterialIcons
          name="search"
          size={24}
          color={colors.primary}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search restaurants..."
          placeholderTextColor={colors.gray500}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    height: 48,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  icon: {
    paddingLeft: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray900,
    paddingHorizontal: spacing.md,
  },
});
