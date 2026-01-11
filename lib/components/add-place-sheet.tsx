import { api } from "@/convex/_generated/api";
import { colors, spacing } from "@/lib/consts/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheet } from "./bottom-sheet";

type Category = "restaurant" | "cafe" | "coffee_shop" | "other";

interface AddPlaceSheetProps {
  visible: boolean;
  onClose: () => void;
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "restaurant", label: "Restaurant" },
  { value: "cafe", label: "Cafe" },
  { value: "coffee_shop", label: "Coffee" },
  { value: "other", label: "Other" },
];

export const AddPlaceSheet: React.FC<AddPlaceSheetProps> = ({
  visible,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState<Category>("restaurant");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createPlace = useMutation(api.places.create);

  const handleOpenMaps = () => {
    const query = encodeURIComponent(address || name);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(url);
  };

  const handleAddPlace = async () => {
    if (!name.trim() || !address.trim()) return;

    setIsSubmitting(true);
    try {
      await createPlace({
        name: name.trim(),
        address: address.trim(),
        category,
      });
      // Reset form and close
      setName("");
      setAddress("");
      setCategory("restaurant");
      onClose();
    } catch (error) {
      console.error("Failed to create place:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setName("");
    setAddress("");
    setCategory("restaurant");
    onClose();
  };

  const isValid = name.trim() && address.trim();

  return (
    <BottomSheet visible={visible} onClose={handleClose}>
      <View style={styles.content}>
        <Text style={styles.title}>Add Place</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="store"
              size={20}
              color={colors.gray500}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Restaurant name"
              placeholderTextColor={colors.gray400}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="location-on"
              size={20}
              color={colors.gray500}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="123 Main Street, Sydney"
              placeholderTextColor={colors.gray400}
            />
          </View>
          {address.trim() && (
            <TouchableOpacity style={styles.mapsLink} onPress={handleOpenMaps}>
              <MaterialIcons
                name="open-in-new"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.mapsLinkText}>Open in Google Maps</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                style={[
                  styles.categoryButton,
                  category === cat.value && styles.categoryButtonActive,
                ]}
                onPress={() => setCategory(cat.value)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === cat.value && styles.categoryTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.addButton, !isValid && styles.addButtonDisabled]}
          onPress={handleAddPlace}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <>
              <MaterialIcons name="add" size={24} color={colors.white} />
              <Text style={styles.addButtonText}>Add Place</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.gray900,
    marginBottom: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.gray700,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primaryDark,
  },
  inputIcon: {
    paddingLeft: spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray900,
  },
  mapsLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  mapsLinkText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },
  categoryContainer: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray300,
  },
  categoryButtonActive: {
    backgroundColor: colors.purpleLight,
    borderColor: colors.primaryDark,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.gray500,
  },
  categoryTextActive: {
    color: colors.primaryDark,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  addButtonDisabled: {
    backgroundColor: colors.gray300,
    borderColor: colors.gray500,
    shadowColor: colors.gray500,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.white,
  },
});
