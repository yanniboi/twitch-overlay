const daysElement = document.getElementById("data-days");
const streamElement = document.getElementById("data-stream");
const viewElement = document.getElementById("data-view");
const followerElement = document.getElementById("data-follower");
const recentRaidElement = document.getElementById("data-recent-raid");
const recentFollowerElement = document.getElementById("data-recent-follower");

function updateRemainingDays() {
    const remainingDays = dayCounter();
    daysElement.setAttribute('data-value', remainingDays);
}

function dayCounter() {
    const today = new Date();
    const deadline = new Date(today.getFullYear(), 11, 11);

    var one_day=1000*60*60*24;
    return Math.ceil((deadline.getTime()-today.getTime())/(one_day));
}

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
                updateRepeatingMarkup();
            }
        }
    }
    rawFile.send(null);
}

function updateMarkup() {
    daysElement.innerHTML = daysElement.getAttribute("data-value");
    streamElement.innerHTML = streamElement.getAttribute("data-value");
    viewElement.innerHTML = viewElement.getAttribute("data-value");
    followerElement.innerHTML = followerElement.getAttribute("data-value");
    recentRaidElement.innerHTML = recentRaidElement.getAttribute("data-value").toUpperCase();
    recentFollowerElement.innerHTML = recentFollowerElement.getAttribute("data-value").toUpperCase();
}

function updateRepeatingMarkup() {
    followerElement.innerHTML = followerElement.getAttribute("data-value");
    recentFollowerElement.innerHTML = recentFollowerElement.getAttribute("data-value").toUpperCase();
}

updateRemainingDays()
updateMarkup();
fetchDataRepeat();
