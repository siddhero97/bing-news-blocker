// Add click handler to extension icon
console.log("Background script loading");
chrome.action.onClicked.addListener((tab) => {
    console.log("Extension icon clicked");
    
    // Only execute on bing.com
    if (tab.url.includes('bing.com')) {
        console.log("URL includes bing.com, sending toggle message");
        chrome.tabs.sendMessage(tab.id, {action: 'toggle'}, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError);
            } else {
                console.log("Message sent successfully");
            }
        });
    } else {
        console.log("URL does not include bing.com, no action taken");
    }
});

console.log("Background script loaded");

// Listen for any runtime errors
chrome.runtime.onError.addListener((error) => {
    console.error("Runtime error:", error);
});

// Listen for connection from content script
chrome.runtime.onConnect.addListener((port) => {
    console.log("Connection established with content script");
    
    port.onDisconnect.addListener(() => {
        console.log("Connection with content script closed");
    });
});

// Log when the extension is installed or updated
chrome.runtime.onInstalled.addListener((details) => {
    console.log("Extension installed or updated", details);
});