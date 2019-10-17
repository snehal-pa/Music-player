let songs = ["song1.mp3", "song2.mp3", "song3.mp3", "song4.mp3", "song5.mp3", "song6.mp3"];
let pictures = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg"];
let movies = ["Cocktail", "Padmavat", "Happy New Year", "War", "Desi boys", "Batla-House"];

let movieName = document.getElementById('movie');
let songName = document.getElementById('song-title');
let songSlider = document.getElementById('songSlider');
let currenTime = document.getElementById('currenTime');
let duration = document.getElementById('duration');
let play = document.getElementById('play1');


let audio = new Audio();
let currentSong = 0;

window.onload = setSongSrc;

function setSongSrc() {
    audio.src = "songs/" + songs[currentSong];
    songName.textContent = songs[currentSong];
    movieName.textContent = movies[currentSong];
    $("#image1 img").attr("src", "images/" + pictures[currentSong]);
    setTimeout(showDuration, 1000);
    $(".individual-track").click(function () {
        $(".individual-track").eq(currentSong).removeClass("red");
        currentSong = $(this).index();
        playSong();

    })
}

function playSong() {
    setSongSrc();
    audio.play();

    $(play).removeClass('fa-play').addClass('fa-pause');
    //$(".individual-track").eq(currentSong).css("background-color","red");
    $(".individual-track").eq(currentSong).addClass("red");

}
setInterval(updateSongSlider, 1000);

function updateSongSlider() {
    let c = Math.round(audio.currentTime);
    songSlider.value = c;
    currentTime.textContent = convertMins(c);
}
function convertMins(secs) {
    let min = Math.floor(secs / 60);
    let sec = secs % 60;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    return (min + ":" + sec);
}
function showDuration() {
    let d = Math.floor(audio.duration);
    songSlider.setAttribute("max", d);
    duration.textContent = convertMins(d);
}
function playOrPause() {
    $(play).toggleClass('fa-play').toggleClass('fa-pause');

    if (audio.paused) {
        playSong();
        //audio.play();
        audio.addEventListener("ended", next)

    }
    else {
        audio.pause();
    }
}
function next() {
    $(".individual-track").eq(currentSong).removeClass("red");
    currentSong++;
    if (currentSong > songs.length - 1) {
        currentSong = 0;
    }
    playSong();

}
function previous() {
    $(".individual-track").eq(currentSong).removeClass("red");
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    playSong();

}
function slideTheSong() {
    audio.currentTime = songSlider.value;
    currentTime.textContent = convertMins(audio.currentTime);
}

