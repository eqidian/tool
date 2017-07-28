var config_parm = {
    icon_active_url: '../images/logo.png',
    icon_gray_url: '../images/logo_gray.png'
};

// 屏蔽鼠标右键
document.oncontextmenu = function() {
    return false;
}

// 消息通知
function showChromeNotifications(msg, callback) {
    msg = msg || {
        title: 'Notice title',
        message: 'Notice info.',
    };
    var creationCallback = callback || function() {};
    var options = {
        type: 'basic', //Property 'type': Value must be one of: [basic, image, list, progress]
        title: msg.title,
        iconUrl: config_parm.icon_active_url,
        message: msg.message
    };
    chrome.notifications.create(msg.id, options, creationCallback);
}

// 冲突插件检测
var Conflictor = {
    // 获取所有冲突插件
    getConflict: function(cb) {
        var selfId = chrome.runtime.id;
        var extensions = [];
        // 获取所有浏览器安装程序
        chrome.management.getAll(function(apps) {
            $.each(apps, function(index, item) {
                if (item.enabled && item.type == 'extension') {
                    $.each(item.permissions, function(i, t) {
                        if (t == 'proxy' && item.id != selfId) {
                            // console.log(item)
                            extensions.push(item);
                        }
                    })
                }
            })
            cb(extensions);
        });
    },
    // 根据id禁用插件
    disabled: function(id, name) {
        chrome.management.setEnabled(id, false, function() {
            showChromeNotifications({
                title: 'Chrome插件禁用提醒',
                message: '"' + name + '" 插件禁用成功!',
            });
            showConflicNumbers();
        })
    },
    // 根据id卸载插件
    uninstall: function(id, name) {
        chrome.management.uninstall(id, function() {
            showChromeNotifications({
                title: 'Chrome插件卸载提醒',
                message: '"' + name + '" 插件卸载成功!',
            });
            showConflicNumbers();
        })
    }
}

// 冲突插件个数提示
function showConflictTips(number) {
    chrome.browserAction.setBadgeText({
        text: number.toString()
    })
    chrome.browserAction.setBadgeBackgroundColor({
        color: [250, 46, 0, 200]
    })
}

// 检测展示冲突数量
function showConflicNumbers() {
    Conflictor.getConflict(function(extensions) {
        console.log(extensions)
        var num = extensions.length;
        if (num === 0) {
            num = '';
        }
        showConflictTips(num);
    })
}