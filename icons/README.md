# Icons for Text Viewer Pro

This folder should contain the following icon files for the Chrome extension:

- `icon16.png` - 16x16 pixels (toolbar icon)
- `icon32.png` - 32x32 pixels (Windows computers often use this size)
- `icon48.png` - 48x48 pixels (extension management page)
- `icon128.png` - 128x128 pixels (Chrome Web Store and installation)

## Quick Icon Generation

If you have ImageMagick installed, you can quickly generate basic text-based icons:

```bash
# Generate a simple text-based icon
convert -size 128x128 xc:white -fill "#667eea" -pointsize 60 -gravity center -draw "text 0,0 '📖'" icon128.png
convert icon128.png -resize 48x48 icon48.png
convert icon128.png -resize 32x32 icon32.png
convert icon128.png -resize 16x16 icon16.png
```

## Alternative: Online Icon Generators

1. Visit [favicon.io](https://favicon.io) or [favicon-generator.org](https://www.favicon-generator.org)
2. Upload a 512x512 image or create one using their text tool
3. Download the generated icon pack
4. Rename the files to match the required names above

## Design Guidelines

- Use a book or text-related icon (📖, 📄, 📝)
- Keep the design simple and recognizable at small sizes
- Use the brand colors: #667eea (primary blue) and #764ba2 (secondary purple)
- Ensure good contrast for visibility

## Testing

Once you have the icons, test the extension by:

1. Loading it in Chrome's Developer Mode
2. Checking that all icons appear correctly in different contexts
3. Verifying the icons look good on both light and dark browser themes
