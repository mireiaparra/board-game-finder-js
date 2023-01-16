"use strict";
const allList = document.querySelector(".js-allCharactersList");
const favList = document.querySelector(".js-favCharactersList");
const favSection = document.querySelector(".js-favSection");
const searchBtn = document.querySelector(".js-searchBtn");
const searchInput = document.querySelector(".js-searchInput");
const container = document.querySelector(".js-main");
const logBtn = document.querySelector(".js-LogBtn");

let characters = [];
let favCharacters = [];
let favsLocal = JSON.parse(localStorage.getItem("favChars"));
