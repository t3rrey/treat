# App Icons

This directory contains all app icons for iOS and Android.

## Icon Design

- **Font**: Plus Jakarta Sans (Bold/700 weight)
- **Letter**: Uppercase "T"
- **Background**: #8A3DFF (purple)
- **Foreground**: White (#FFFFFF)

## Generated Icons

- `icon.png` - Main app icon (1024x1024)
- `adaptive-icon.png` - Android adaptive icon (1024x1024)
- `ios/` - All iOS icon sizes (20px to 1024px at various scales)
- `android/` - Android launcher icons (mdpi through xxxhdpi)

## Regenerating Icons

To regenerate all icons, run:

```bash
python3 generate_icons.py
```

The script will:
1. Download the Plus Jakarta Sans font
2. Generate all required icon sizes for iOS and Android
3. Place them in the correct directories

## Usage in Expo

Icons are configured in `app.json`:
- iOS uses `assets/images/ios/icon-1024.png`
- Android uses `assets/images/icon.png` and adaptive icon
- The adaptive icon uses the purple background color

After changing icons, run `npx expo prebuild` to apply them to native projects.
