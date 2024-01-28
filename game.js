"use strict";

const BASE_URL = "https://api.rawg.io/api";
const GAMES_ENDPOINT = "/games";
const KEY = "a14d5c6234c14eaeb905e479e15e4698";

const gameWrapper = document.querySelector(".game-container");
const [, gameId] = window.location.href.split("game.html#");
console.log(gameId);

fetch(`${BASE_URL}${GAMES_ENDPOINT}/${gameId}?key=${KEY}`)
    .then((response) => response.json())
    .then((data) => {
        renderGame(data);
    });

function renderGame(game) {
    
    const img = document.createElement("img");

    img.src = game.background_image;

    gameWrapper.append(img);
}