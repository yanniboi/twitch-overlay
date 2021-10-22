# Yanniboi's Twitch Overlay

Simple html and js files for adding twitch stats to the stream.

Just add the live panel image to your OBS setup as an image source and add the stats.html page to OBS as a browser source.

### Twitch API Fetching

Contains a small node module for fetching follower stats from Twitch.

**Usage:**

`node index.js`

or for backgound usage:

`node index.js > stats.log 2>&1 &`

The twitch application will check every 10 seconds for changes to followers and write that to the `stats.json` file.

The `stats.html` page checks that file every 5 seconds and updates the UI components with the new values.

You can also set the values manually by editing the `stats.html` files and settings the `data-value` attributes of the html elements.
