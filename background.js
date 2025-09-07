// Background script for Text Format Viewer
// Handles extension icon clicks and communicates with content script

chrome.action.onClicked.addListener(async (tab) => {
  try {
    // Send message to content script to show the modal
    await chrome.tabs.sendMessage(tab.id, { action: "showFormattedText" });
  } catch (error) {
    console.log("Error sending message to content script:", error);

    // If content script isn't ready, try to inject it
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });

      // Try sending message again after a short delay
      setTimeout(async () => {
        try {
          await chrome.tabs.sendMessage(tab.id, {
            action: "showFormattedText",
          });
        } catch (retryError) {
          console.log("Retry failed:", retryError);
        }
      }, 100);
    } catch (injectError) {
      console.log("Failed to inject content script:", injectError);
    }
  }
});

console.log("Text Format Viewer background script loaded");
