# myCoins 

This is a react app that uses the [CoinGecko API](https://www.coingecko.com/api/documentation) to display top 10 cryptos based on their marketcap and important data about each one.

[DEMO]([https://jh-488.github.io/mycoins/](https://mycoinss.netlify.app/))

# Getting started

To get the app running locally:

* Clone this repo and cd to the directory
* npm install to install all req'd dependencies
* npm run dev to start the local server 

# Functionality overview

* Home page with the top 10 coins 
* Each coin is represented by a bubble (Bubble size depends on the coin market cap)
* If the coin have a positive change in the last 24 hrs, the bubble will be green, else red
* coin/:id page for information about each coin
* Current price / Chart (using [react-chartjs-2](https://react-chartjs-2.js.org/)) / and more...
* Theme toggle (dark/light)
