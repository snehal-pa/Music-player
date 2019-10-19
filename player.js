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
let random = false;

window.onload = setSongSrc;

function setSongSrc() {
    audio.src = "songs/" + songs[currentSong];
    songName.textContent = songs[currentSong];
    movieName.textContent = movies[currentSong];
    $("#image1 img").attr("src", "images/" + pictures[currentSong]);
    setTimeout(showDuration, 1000);
    /* $(".individual-track").click(function () {
         $(".individual-track").eq(currentSong).removeClass("red");
         currentSong = $(this).index();
         playSong();
 
     })*/
}

function playSong() {
    setSongSrc();
    audio.play();

    $(play).removeClass('fa-play').addClass('fa-pause');
    //$(".individual-track").eq(currentSong).css("background-color","red");
    $(".individual-track").eq(currentSong).addClass("red");
    audio.addEventListener("ended", next);


}
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
        audio.addEventListener("ended", next);

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
function repeat() {
    audio.loop = !audio.loop;
    if (audio.loop) {
        //$("#redo").addClass("red");
        $("#redo").css("background-color", "white");
    } else {
        //$("#redo").removeClass("red");
        $("#redo").css("background-color", "rgba(0,0,0,0)");
    }
}
/*function shuffle() {
    random = true;
    if(random) {
        $(".individual-track").eq(currentSong).removeClass("red");
        currentSong = Math.floor(Math.random() * 6);
        playSong();
        $("#random").click(function () {
            random = false;
        })
    
    }
    if(random){
        $("#random").css("background-color", "white");
    }else{
        $("#random").css("background-color", "rgba(0,0,0,0)");
    }


}*/


