// Get the toggle element
const newsElement = document.getElementById('newsToggle');
const newsText = document.querySelector('.status');

// Load saved state
chrome.storage.local.get(['viewState'], function(result) {
    newsElement.checked = result.viewState || false;
    updateStatusText(result.viewState);
});

// Update status text based on toggle state
function updateStatusText(isChecked) {
    newsText.textContent = isChecked ? 'Show News': 'Hide News';
}

// Add change listener to toggle
newsElement.addEventListener('change', function(e) {
    const isChecked = e.target.checked;
    
    // Save state
    chrome.storage.local.set({ viewState: isChecked });
    updateStatusText(isChecked);
    
    // Send message to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'toggle',
            state: isChecked
        });
    });
});