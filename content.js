// Text Format Viewer - Content Script
// Simple modal with textarea input and format button

(() => {
  "use strict";

  let modal = null;
  let escapeListener = null;

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showFormattedText") {
      showInputModal();
      sendResponse({ success: true });
    }
    return true;
  });

  function showInputModal() {
    // Remove existing modal if any
    closeModal();

    // Create modal container
    modal = document.createElement("div");
    modal.className = "text-format-modal";
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Create modal content
    const modalContent = document.createElement("div");
    modalContent.className = "text-format-content";

    // Create header
    const header = document.createElement("div");
    header.className = "text-format-header";

    const title = document.createElement("h3");
    title.textContent = "📖 Text Formatter";

    const closeBtn = document.createElement("button");
    closeBtn.className = "text-format-close";
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", closeModal);

    header.appendChild(title);
    header.appendChild(closeBtn);

    // Create input area
    const inputArea = document.createElement("div");
    inputArea.className = "text-format-input-area";

    const inputLabel = document.createElement("label");
    inputLabel.textContent = "Paste your text here (formats automatically):";
    inputLabel.style.cssText =
      "display: block; margin-bottom: 8px; font-weight: 500; color: #333;";

    const inputTextarea = document.createElement("textarea");
    inputTextarea.className = "text-format-input";
    inputTextarea.placeholder = "Paste text with \\n characters here...";
    inputTextarea.rows = 6;

    inputArea.appendChild(inputLabel);
    inputArea.appendChild(inputTextarea);

    // Create output area (always visible)
    const outputArea = document.createElement("div");
    outputArea.className = "text-format-output-area";

    const outputLabel = document.createElement("label");
    outputLabel.textContent = "Formatted text:";
    outputLabel.style.cssText =
      "display: block; margin-bottom: 8px; font-weight: 500; color: #333;";

    const outputDiv = document.createElement("div");
    outputDiv.className = "text-format-display";
    outputDiv.textContent = "Formatted text will appear here...";
    outputDiv.style.color = "#999";
    outputDiv.style.fontStyle = "italic";

    outputArea.appendChild(outputLabel);
    outputArea.appendChild(outputDiv);

    // Real-time formatting function
    function updateFormatting() {
      const inputText = inputTextarea.value;
      if (inputText.trim()) {
        const formattedText = formatText(inputText);
        outputDiv.textContent = formattedText;
        outputDiv.style.color = "#333";
        outputDiv.style.fontStyle = "normal";

        // Show copy buttons
        copyOriginalBtn.style.display = "inline-block";
        copyFormattedBtn.style.display = "inline-block";
        clearBtn.style.display = "inline-block";
      } else {
        outputDiv.textContent = "Formatted text will appear here...";
        outputDiv.style.color = "#999";
        outputDiv.style.fontStyle = "italic";

        // Hide copy buttons
        copyOriginalBtn.style.display = "none";
        copyFormattedBtn.style.display = "none";
        clearBtn.style.display = "none";
      }
    }

    // Add event listeners for real-time formatting
    inputTextarea.addEventListener("input", updateFormatting);
    inputTextarea.addEventListener("paste", (e) => {
      // Prevent default paste behavior to strip formatting
      e.preventDefault();

      // Get plain text from clipboard
      const paste = (e.clipboardData || window.clipboardData).getData(
        "text/plain"
      );

      // Insert plain text at cursor position
      const start = inputTextarea.selectionStart;
      const end = inputTextarea.selectionEnd;
      const currentValue = inputTextarea.value;

      inputTextarea.value =
        currentValue.substring(0, start) + paste + currentValue.substring(end);

      // Set cursor position after pasted text
      const newCursorPos = start + paste.length;
      inputTextarea.setSelectionRange(newCursorPos, newCursorPos);

      // Trigger formatting update
      updateFormatting();
    });

    // Create actions
    const actions = document.createElement("div");
    actions.className = "text-format-actions";

    const copyOriginalBtn = document.createElement("button");
    copyOriginalBtn.className = "text-format-btn copy-btn";
    copyOriginalBtn.textContent = "📋 Copy Original";
    copyOriginalBtn.style.display = "none";
    copyOriginalBtn.addEventListener("click", () =>
      copyText(inputTextarea.value)
    );

    const copyFormattedBtn = document.createElement("button");
    copyFormattedBtn.className = "text-format-btn copy-btn";
    copyFormattedBtn.textContent = "📋 Copy Formatted";
    copyFormattedBtn.style.display = "none";
    copyFormattedBtn.addEventListener("click", () =>
      copyText(formatTextForCopy(inputTextarea.value))
    );

    const clearBtn = document.createElement("button");
    clearBtn.className = "text-format-btn secondary-btn";
    clearBtn.textContent = "🗑️ Clear";
    clearBtn.style.display = "none";
    clearBtn.addEventListener("click", () => {
      inputTextarea.value = "";
      updateFormatting();
      inputTextarea.focus();
    });

    const closeActionBtn = document.createElement("button");
    closeActionBtn.className = "text-format-btn close-btn";
    closeActionBtn.textContent = "Close";
    closeActionBtn.addEventListener("click", closeModal);

    actions.appendChild(copyOriginalBtn);
    actions.appendChild(copyFormattedBtn);
    actions.appendChild(clearBtn);
    actions.appendChild(closeActionBtn);

    // Assemble modal
    modalContent.appendChild(header);
    modalContent.appendChild(inputArea);
    modalContent.appendChild(outputArea);
    modalContent.appendChild(actions);
    modal.appendChild(modalContent);

    // Add to page
    document.body.appendChild(modal);

    // Focus the textarea and try to auto-paste from clipboard
    setTimeout(async () => {
      inputTextarea.focus();

      // Try to read from clipboard and auto-paste (plain text only)
      try {
        const clipboardText = await navigator.clipboard.readText();
        if (clipboardText && clipboardText.trim()) {
          // Ensure we only get plain text, no formatting
          inputTextarea.value = clipboardText;
          updateFormatting();
          showNotification("Auto-pasted from clipboard!");
        }
      } catch (error) {
        // Clipboard access might be denied or not available
        console.log("Could not access clipboard:", error);
      }
    }, 100);

    // Add escape key listener
    escapeListener = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", escapeListener);
  }

  function formatText(text) {
    return (
      text
        // Remove leading and trailing quotes
        .replace(/^"/, "")
        .replace(/"$/, "")
        // Convert \n to actual line breaks
        .replace(/\\n/g, "\n")
        // Convert \t to actual tabs
        .replace(/\\t/g, "\t")
        // Convert \r to nothing (remove carriage returns)
        .replace(/\\r/g, "")
        // Convert \" to actual quotes
        .replace(/\\"/g, '"')
        // Convert \' to actual quotes
        .replace(/\\'/g, "'")
        // Convert \\ to single backslash
        .replace(/\\\\/g, "\\")
        // Escape any HTML to prevent XSS (but preserve our newlines)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/&/g, "&amp;")
    );
  }

  function formatTextForCopy(text) {
    return (
      text
        // Remove leading and trailing quotes
        .replace(/^"/, "")
        .replace(/"$/, "")
        // Convert \n to actual line breaks
        .replace(/\\n/g, "\n")
        // Convert \t to actual tabs
        .replace(/\\t/g, "\t")
        // Convert \r to nothing (remove carriage returns)
        .replace(/\\r/g, "")
        // Convert \" to actual quotes
        .replace(/\\"/g, '"')
        // Convert \' to actual quotes
        .replace(/\\'/g, "'")
        // Convert \\ to single backslash
        .replace(/\\\\/g, "\\")
    );
  }

  function closeModal() {
    if (modal && modal.parentNode) {
      modal.remove();
      modal = null;
    }
    if (escapeListener) {
      document.removeEventListener("keydown", escapeListener);
      escapeListener = null;
    }
  }

  function copyText(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showNotification("Text copied to clipboard!");
      })
      .catch(() => {
        showNotification("Failed to copy text", "error");
      });
  }

  function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `text-format-notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add("show"), 10);

    // Remove after 2 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  console.log(
    "🚀 Text Format Viewer loaded - click extension to open formatter!"
  );
})();
