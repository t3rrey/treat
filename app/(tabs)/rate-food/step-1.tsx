import { colors } from "@/lib/consts/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Category = "food" | "coffee";

export default function App() {
  const [itemName, setItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("food");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      <ScrollView
        style={styles.main}
        contentContainerStyle={styles.mainContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.moduleTile}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>STEP 1</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>RATE WHAT{"\n"}YOU ATE</Text>
            <View style={styles.divider} />
            <Text style={styles.subtitle}>ENTER DETAILS BELOW TO PROCEED</Text>
          </View>
        </View>

        {/* Item Name Input */}
        <View style={styles.moduleTile}>
          <Text style={styles.label}>ITEM NAME</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="E.G. CHEESEBURGER"
              placeholderTextColor={colors.gray500}
              value={itemName}
              onChangeText={setItemName}
              autoCapitalize="characters"
            />
            <Ionicons
              name="create-outline"
              size={24}
              color={colors.gray700}
              style={styles.inputIcon}
            />
          </View>
        </View>

        {/* Category Selection */}
        <View style={styles.moduleTile}>
          <Text style={styles.sectionTitle}>SELECT CATEGORY</Text>
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={[
                styles.selectorBtn,
                selectedCategory === "food" && styles.selectorBtnSelected,
              ]}
              onPress={() => setSelectedCategory("food")}
              activeOpacity={0.7}
            >
              <Ionicons
                name="restaurant"
                size={60}
                color={
                  selectedCategory === "food"
                    ? colors.white
                    : colors.gray700
                }
              />
              <Text
                style={[
                  styles.selectorBtnText,
                  selectedCategory === "food" && styles.selectorBtnTextSelected,
                ]}
              >
                FOOD
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.selectorBtn,
                selectedCategory === "coffee" && styles.selectorBtnSelected,
              ]}
              onPress={() => setSelectedCategory("coffee")}
              activeOpacity={0.7}
            >
              <Ionicons
                name="cafe"
                size={60}
                color={
                  selectedCategory === "coffee"
                    ? colors.white
                    : colors.gray700
                }
              />
              <Text
                style={[
                  styles.selectorBtnText,
                  selectedCategory === "coffee" &&
                    styles.selectorBtnTextSelected,
                ]}
              >
                COFFEE
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
          <Text style={styles.actionBtnText}>CONTINUE</Text>
          <Ionicons name="arrow-forward" size={28} color={colors.white} />
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.nav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={28} color={colors.gray500} />
          <Text style={styles.navText}>HOME</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cafe-outline" size={28} color={colors.gray500} />
          <Text style={styles.navText}>COFFEE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <View style={styles.activeIndicator} />
          <Ionicons name="create" size={28} color={colors.gray900} />
          <Text style={styles.navTextActive}>RATE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bar-chart-outline" size={28} color={colors.gray500} />
          <Text style={styles.navText}>STATS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray300,
  },
  main: {
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 100,
  },
  moduleTile: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 3,
    borderColor: colors.gray900,
    padding: 24,
    marginBottom: 32,
    shadowColor: colors.gray900,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  stepBadge: {
    position: "absolute",
    top: -16,
    left: -12,
    backgroundColor: colors.gray900,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 3,
    borderColor: colors.white,
    transform: [{ rotate: "-2deg" }],
    shadowColor: colors.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stepBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },
  titleContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: colors.gray900,
    textAlign: "center",
    lineHeight: 38,
    marginBottom: 8,
  },
  divider: {
    height: 4,
    width: 80,
    backgroundColor: colors.gray900,
    marginVertical: 12,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.gray500,
    letterSpacing: 1.5,
  },
  label: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.gray900,
    marginBottom: 16,
    letterSpacing: 1,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    width: "100%",
    backgroundColor: colors.surfaceLight,
    borderWidth: 3,
    borderColor: colors.gray900,
    padding: 16,
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
    shadowColor: colors.gray900,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  inputIcon: {
    position: "absolute",
    right: 16,
    top: "50%",
    marginTop: -12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.gray900,
    textAlign: "center",
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.gray300,
    marginBottom: 20,
    letterSpacing: 1,
  },
  categoryContainer: {
    gap: 20,
  },
  selectorBtn: {
    paddingVertical: 32,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderWidth: 3,
    borderColor: colors.gray900,
    backgroundColor: colors.surfaceLight,
    shadowColor: colors.gray900,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  selectorBtnSelected: {
    backgroundColor: colors.gray900,
    shadowOffset: { width: 0, height: 0 },
  },
  selectorBtnText: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.gray900,
    letterSpacing: -0.5,
  },
  selectorBtnTextSelected: {
    color: colors.white,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: colors.primary,
    padding: 20,
    borderWidth: 3,
    borderColor: colors.primaryDark,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    marginTop: 16,
  },
  actionBtnText: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.white,
    letterSpacing: 2,
  },
  nav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: colors.surfaceLight,
    borderTopWidth: 3,
    borderTopColor: colors.gray900,
    height: 80,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    position: "relative",
  },
  navItemActive: {
    backgroundColor: `${colors.gray900}0D`,
  },
  activeIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colors.gray900,
  },
  navText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.gray500,
    letterSpacing: 1.5,
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: "900",
    color: colors.gray900,
    letterSpacing: 1.5,
  },
});
