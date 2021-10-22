const streamElement = document.getElementById("data-stream");
const viewElement = document.getElementById("data-view");
const followerElement = document.getElementById("data-follower");
const recentRaidElement = document.getElementById("data-recent-raid");
const recentFollowerElement = document.getElementById("data-recent-follower");

function fetchDataRepeat() {
    setTimeout(function(){
        doFetchData();
        fetchDataRepeat();
    }, 5000);
}

function doFetchData() {
    const file = 'twitch-stats/stats.json';
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                const allText = rawFile.responseText;
                // console.log(allText);

                const data = JSON.parse(allText);
                // console.log(data);

                // Do something with your data
                recentFollowerElement.setAttribute('data-value', data.recentFollower);
                followerElement.setAttribute('data-value', data.followCount);
                updateMarkup();
            }
        }
    }
    rawFile.send(null);
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
