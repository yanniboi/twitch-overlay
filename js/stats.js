const streamElement = document.getElementById("data-stream");
const viewElement = document.getElementById("data-view");
const followerElement = document.getElementById("data-follower");
const recentRaidElement = document.getElementById("data-recent-raid");
const recentFollowerElement = document.getElementById("data-recent-follower");

function fetchDataRepeat() {
    setTimeout(function(){
        doFetchData();
        fetchDataRepeat();
    }, 4000);
}

function doFetchData() {
    fetch('../twitch-stats/stats.json')
        .then(response => response.text())
        .then(data => {
            data = JSON.parse(data);
            // Do something with your data
            console.log(data);
            recentFollowerElement.setAttribute('data-value', data.recentFollower);
            followerElement.setAttribute('data-value', data.followCount);
            updateMarkup();
        });
}


function updateMarkup() {
    streamElement.innerHTML = streamElement.getAttribute("data-value");
    viewElement.innerHTML = viewElement.getAttribute("data-value");
    followerElement.innerHTML = followerElement.getAttribute("data-value");
    recentRaidElement.innerHTML = recentRaidElement.getAttribute("data-value").toUpperCase();
    recentFollowerElement.innerHTML = recentFollowerElement.getAttribute("data-value").toUpperCase();
}

updateMarkup();
fetchDataRepeat();
