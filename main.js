function changeTab(getToActivate) {
    browser.tabs.query({
	currentWindow: true
    }, function (tabs) {
	var actives = tabs.filter(function(t) { return t.active; });
	if (actives.length !== 1) return;
	var active = actives[0];
	var toActivate = getToActivate(tabs, active);
	browser.tabs.update(
	    toActivate,
	    { active: true }
	);
    });
}

browser.commands.onCommand.addListener(function(command) {
    if (command == "previous-tab") {
	changeTab(function (tabs, active) {
	    if (active.index == 0) {
		return tabs[tabs.length - 1].id;
	    } else {
		return tabs[active.index - 1].id;
	    }
	});
    } else if (command == "next-tab") {
	changeTab(function (tabs, active) {
	    if (active.index == tabs.length - 1) {
		return tabs[0].id;
	    } else {
		return tabs[active.index + 1].id;
	    }
	});
    }
});
