// Function to toggle between show and hide classes
function toggleView() {
    // Find all elements with the specific class pattern
    const elements = document.querySelectorAll('[class*="module"][class*="five_col"][class*="feed_bg"]');
    
    elements.forEach(element => {
        const classList = element.className.split(' ');
        // Create new class list
        const newClassList = classList.map(className => {
            if (className === 'hide') return 'show';
            if (className === 'show') return 'hide';
            return className;
        });
        // Apply new classes
        element.className = newClassList.join(' ');
    });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggle') {
        toggleView();
        sendResponse({status: 'completed'});
    }
});

// Optional: Add keyboard shortcut (Ctrl+Shift+T)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        toggleView();
    }
});