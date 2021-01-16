import getData from './tiembla_tierra.js'

function load(){
    let audio = document.getElementById("audio");
    audio.onended = endAudio;
    audio.ontimeupdate = timeUpdate
    audio.setAttribute('src', data.path);
    restartAudio();
}

function restartAudio(){
    let audio = document.getElementById("audio");
    let ok = false;
    for(let index = indexSet; index < data.cuts.length; index++){
        if (data.cuts[index].type == "sound") {
            indexSet = index;
            let nextData = data.cuts[index + 1];
            if (nextData != undefined){

                skipTime = getSeconds(nextData.time);
            }
            ok = true;
            audio.currentTime = getSeconds(data.cuts[indexSet].time)
            audio.play();
            break;
        }
    }

    if (ok == false){
        skipTime = -1;
    }
}

function getSeconds(startTime){
    let time = startTime.split(":");
    let seconds = parseFloat(time[1]) * 60;
    seconds += parseFloat(time[2]);
    return seconds;
}

var skipTime = -1;
var indexSet = 0;
var data = getData();

function endAudio(){
    indexSet = 0;
    restartAudio();
}

function timeUpdate(){
    let audio = document.getElementById("audio");
    if (audio.currentTime >= skipTime && skipTime > 0){
        indexSet++;
        restartAudio();
    }
    if (skipTime == -1){
        audio.pause();
    }
}
window.onload = load
