# 📖 Text Format Viewer - Chrome Extension

A simple Chrome extension that formats text with proper line breaks and escape sequences. Click the extension icon to open a formatter where you can paste text and see it properly formatted in real-time!

## 🚀 What It Does

- **Click the extension icon** to open the formatter modal
- **Paste text manually** or **auto-paste from clipboard**
- **See real-time formatting** as you type or paste
- **Converts `\n` to line breaks** and handles other escape sequences
- **Copy original or formatted text** to clipboard
- **Clean, modern interface** with instant feedback

## ✨ Features

- 🚀 **One-Click Access**: Click extension icon to instantly open formatter
- 📋 **Auto-Paste**: Automatically tries to paste from clipboard when opened
- ⚡ **Real-Time Formatting**: See formatted text update as you type
- 🔄 **Escape Sequence Handling**: Converts `\n`, `\t`, `\"`, `\'`, `\\` to proper formatting
- 📋 **Copy Options**: Copy either original or formatted version
- 🗑️ **Clear Function**: Quick clear button to reset input
- ⌨️ **Keyboard Support**: Press ESC to close the modal
- 📱 **Responsive Design**: Works on all screen sizes
- 🎨 **Beautiful UI**: Modern gradient design with smooth animations

## 📁 Project Structure

```
formatter/
├── manifest.json          # Extension configuration
├── background.js          # Service worker - handles extension icon clicks
├── content.js            # Main functionality - formatter modal & text processing
├── content.css           # Modal styling
├── generate-icons.sh     # Icon generation script
├── icons/               # Extension icons (need to be added)
│   └── README.md        # Icon setup instructions
└── README.md            # This file
```

## 🛠️ Setup & Installation

### 1. Add Icons (Required)

Before loading the extension, you need to add icon files to the `icons/` folder:

- `icon16.png` (16x16px)
- `icon32.png` (32x32px)
- `icon48.png` (48x48px)
- `icon128.png` (128x128px)

**Quick icon setup:**

- Install ImageMagick: `brew install imagemagick` (macOS)
- Run: `./generate-icons.sh`
- Or use online tools like [favicon.io](https://favicon.io)

### 2. Load in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select this project folder
5. Click the extension icon to start formatting text!

## 🎯 How to Use

1. **Click the extension icon** in your Chrome toolbar
2. **Paste text** into the input area (or let it auto-paste from clipboard)
3. **Watch the text format in real-time** as you type or paste
4. **View properly formatted text** with line breaks in the output area
5. **Copy original or formatted version** using the copy buttons
6. **Use the clear button** to reset, or **press ESC** to close the modal

### Example Use Cases

Perfect for viewing:

- **Code snippets** with `\n` line breaks
- **JSON responses** with escape sequences
- **Log files** or **data exports**
- **Any text** that needs proper formatting

## 🔧 Technical Details

### Escape Sequences Handled

- `\n` → Line breaks
- `\t` → Tab spaces (4 spaces)
- `\"` → Double quotes
- `\'` → Single quotes
- `\\` → Single backslash
- `\r` → Removed (carriage returns)

### Permissions Used

- `clipboardRead`: Allows the extension to auto-paste from clipboard when you open the formatter

## 🎨 Customization

The extension uses a modern gradient color scheme:

- Primary: `#667eea` (blue)
- Secondary: `#764ba2` (purple)

Colors can be customized in `content.css`.

## 📝 Notes

- **Minimal permissions** - only needs clipboard access for auto-paste feature
- **Works on most websites** (some restrictions on special pages like `chrome://`)
- **Lightweight** - minimal resource usage
- **Privacy-focused** - no data collection or external requests
- **Click-to-activate** - only runs when you click the extension icon

## 🔍 Troubleshooting

**Extension won't load?**

- Make sure all icon files are present in `icons/` folder
- Check that `manifest.json` is valid
- Ensure you're in Developer Mode

**Modal not appearing when clicking extension icon?**

- Try clicking the extension icon again
- Check browser console for any errors
- Some sites may have strict CSP policies that block content scripts

**Icons not showing?**

- Run `./generate-icons.sh` if you have ImageMagick
- Or manually add PNG files to the `icons/` folder

## 🚀 Ready to Use

Once icons are added, this extension is ready to:

- Load in Chrome Developer Mode
- Package as a `.crx` file
- Submit to Chrome Web Store (with proper store assets)

---

_A focused tool for formatting text with proper line breaks and escape sequences. Simple, clean, effective._
