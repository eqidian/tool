// 显示冲突标题
function showTitle(plugins) {
    if (plugins.length === 0) {
        document.getElementById('conflictTitle').style.display = 'none';
    } else {
        document.getElementById('conflictTitle').style.display = 'block';
    }
}

Conflictor.getConflict(function(extensions) {
    var conflicts = extensions;
    var plugins = ko.observableArray(conflicts);
    showTitle(plugins());

    for (var i = 0; i < conflicts.length; i++) {
        var extenItem = conflicts[i];
        extenItem.funDisable = function() {
            Conflictor.disabled(this.id, this.name);
            plugins.remove(this);
            showTitle(plugins());
        };
        extenItem.funUninstall = function() {
            Conflictor.uninstall(this.id, this.name);
            plugins.remove(this);
            showTitle(plugins());
        };
    }

    // plugins = ko.observableArray(conflicts);
    ko.applyBindings({ items: plugins })
})