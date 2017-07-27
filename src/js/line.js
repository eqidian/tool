var line = {};
if (localStorage.getItem('line')) {
    var localInfo = localStorage.getItem('line');
    document.getElementById('lineInfo').value = localInfo;
}
line.opText = ko.observable('');

// 设置代理
line.set = function() {
    var lineInfo = document.getElementById('lineInfo');
    if (lineInfo.value.trim()) {
        setProxy(lineInfo.value);
    } else {
        line.opText('请填入正确的线路信息！');
        lineInfo.value = '';
        lineInfo.focus();
        setTimeout(function() {
            line.opText('');
        }, 1200)
    }

};

// 获取代理设置信息
line.get = function() {
    chrome.proxy.settings.get({}, function(res) {
        console.log(res)
    })
};

// 线路信息跳转
line.getLines = function() {
    window.location.href = 'super_vpn.html'
};

// 清除代理信息
line.clear = function() {
    chrome.proxy.settings.clear({}, function() {
        localStorage.clear();
        document.getElementById('lineInfo').value = '';
        line.opText('清除成功！');
        setTimeout(function() {
            line.opText('');
        }, 1200)
    });
}

ko.applyBindings(line, document.getElementById('user-operate-box'));



// 设置代理线路
function setProxy(info) {
    localStorage.setItem('line', info);
    var pacScriptStr = "var FindProxyForURL = function(url, host) {\
	      var D = 'DIRECT';\
	      var P = '" + info + "';\
	      if (shExpMatch(host, '10.[0-9]+.[0-9]+.[0-9]+')) return D;\
	      if (shExpMatch(host, '172.[0-9]+.[0-9]+.[0-9]+')) return D;\
	      if (shExpMatch(host, '192.168.[0-9]+.[0-9]+')) return D;\
	      if (shExpMatch(host, '127.[0-9]+.[0-9]+.[0-9]+')) return D;\
	      if (dnsDomainIs(host, 'localhost')) return D;\
	      if (dnsDomainIs(host, 'lubotv.com')) return D;\
	      if (dnsDomainIs(host, 'shicishe.com')) return D;\
	      if (dnsDomainIs(host, 'tianyantong.xyz')) return D;";
    pacScriptStr += 'return P;';
    pacScriptStr += '}';

    // console.log(pacScriptStr)
    chrome.proxy.settings.set({
        value: {
            mode: "pac_script",
            pacScript: {
                data: pacScriptStr
            }
        },
        scope: "regular"
    }, function() {
        line.opText('设置成功！');
        console.log('set success!')
        setTimeout(function() {
            line.opText('');
        }, 1200)
    })
}