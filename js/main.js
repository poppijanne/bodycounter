function visualize() {

	document.getElementById("bodies").innerHTML = "Rendering...";

    let totalNumberOfBodies = parseInt(document.getElementById("total-number-of-bodies").value);
    let groups = [];
    let groupManager = new GroupManager();
/*
    groupManager.addGroup({
        icon: "fa-male",
        percentage: 0.0
    });

    groupManager.addGroup({
        icon: "fa-female",
        percentage: 0.5
    });
*/

    groupManager.addGroup({
        icons: ["em-man","em-boy","em-bearded_person","em-older_man","em-blond-haired-man"],
        percentage: 0.0
    });

    groupManager.addGroup({
        icons: ["em-woman","em-girl","em-blond-haired-woman","em-older_woman"],
        percentage: 0.5
    });

    groupManager.addGroup({
        icons: ["em-baby"],
        percentage: 0.95
    });    

    

    setTimeout(function(){renderBodies(totalNumberOfBodies, groupManager, 1, 5)},1);
}

function zoom() {
	let amount = parseInt(document.getElementById("zoom").value)/100;
	document.getElementById("bodies").style.fontSize = Math.floor(13 * amount) + "px";
}

function renderBodies(totalNumberOfBodies, groupManager, minBodiesPerGroup, maxBodiesPerGroup) {
    
    let group;
    let icon;
    let groupCounter = 0;
    let bodiesPerGroup = minBodiesPerGroup + Math.floor(Math.random()*(1+maxBodiesPerGroup-minBodiesPerGroup));
    let html = '<div class="body-group">';
    
    for (let i = 0; i < totalNumberOfBodies; i++) {
        group = groupManager.getGroup(totalNumberOfBodies, i);
        icon = group.icons[Math.floor(Math.random()*group.icons.length)];
        html += renderBody(icon);

        groupCounter++;

        if (groupCounter >= bodiesPerGroup) {
            html += '</div><div class="body-group">';
            groupCounter = 0;
            bodiesPerGroup = minBodiesPerGroup + Math.floor(Math.random()*(1+maxBodiesPerGroup-minBodiesPerGroup));
        }
    }
    html += '</div>';

    document.getElementById("bodies").innerHTML = html;
}



function renderBody(icon) {
    //return '<i class="body fas ' + icon + '"></i>';
    return '<i class="body em ' + icon + '"></i>';
}

function GroupManager() {

    this.groups = [];

    this.addGroup = function(group) {
        this.groups.push(group);
    }

    this.getGroup = function(totalNumberOfBodies, bodyIndex) {
        let r = Math.random();
        for (let i = this.groups.length - 1; i >= 0; i--) {
            if (r >= this.groups[i].percentage) {
                return this.groups[i];
            }
        }
    }
}