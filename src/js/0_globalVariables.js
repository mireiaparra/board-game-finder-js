"use strict";
const allList = document.querySelector(".js-allBoardGamesList");
const favList = document.querySelector(".js-favBoardGamesList");
const favSection = document.querySelector(".js-favSection");
const searchBtn = document.querySelector(".js-searchBtn");
const searchInput = document.querySelector(".js-searchInput");
const container = document.querySelector(".js-main");
const logBtn = document.querySelector(".js-LogBtn");

let BoardGames = [];
let favBoardGames = [];
let favsLocal = JSON.parse(localStorage.getItem("favChars"));
