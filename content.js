// Function to set view state
function setViewState(showNews) {
    console.log(`setViewState called with showGrid: ${showNews}`);

    const elements = document.querySelectorAll('[class*="module"][class*="five_col"][class*="feed_bg"]');
    console.log(`Found ${elements.length} elements to update`);
    
    elements.forEach((element, index) => {
        console.log(`Processing element ${index + 1}`);
        const classList = element.className.split(' ');
        console.log(`Original class list: ${classList.join(', ')}`);

        const newClassList = classList.map(className => {
            if (className === 'hide' || className === 'show') {
                const newClass = showNews ? 'show' : 'hide';
                console.log(`Changing class from ${className} to ${newClass}`);
                return newClass;
            }
            return className;
        });

        element.className = newClassList.join(' ');
        console.log(`Updated class list: ${element.className}`);
    });
    
    console.log(`View updated: ${showNews ? 'Grid' : 'List'} view`);
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received:', request);
    if (request.action === 'toggle') {
        console.log(`Toggling view state to: ${request.state}`);
        setViewState(request.state);
        console.log('Sending response');
        sendResponse({status: 'completed'});
    }
});

// Load initial state
console.log('Loading initial state');
chrome.storage.local.get(['viewState'], function(result) {
    console.log('Initial viewState:', result.viewState);
    setViewState(result.viewState || false);
});

console.log('Content script loaded and initialized');