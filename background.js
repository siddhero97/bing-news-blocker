// Add click handler to extension icon
chrome.action.onClicked.addListener((tab) => {
    // Only execute on bing.com
    if (tab.url.includes('bing.com')) {
        chrome.tabs.sendMessage(tab.id, {action: 'toggle'});
    }
});