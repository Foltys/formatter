#!/bin/bash

# Generate basic icons for Text Viewer Pro Chrome Extension
# Requires ImageMagick to be installed

echo "🎨 Generating icons for Text Format Viewer..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Please install it first:"
    echo "   macOS: brew install imagemagick"
    echo "   Ubuntu: sudo apt-get install imagemagick"
    echo "   Windows: Download from https://imagemagick.org"
    exit 1
fi

# Create icons directory if it doesn't exist
mkdir -p icons

# Generate 128x128 round base icon with "Tf" text - simplified approach
echo "🔵 Creating 128x128 round base icon..."

# Create the base square icon first
convert -size 128x128 \
    gradient:"#667eea-#764ba2" \
    -fill white \
    -pointsize 72 \
    -gravity center \
    -font "Arial-Bold" \
    -annotate +0+0 'Tf' \
    /tmp/temp_icon.png

# Make it round by clipping to a circle
convert /tmp/temp_icon.png \
    \( +clone -threshold 101% -fill white -draw "circle 64,64 64,0" \) \
    -alpha off -compose copy_opacity -composite \
    icons/icon128.png

# Clean up temp file
rm -f /tmp/temp_icon.png

# Generate smaller sizes from the base icon
echo "📏 Generating smaller round sizes..."
convert icons/icon128.png -resize 48x48 icons/icon48.png
convert icons/icon128.png -resize 32x32 icons/icon32.png  
convert icons/icon128.png -resize 16x16 icons/icon16.png

echo "✅ Round icons generated successfully!"
echo "📁 Check the 'icons' folder for the generated files:"
ls -la icons/*.png

echo ""
echo "🚀 Your Chrome extension is now ready to be packaged!"
echo "💡 To load in Chrome:"
echo "   1. Open Chrome and go to chrome://extensions/"
echo "   2. Enable 'Developer mode' (top right toggle)"
echo "   3. Click 'Load unpacked' and select this folder" 