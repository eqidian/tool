function showTitle(t){0===t.length?document.getElementById("conflictTitle").style.display="none":document.getElementById("conflictTitle").style.display="block"}Conflictor.getConflict(function(t){var i=t,n=ko.observableArray(i);showTitle(n());for(var e=0;e<i.length;e++){var l=i[e];l.funDisable=function(){Conflictor.disabled(this.id,this.name),n.remove(this),showTitle(n())},l.funUninstall=function(){Conflictor.uninstall(this.id,this.name),n.remove(this),showTitle(n())}}ko.applyBindings({items:n})});