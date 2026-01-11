#!/usr/bin/env python3
"""
Generate app icons for iOS and Android with Plus Jakarta Sans 'T' on purple background.
"""

from PIL import Image, ImageDraw, ImageFont
import os
import requests
from io import BytesIO

# Configuration
BG_COLOR = "#8A3DFF"
TEXT_COLOR = "#FFFFFF"
LETTER = "T"

# Icon sizes for iOS and Android
IOS_SIZES = {
    "icon-20.png": 20,
    "icon-20@2x.png": 40,
    "icon-20@3x.png": 60,
    "icon-29.png": 29,
    "icon-29@2x.png": 58,
    "icon-29@3x.png": 87,
    "icon-40.png": 40,
    "icon-40@2x.png": 80,
    "icon-40@3x.png": 120,
    "icon-60@2x.png": 120,
    "icon-60@3x.png": 180,
    "icon-76.png": 76,
    "icon-76@2x.png": 152,
    "icon-83.5@2x.png": 167,
    "icon-1024.png": 1024,
}

ANDROID_SIZES = {
    "mipmap-mdpi/ic_launcher.png": 48,
    "mipmap-hdpi/ic_launcher.png": 72,
    "mipmap-xhdpi/ic_launcher.png": 96,
    "mipmap-xxhdpi/ic_launcher.png": 144,
    "mipmap-xxxhdpi/ic_launcher.png": 192,
}

# Standard Expo icon sizes
STANDARD_SIZES = {
    "icon.png": 1024,
    "adaptive-icon.png": 1024,
}

def download_font():
    """Download Plus Jakarta Sans variable font."""
    # Variable font from Google Fonts GitHub repository
    font_url = "https://github.com/google/fonts/raw/refs/heads/main/ofl/plusjakartasans/PlusJakartaSans%5Bwght%5D.ttf"
    
    print("Downloading Plus Jakarta Sans font...")
    response = requests.get(font_url)
    response.raise_for_status()
    
    font_path = "/tmp/PlusJakartaSans.ttf"
    with open(font_path, "wb") as f:
        f.write(response.content)
    
    print(f"Font downloaded to {font_path}")
    return font_path

def create_icon(size, font_path, output_path):
    """Create a single icon with the specified size."""
    # Create image with purple background
    img = Image.new("RGB", (size, size), BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    # Calculate font size (approximately 60% of icon size)
    font_size = int(size * 0.6)
    font = ImageFont.truetype(font_path, font_size)
    
    # Get text bounding box
    bbox = draw.textbbox((0, 0), LETTER, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Center the text
    x = (size - text_width) // 2 - bbox[0]
    y = (size - text_height) // 2 - bbox[1]
    
    # Draw the text
    draw.text((x, y), LETTER, fill=TEXT_COLOR, font=font)
    
    # Save the image
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG")
    print(f"Created: {output_path} ({size}x{size})")

def main():
    # Download font
    try:
        font_path = download_font()
    except Exception as e:
        print(f"Error downloading font: {e}")
        print("Please install Plus Jakarta Sans manually or use a local font.")
        return
    
    base_dir = "assets/images"
    
    # Generate standard icons
    print("\nGenerating standard icons...")
    for filename, size in STANDARD_SIZES.items():
        output_path = os.path.join(base_dir, filename)
        create_icon(size, font_path, output_path)
    
    # Generate iOS icons
    print("\nGenerating iOS icons...")
    ios_dir = os.path.join(base_dir, "ios")
    for filename, size in IOS_SIZES.items():
        output_path = os.path.join(ios_dir, filename)
        create_icon(size, font_path, output_path)
    
    # Generate Android icons
    print("\nGenerating Android icons...")
    android_dir = os.path.join(base_dir, "android")
    for filename, size in ANDROID_SIZES.items():
        output_path = os.path.join(android_dir, filename)
        create_icon(size, font_path, output_path)
    
    print("\n✓ All icons generated successfully!")
    print(f"\nNext steps:")
    print(f"1. Update app.json to reference the icons")
    print(f"2. Run 'npx expo prebuild' to apply the icons")

if __name__ == "__main__":
    main()
