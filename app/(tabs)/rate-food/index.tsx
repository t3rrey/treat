import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { colors } from "@/lib/consts/theme";
import { Host, Slider } from "@expo/ui/swift-ui";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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

type Category = "food" | "coffee" | "both";
type Step = "details" | "taste" | "price" | "service" | "coffee";

export default function App() {
  const { placeId } = useLocalSearchParams<{ placeId?: string }>();
  const router = useRouter();
  const place = useQuery(
    api.places.getById,
    placeId ? { id: placeId as Id<"places"> } : "skip"
  );
  const createReview = useMutation(api.reviews.create);

  const [itemName, setItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("food");
  const [currentStep, setCurrentStep] = useState<Step>("details");
  const [tasteRating, setTasteRating] = useState(8);
  const [priceRating, setPriceRating] = useState(8);
  const [serviceRating, setServiceRating] = useState(8);
  const [coffeeRating, setCoffeeRating] = useState(8);
  const [comment, setComment] = useState("");

  // Pre-fill category based on place data
  useEffect(() => {
    if (place) {
      if (place.category === "restaurant") {
        setSelectedCategory("food");
      } else if (
        place.category === "cafe" ||
        place.category === "coffee_shop"
      ) {
        setSelectedCategory("coffee");
      } else if (place.category === "both") {
        setSelectedCategory("both");
      }
    }
  }, [place]);

  const getStepNumber = () => {
    switch (currentStep) {
      case "details": return 1;
      case "taste": return 2;
      case "price": return 3;
      case "service": return 4;
      case "coffee": return 5;
    }
  };

  const handleContinue = () => {
    switch (currentStep) {
      case "details":
        setCurrentStep("taste");
        break;
      case "taste":
        setCurrentStep("price");
        break;
      case "price":
        setCurrentStep("service");
        break;
      case "service":
        if (selectedCategory === "coffee" || selectedCategory === "both") {
          setCurrentStep("coffee");
        } else {
          handleSubmit();
        }
        break;
      case "coffee":
        handleSubmit();
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case "taste":
        setCurrentStep("details");
        break;
      case "price":
        setCurrentStep("taste");
        break;
      case "service":
        setCurrentStep("price");
        break;
      case "coffee":
        setCurrentStep("service");
        break;
    }
  };

  const handleSubmit = async () => {
    if (!placeId) {
      console.error("No placeId provided");
      return;
    }

    try {
      await createReview({
        placeId: placeId as Id<"places">,
        tasteRating,
        priceRating,
        serviceRating,
        coffeeRating: selectedCategory !== "food" ? coffeeRating : undefined,
        foodsEaten: itemName ? [itemName] : undefined,
        notes: comment || undefined,
      });
      router.back();
    } catch (error) {
      console.error("Failed to create review:", error);
    }
  };

  const getButtonText = () => {
    if (currentStep === "service" && selectedCategory === "food") return "SUBMIT";
    if (currentStep === "coffee") return "SUBMIT";
    return "CONTINUE";
  };

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
        {/* Back Button */}
        {currentStep !== "details" && (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={colors.gray900} />
            <Text style={styles.backBtnText}>BACK</Text>
          </TouchableOpacity>
        )}

        {/* STEP 1: Details */}
        {currentStep === "details" && (
          <>
            {/* Title Section */}
            <View style={styles.moduleTile}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>STEP {getStepNumber()}</Text>
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>RATE WHAT{"\n"}YOU ATE</Text>
                <View style={styles.divider} />
                {place ? (
                  <Text style={styles.placeName}>{place.name.toUpperCase()}</Text>
                ) : (
                  <Text style={styles.subtitle}>ENTER DETAILS BELOW TO PROCEED</Text>
                )}
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
                    size={48}
                    color={
                      selectedCategory === "food" ? colors.white : colors.gray700
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
                    size={48}
                    color={
                      selectedCategory === "coffee" ? colors.white : colors.gray700
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

                <TouchableOpacity
                  style={[
                    styles.selectorBtn,
                    selectedCategory === "both" && styles.selectorBtnSelected,
                  ]}
                  onPress={() => setSelectedCategory("both")}
                  activeOpacity={0.7}
                >
                  <View style={styles.bothIconContainer}>
                    <Ionicons
                      name="restaurant"
                      size={32}
                      color={
                        selectedCategory === "both" ? colors.white : colors.gray700
                      }
                    />
                    <Ionicons
                      name="cafe"
                      size={32}
                      color={
                        selectedCategory === "both" ? colors.white : colors.gray700
                      }
                    />
                  </View>
                  <Text
                    style={[
                      styles.selectorBtnText,
                      selectedCategory === "both" && styles.selectorBtnTextSelected,
                    ]}
                  >
                    BOTH
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        {/* STEP 2: Taste Rating */}
        {currentStep === "taste" && (
          <View style={styles.moduleTile}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>STEP {getStepNumber()}</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>HOW WAS{"\n"}THE TASTE?</Text>
              <View style={styles.divider} />
              <Text style={styles.subtitle}>RATE FROM 1 TO 10</Text>
            </View>
            <View style={styles.ratingDisplay}>
              <Text style={styles.ratingBig}>{tasteRating}</Text>
              <Text style={styles.ratingSmall}>/10</Text>
            </View>
            <View style={styles.sliderContainer}>
              <Host style={styles.sliderHost}>
                <Slider
                  value={(tasteRating - 1) / 9}
                  onValueChange={(value) => {
                    const newRating = Math.round(value * 9) + 1;
                    setTasteRating(newRating);
                  }}
                />
              </Host>
              <View style={styles.sliderLabels}>
                {["AWFUL", "MEH", "OKAY", "GOOD", "AMAZING"].map((label) => (
                  <Text key={label} style={styles.sliderLabelText}>
                    {label}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* STEP 3: Price Rating */}
        {currentStep === "price" && (
          <View style={styles.moduleTile}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>STEP {getStepNumber()}</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>VALUE FOR{"\n"}MONEY?</Text>
              <View style={styles.divider} />
              <Text style={styles.subtitle}>RATE FROM 1 TO 10</Text>
            </View>
            <View style={styles.ratingDisplay}>
              <Text style={styles.ratingBig}>{priceRating}</Text>
              <Text style={styles.ratingSmall}>/10</Text>
            </View>
            <View style={styles.sliderContainer}>
              <Host style={styles.sliderHost}>
                <Slider
                  value={(priceRating - 1) / 9}
                  onValueChange={(value) => {
                    const newRating = Math.round(value * 9) + 1;
                    setPriceRating(newRating);
                  }}
                />
              </Host>
              <View style={styles.sliderLabels}>
                {["RIP OFF", "PRICEY", "FAIR", "GOOD", "STEAL"].map((label) => (
                  <Text key={label} style={styles.sliderLabelText}>
                    {label}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* STEP 4: Service Rating */}
        {currentStep === "service" && (
          <View style={styles.moduleTile}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>STEP {getStepNumber()}</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>HOW WAS{"\n"}THE SERVICE?</Text>
              <View style={styles.divider} />
              <Text style={styles.subtitle}>RATE FROM 1 TO 10</Text>
            </View>
            <View style={styles.ratingDisplay}>
              <Text style={styles.ratingBig}>{serviceRating}</Text>
              <Text style={styles.ratingSmall}>/10</Text>
            </View>
            <View style={styles.sliderContainer}>
              <Host style={styles.sliderHost}>
                <Slider
                  value={(serviceRating - 1) / 9}
                  onValueChange={(value) => {
                    const newRating = Math.round(value * 9) + 1;
                    setServiceRating(newRating);
                  }}
                />
              </Host>
              <View style={styles.sliderLabels}>
                {["RUDE", "SLOW", "OKAY", "GOOD", "AMAZING"].map((label) => (
                  <Text key={label} style={styles.sliderLabelText}>
                    {label}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* STEP 5: Coffee Rating (conditional) */}
        {currentStep === "coffee" && (
          <View style={styles.moduleTile}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>STEP {getStepNumber()}</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>HOW WAS{"\n"}THE COFFEE?</Text>
              <View style={styles.divider} />
              <Text style={styles.subtitle}>RATE FROM 1 TO 10</Text>
            </View>
            <View style={styles.ratingDisplay}>
              <Text style={styles.ratingBig}>{coffeeRating}</Text>
              <Text style={styles.ratingSmall}>/10</Text>
            </View>
            <View style={styles.sliderContainer}>
              <Host style={styles.sliderHost}>
                <Slider
                  value={(coffeeRating - 1) / 9}
                  onValueChange={(value) => {
                    const newRating = Math.round(value * 9) + 1;
                    setCoffeeRating(newRating);
                  }}
                />
              </Host>
              <View style={styles.sliderLabels}>
                {["AWFUL", "WEAK", "OKAY", "GOOD", "PERFECT"].map((label) => (
                  <Text key={label} style={styles.sliderLabelText}>
                    {label}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Continue/Submit Button */}
        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.8}
          onPress={handleContinue}
        >
          <Text style={styles.actionBtnText}>{getButtonText()}</Text>
          <Ionicons
            name={getButtonText() === "SUBMIT" ? "checkmark" : "arrow-forward"}
            size={28}
            color={colors.white}
          />
        </TouchableOpacity>
      </ScrollView>
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
  placeName: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: 1,
    textAlign: "center",
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
  bothIconContainer: {
    flexDirection: "row",
    gap: 8,
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
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.gray900,
    letterSpacing: 1,
  },
  ratingDisplay: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginVertical: 16,
  },
  ratingBig: {
    fontSize: 96,
    fontWeight: "900",
    color: colors.gray900,
    lineHeight: 96,
    letterSpacing: -4,
  },
  ratingSmall: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.gray500,
    marginBottom: 12,
    marginLeft: 4,
  },
  sliderContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  sliderHost: {
    minHeight: 44,
    width: "100%",
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  sliderLabelText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.gray500,
    letterSpacing: 0.5,
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
