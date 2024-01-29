'use strict'

const BASE_URL = 'https://api.rawg.io/api';
const GAMES_ENDPOINT = '/games';
const MOVIES_ENDPOINT = '/movies';
const KEY = 'a14d5c6234c14eaeb905e479e15e4698';

function searchGames() {
  const searchInput = document.getElementById('searchInput').value;
  const url = `${BASE_URL}${GAMES_ENDPOINT}?key=${KEY}&search=${searchInput}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayResults(data.results);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function displayResults(results) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (results.length === 0) {
    resultsContainer.innerHTML = 'No results found.';
  } else {
    results.forEach(result => {
      const gameTitle = result.name;
      const gameElement = document.createElement('div');
      gameElement.innerHTML = `card-title: ${gameTitle}`;
      resultsContainer.append(gameElement);
    });
  }
}

const PLATFORMS = {
  playstation: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 16"><path d="M11.112 16L8 14.654V0s6.764 1.147 7.695 3.987c.931 2.842-.52 4.682-1.03 4.736-1.42.15-1.96-.748-1.96-.748V3.39l-1.544-.648L11.112 16zM12 14.32V16s7.666-2.338 8.794-3.24c1.128-.9-2.641-3.142-4.666-2.704 0 0-2.152.099-4.102.901-.019.008 0 1.51 0 1.51l4.948-1.095 1.743.73L12 14.32zm-5.024-.773s-.942.476-3.041.452c-2.1-.024-3.959-.595-3.935-1.833C.024 10.928 3.476 9.571 6.952 9v1.738l-3.693.952s-.632.786.217.81A11.934 11.934 0 007 12.046l-.024 1.5z" fill="#FFF"/></svg>`,
  pc: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M0 13.772l6.545.902V8.426H0zM0 7.62h6.545V1.296L0 2.198zm7.265 7.15l8.704 1.2V8.425H7.265zm0-13.57v6.42h8.704V0z" fill="#FFF"/></svg>`,
  xbox: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#FFF" d="M3.564 1.357l-.022.02c.046-.048.11-.1.154-.128C4.948.435 6.396 0 8 0c1.502 0 2.908.415 4.11 1.136.086.052.324.215.446.363C11.4.222 7.993 2.962 7.993 2.962c-1.177-.908-2.26-1.526-3.067-1.746-.674-.185-1.14-.03-1.362.141zm10.305 1.208c-.035-.04-.074-.076-.109-.116-.293-.322-.653-.4-.978-.378-.295.092-1.66.584-3.342 2.172 0 0 1.894 1.841 3.053 3.723 1.159 1.883 1.852 3.362 1.426 5.415A7.969 7.969 0 0016 7.999a7.968 7.968 0 00-2.13-5.434zM10.98 8.77a55.416 55.416 0 00-2.287-2.405 52.84 52.84 0 00-.7-.686l-.848.854c-.614.62-1.411 1.43-1.853 1.902-.787.84-3.043 3.479-3.17 4.958 0 0-.502-1.174.6-3.88.72-1.769 2.893-4.425 3.801-5.29 0 0-.83-.913-1.87-1.544l-.007-.002s-.011-.009-.03-.02c-.5-.3-1.047-.53-1.573-.56a1.391 1.391 0 00-.878.431A8 8 0 0013.92 13.381c0-.002-.169-1.056-1.245-2.57-.253-.354-1.178-1.46-1.696-2.04z"/></svg>`,
  mac: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 18"><path d="M10.869 0h.127c.102 1.26-.379 2.202-.963 2.884-.574.677-1.359 1.334-2.629 1.234-.084-1.242.397-2.114.98-2.794C8.927.69 9.919.126 10.87 0zm3.756 13.196v.036a10.534 10.534 0 01-1.494 2.899c-.57.789-1.267 1.85-2.513 1.85-1.077 0-1.792-.696-2.896-.715-1.167-.02-1.81.583-2.877.734h-.364c-.783-.114-1.416-.74-1.877-1.302A11.452 11.452 0 010 10.134v-.808c.083-1.969 1.033-3.57 2.295-4.345.667-.413 1.583-.764 2.603-.607.437.068.884.219 1.275.368.371.144.835.398 1.275.385.298-.009.594-.165.894-.275.88-.32 1.74-.687 2.877-.514 1.365.207 2.334.818 2.933 1.76-1.155.74-2.068 1.855-1.912 3.76.138 1.73 1.137 2.742 2.385 3.338z" fill="#FFF"/></svg>`}

const gamesWrapper = document.querySelector('.games-wrapper')

function getGameItem(gameInfo) {
  const column = document.createElement('div');

  const game = document.createElement('div');

  column.classList.add('col-12', 'col-md-4', 'col-lg-3', 'mb-4');
  game.classList.add('card', 'h-100', 'game');
  game.id = gameInfo.id;

  const gameContent = `<div class="card-img-top game-img-wrapper">
                    <video muted src="" class="game-video" poster=${gameInfo.background_image}>
                    <img src=${gameInfo.background_image} alt="game">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${gameInfo.name}</h5>
                    <p class="card-text genres-wrapper">${getGenresForGame(gameInfo.genres)}</p>
                    <p class="card-text platforms-wrapper">${getPlatformsForGame(
                      gameInfo.parent_platforms
                    )}</p>
                    <p class="card-text">${gameInfo.released}</p>
                </div>
            </div>                
            `;
  
  game.innerHTML = gameContent;
  game.onclick = () => {
    window.location.href = `game.html#${gameInfo.id}`;
  };

  game.onmouseenter = (e) => {
    e.currentTarget.querySelector(".game-video").src = "";
  }

  game.onmouseleave = () => {
    getVideoGame(game.id);
  }

  column.append(game);

  return column;
}

function renderGames(games) {
  gamesWrapper.innerHTML = ''
  games.forEach((gameInfo) => {
    const gameCard = getGameItem(gameInfo)
    gamesWrapper.append(gameCard)
  })
}

function getPlacesholder() {
  for (let i = 0; i < 10; i++) {
    const gamePlacesholder = `<div class="card  h-100" aria-hidden="true">
      <div class="card-img-top game-img-wrapper">
          <img class="img-placeholder">
      </div>
      <div class="card-body">
      <h5 class="card-title placeholder-glow">
        <span class="placeholder col-7"></span>
      </h5>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-4"></span>     
      </p>
    
      </div>
    </div>`
    const column = document.createElement('div')

    column.classList.add('col-12', 'col-md-4', 'col-lg-3', 'mb-4')

    column.innerHTML = gamePlacesholder

    gamesWrapper.append(column)
  }
}

function getGenresForGame(genres = []) {
  return genres.reduce((result, genre) => {
    result += `<span class="badge text-bg-dark">${genre.name}</span>`

    return result;
  }, '');
}

function getPlatformsForGame(platforms = []) {
  return platforms.reduce((result, { platform }) => {
    result += PLATFORMS[platform.slug] || ''

    return result;
  }, '');
}

function getVideoGame (gameId) {
  fetch(`${BASE_URL}${GAMES_ENDPOINT}/${gameId}${MOVIES_ENDPOINT}?key=${KEY}`)
    .then((response) => response.json())
    .then((data) => {
      const currentGame = document.getElementById(gameId);
      const gameVideoTag = currentGame.querySelector('.game-video');    

      if (data.results.length) {
        gameVideoTag.src = data.results[0].data[360] || data.results[0].data[480];
        gameVideoTag.play();        
      }
    });
}


(function () {
  getPlacesholder()
  fetch(`${BASE_URL}${GAMES_ENDPOINT}?key=${KEY}`)
    .then((response) => response.json())
    .then((data) => renderGames(data.results));
  })();