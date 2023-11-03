/* ==========================================================================
   HungryVovka's JavaScript style
   ========================================================================== */

// ---------------------- Date and time ----------------------- //

const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus');


const showAmPm = true;


function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  
  const amPm = hour >= 12 ? 'PM' : 'AM';

  
  hour = hour % 12 || 12;

  
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}


function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}


function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

const datePart = document.querySelector("#date");

function date() {
    const today = new Date();
  
    const monthText = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ];
    const dayText = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    const year = today.getFullYear();
    const month = monthText[today.getMonth()].padStart(2, "0");
    const date = JSON.stringify(today.getDate()).padStart(2, "0");
    const day = dayText[today.getDay()];
  
    datePart.innerText = `${day} ${date} ${month} ${year}`;
  }

showTime();
setBgGreet();
getName();
getFocus();
date();


// ----------------------------- Player ----------------------------- //

const musicContainer = document.getElementById("music-container");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const songs = ["hey", "summer", "ukulele"];
let songIndex = 1;

function getSongTitle(song) {
  return song.charAt(0).toUpperCase() + song.slice(1);
}

function loadSong(song) {
  title.innerText = getSongTitle(song);
  audio.src = `https://github.com/bradtraversy/vanillawebprojects/blob/master/music-player/music/${song}.mp3?raw=true`;
  cover.src = `https://github.com/bradtraversy/vanillawebprojects/blob/master/music-player/images/${song}.jpg?raw=true`;
}

function playSong() {
  musicContainer.classList.add("play");
  playButton.querySelector("i.fas").classList.remove("fa-play");
  playButton.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playButton.querySelector("i.fas").classList.remove("fa-pause");
  playButton.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playButton.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});

prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);

// Init
loadSong(songs[songIndex]);


// ---------------------------------- Weather ---------------------------------- //

let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
let city = '';
let apiKey = '&appid=3492d471aae7d96ded83eba070532b16';
let unit = '&units=metric';

let cityTemp = document.getElementById('city-temp');
let cityName = document.getElementById('city-name');
let humidityLevel = document.getElementById('humidity-level');
let minTemp = document.getElementById('min-temp');
let maxTemp = document.getElementById('max-temp');
let icon = document.getElementById('icon');


let searchInput = document.getElementById('search-input');
let searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', findWeatherDetails);
searchInput.addEventListener('keyup', findWeatherDetailsClick);

function findWeatherDetailsClick(event) {
    if (event.keyCode === 13) {
        findWeatherDetails();
    }
}

function findWeatherDetails() {
    if (searchInput.value === '') {
        cityName.textContent = 'Enter Valid City';
        cityTemp.textContent = 0;
        humidityLevel.textContent = 0;
        minTemp.textContent = 0;
        maxTemp.textContent = 0;
    } else {
        city = searchInput.value;
        let url = baseUrl + city + apiKey + unit;
        APIcall(url);
        if (temperatureUnit[0].textContent === 'K') {
            changeUnit();
        }
    }
}

function changeUnit() {
    if (temperatureUnit[0].textContent === 'K') {
        temperatureUnit.forEach(function (item) {
            item.textContent = 'C'
        });
    } else {
        temperatureUnit.forEach(function (item) {
            item.textContent = 'K'
        });
    }
}

function APIcall(url) {
    fetch(url)
        .then(apiResponse => {
            return apiResponse.json();
        })
        .then(data => {
            if (data.cod === 200) {
                const {temp,humidity,temp_min,temp_max} = data.main;
                //console.log(data.weather[0].icon);
                //console.log(data);
                // Updating Dom Elements
                cityTemp.textContent = temp;
                cityName.textContent = data.name + '/' + data.sys.country;
                humidityLevel.textContent = humidity;
                minTemp.textContent = temp_min;
                maxTemp.textContent = temp_max;
                icon.src = 'icons/' + data.weather[0].icon + '.svg';
            } else {
                cityName.textContent = data.message;
                cityTemp.textContent = 0;
                humidityLevel.textContent = 0;
                minTemp.textContent = 0;
                maxTemp.textContent = 0;
            }

        });
}

let changeUnitBtn = document.getElementById('change-unit-btn');
let temperatureUnit = document.querySelectorAll('.unit');
let tempValue = document.querySelectorAll('.js-temp');

changeUnitBtn.addEventListener('click', () => {
    if (cityName.textContent === 'Enter Valid City' || cityName.textContent === 'city not found') {
        cityTemp.textContent = 0;
        humidityLevel.textContent = 0;
        minTemp.textContent = 0;
        maxTemp.textContent = 0;
    } else {
        if (temperatureUnit[0].textContent === 'C') {
            temperatureUnit.forEach(function (item) {
                item.textContent = 'K'
            });
            tempValue.forEach(function (item) {
                item.textContent = parseInt(item.textContent) + 273;
            })
        } else {
            temperatureUnit.forEach(function (item) {
                item.textContent = 'C'
            });
            tempValue.forEach(function (item) {
                item.textContent = parseInt(item.textContent) - 273;
            })
        }
    }

});

window.onload = function () {
    city = 'Delhi';
    let url = baseUrl + city + apiKey + unit;
    APIcall(url);
}


// ---------------------------------- Quotes -------------------------------------- //
function change(){
  var array= new Array();
  array[0]=["Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.","- Buddha"];
  array[1]=["When you want to believe in something, you also have to believe in everything that's necessary for believing in it.","- Ugo Betti"];
  array[2]=["If you can solve your problem, then what is the need of worrying? If you cannot solve it, then what is the use of worrying?","- Shantideva"];
  array[3]=["It is your work in life that is the ultimate seduction.","- Pablo Picasso "];
  array[4]=["Things work well when a group of people know each other, and things break down when it's a bunch of random people interacting.","-Jimmy Wales"];
  array[5]=["Know what you're trying to do before you do it. Turning knobs at random isn't enlightening any more than throwing paint at a wall blindfolded will let you paint a nice picture.","- Steve Albini"];
  array[6]=["Nature is full of genius, full of the divinity; so that not a snowflake escapes its fashioning hand.","- Henry David Thoreau"];
  array[7]=["Give a little love to a child, and you get a great deal back.","- John Ruskin"];
  array[8]=["Never interrupt your enemy when he is making a mistake.","- Napoleon Bonaparte"];
  array[9]=["Confidence is 10% hard work and 90% delusion."," - Tina fey"];
  var Q = array.length;
var quoteToShow=Math.round(Math.random()*(Q-1));
  document.getElementById("quote").innerHTML=array[quoteToShow][0];
 var link = array[quoteToShow][0].trim().replace(/\s/g, '%20'); document.getElementById("author").innerHTML="<i>"+array[quoteToShow][1]+"</i>";
}