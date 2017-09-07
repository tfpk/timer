var windows = {};
var running = false;
var circles = ["c1", "c2", "c3", "c4", "c5"];

var CYCLE_TIME = 10;
var NUM_CYCLES = 60;
var cur_time = 0;
var cur_cycles = 0;

var cur_interval;

function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}


function show_hide(id){
    if (!(id in windows)){
        windows[id] = false;
    }
    if (windows[id]){
        $('#'+id).animate({opacity: 1});
        windows[id] = false;
    } else {
        $('#'+id).animate({opacity: 0.01});
        windows[id] = true;
    }
}

function end_time(){
    $("body").css("background", "#ffffff");
    toggleFullScreen();
}

function change_time(){
    var x = cur_time % 5;
    $("#" + circles[x]).toggleClass("white_c").toggleClass("blue_c");
    $("#time_h").text(NUM_CYCLES - cur_cycles);

    cur_time += 1;
    if (cur_time == CYCLE_TIME){
        cur_time = 0;
        cur_cycles += 1;
    }
    if (cur_cycles == NUM_CYCLES){
        end_time();
        running = false;
        window.clearInterval(cur_interval);
    }

}

function start_time(){
    if (running){
        return
    }
    $("body").css("background", "#111");
    toggleFullScreen();
    cur_time = 0;
    cur_cycles = 0;
    running = true;
    cur_interval = window.setInterval(change_time, 100*CYCLE_TIME)
}