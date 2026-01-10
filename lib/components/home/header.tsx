import { colors, spacing } from "@/lib/consts/theme";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Header: React.FC = () => {
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="arrow-back" size={24} color={colors.gray900} />
        </TouchableOpacity>

        <Text style={styles.title}>Top Eats</Text>

        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="tune" size={24} color={colors.gray900} />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryDark,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.gray900,
    flex: 1,
    textAlign: "center",
  },
});
