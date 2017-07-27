chrome.browserAction.onClicked.addListener(function() {
    var id = chrome.runtime.id;
    chrome.tabs.create({
        url: 'chrome-extension://' + id + '/popup.html',
        selected: true
    })
    console.log('ddd');
})


chrome.webRequest.onAuthRequired.addListener(
    function(details, callbackFn) {
        callbackFn({
            authCredentials: {
                username: 'jerlala@163.com',
                password: 'Yy123457'
            }
        })
    }, {
        urls: ['<all_urls>']
    }, ['asyncBlocking']);

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   console.log('Turning ' + tab.url + ' red!');
//   chrome.tabs.executeScript({
//     // code: 'document.body.style.backgroundColor="red"'
//   });
// });