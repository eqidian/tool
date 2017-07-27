// 超级VPN
var superLinesUrl = 'http://api.chrome.shicishe.com/vspn/vspn_get_list';
var proSuperVPN = {
    get: function() {
        var lines = {};
        $.ajax({
            url: superLinesUrl,
            method: 'get',
            async: false,
            data: {},
            success: function(res) {
                lines = (JSON.parse(res)).list
                // console.log(res);
            },
            error: function(res) {
                console.log(res)
            }
        })
        return this.handleResponse(lines)
    },
    handleResponse: function(ls) {
        var pLine = []
        var that = this
        var pacReg = /\"(.*?)\"/g
        $.each(ls, function(index, item) {
            item.position = (item.pacScript.match(pacReg)).toString().replace(/"/g, '')
            pLine.push(item)
        })
        return pLine
    }
};

// 数据处理部分
var getLineData = [],
    statusText = '';
try {
    getLineData = proSuperVPN.get();
    statusText = '线路获取成功!';
} catch (e) {
    statusText = '获取线路信息失败，请联系开发者!';
}

// console.log(getLineData[0]);

/*
console.log(getLineData);
var obj = {
    color: "#FAAF3A",
    enabled: "1",
    favourite: "1",
    host: "svpn-tw1",
    ip: "twn1.lvdou369.com",
    lastUpdate: "2015-07-22T08:55:43.011Z",
    max_online: "800",
    name: "台湾线路 01",
    number: "1",
    online: "149",
    pacScript: "function FindProxyForURL(url, host) {↵  return 'HTTPS twn1.lvdou369.com: 443 ';↵}",
    pacUrl: "",
    position: "HTTPS twn1.lvdou369.com:443",
    profileType: "PacProfile",
    public: "0",
    region_flag: "TW",
    region_name: "台湾",
    revision: "14b83192b4e",
    sort_id: "1000"
}
 */

var viewModel = {
    lines: ko.observable(getLineData),
    status: ko.observable(statusText),
    time: ko.observable(new Date()),
    loadState: ko.observable(true)
};

// 时间格式化
viewModel.formatTime = ko.computed(function() {
    var now = viewModel.time();
    return dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");;
});

// 线路信息刷新
viewModel.refreshLine = function() {
    viewModel.loadState(true)
    viewModel.lines([]);
    setTimeout(function() {
        viewModel.loadState(false)
        viewModel.lines(proSuperVPN.get());
    }, 600)
}
viewModel.refreshLine();

// 线路测试
viewModel.textLine = function(){
    window.location.href = 'line.html';
}

// ko激活
ko.applyBindings(viewModel, document.getElementById('lines-detail-box'))