// 新窗口开启
chrome.browserAction.onClicked.addListener(function() {
    var id = chrome.runtime.id;
    chrome.tabs.create({
        url: 'chrome-extension://' + id + '/popup.html',
        selected: true
    })
})

// 线路信息认证
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


// 安装、启用冲突检测
chrome.management.onInstalled.addListener(showConflicNumbers)
chrome.management.onEnabled.addListener(showConflicNumbers)
showConflicNumbers();