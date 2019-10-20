let songs = ["Tumhi ho bandhu", "Ghumar", "India Wale", "Ghoonghroo", "Make some noise", "Saki-saki"];
let pictures = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg"];
let movies = ["Cocktail", "Padmavat", "Happy New Year", "War", "Desi boys", "Batla-House"];

let movieName = document.getElementById('movie');
let songName = document.getElementById('song-title');
let songSlider = document.getElementById('songSlider');
let currenTime = document.getElementById('currentTime');
let duration = document.getElementById('duration');
let play = document.getElementById('play1');


let audio = new Audio();
let currentSong = 0;

window.onload = setSongSrc;

//intialize Audio object
function setSongSrc() {
    audio.src = "songs/" + songs[currentSong];
    songName.textContent = songs[currentSong];
    movieName.textContent = movies[currentSong];
    $("#image1 img").attr("src", "images/" + pictures[currentSong]);
    setTimeout(showDuration, 1000);
}

function playSong() {
    setSongSrc();
    audio.play();
    $(play).removeClass('fa-play').addClass('fa-pause');
    //$(".individual-track").eq(currentSong).css("background-color","red");
    $(".individual-track").eq(currentSong).addClass("red");
    audio.addEventListener("ended", next);
    confirmMessage();

}
//select audio track by clicking
$(".individual-track").click(function () {
    $(".individual-track").eq(currentSong).removeClass("red");
    currentSong = $(this).index();
    playSong();

})

setInterval(updateSongSlider, 1000);

function updateSongSlider() {
    let c = Math.round(audio.currentTime);
    songSlider.value = c;
    currenTime.textContent = convertMins(c);
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
    $(".individual-track").eq(currentSong).addClass("red");

    if (audio.paused) {
        audio.play();
        //confirmMessage();
        audio.addEventListener("ended", next);

    }
    else {
        audio.pause();
    }
}
//play the next song
function next() {
    $(".individual-track").eq(currentSong).removeClass("red");
    currentSong++;
    if (currentSong > songs.length - 1) {
        currentSong = 0;
    }
    playSong();

}
//play the previous song if the current time is 0 or near zero
//otherwise same song restarts
function previous() {
    if (Math.round(audio.currentTime) < 5) {
        //alert(audio.currentTime);
        $(".individual-track").eq(currentSong).removeClass("red");
        currentSong--;
        if (currentSong < 0) {
            currentSong = songs.length - 1;
        }
        playSong();

    } else {
        playSong();
    }

}
function slideTheSong() {
    audio.currentTime = songSlider.value;
    currenTime.textContent = convertMins(audio.currentTime);
}

// repeat the same song once redo butten is clicked
function repeat() {
    audio.loop = !audio.loop;
    if (audio.loop) {
        $("#redo").css("background-color", "white");
    } else {
        $("#redo").css("background-color", "rgba(0,0,0,0)");
    }
}

// using "confirm" to show modal. It asks to press 'ok' if you want to stop.
function confirmMessage() {
    let showConfirm = true;
    audio.ontimeupdate = function () {
        if (audio.currentTime >= 5 && showConfirm) {
            let message = confirm("press OK if you want to stop");
            if (message == true) {
                audio.pause();
                $(play).toggleClass('fa-play').toggleClass('fa-pause');
                audio.currentTime = 0;
            }
            showConfirm = false;
        }
    }
}


