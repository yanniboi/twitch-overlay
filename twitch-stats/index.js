require('dotenv').config();

const fs = require('fs')
const TwitchApi = require("node-twitch").default;

const twitch = new TwitchApi({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_REQUEST,
});

async function getUserInfo(id){
    const info = await twitch.getUsers( id );
    // console.log(info);
    return info.data[0].id;
}
async function getStream(id){
    const streams = await twitch.getStreams({ channel: id });
    // console.log(streams);
}
async function getFollowCount(id){
    const follows = await twitch.getFollows({ to_id: id });
    // const streams = await twitch.getFollows({ from_id: "131656348" });

    // console.log(follows);
    return follows.total;
}
async function getRecentFollow(id){
    const follows = await twitch.getFollows({ to_id: id });
    // console.log(follows);
    return follows.data[0].from_name;
}

async function run(id) {
    // getStream(uname);
    const followCount = await getFollowCount(id);
    // console.log(followCount);

    const recentFollower = await getRecentFollow(id);
    // console.log(recentFollower);

    try {
        const data = fs.writeFileSync('stats.json', JSON.stringify({followCount, recentFollower}))
        // File written successfully
        console.log(currentDate() + ": Successful update");
    } catch (err) {
        // Log the errors.
        console.error(currentDate() + ": " + err);

        // Kill the loop because of errors.
        return false;
    }

    return true;
}

function fetchData(id) {
    setTimeout(async function(){
        let success = await run(id);
        if (success) {
            fetchData(id);
        }
    }, 8000);
}

function currentDate() {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return datetime;
}

// const uname = 'yanni_boi';
// getUserInfo(uname);

const id = '131656348';
fetchData(id);
