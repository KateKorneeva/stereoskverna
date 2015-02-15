function updateTime(){
  var activeSong = document.getElementById('song');
  var currentSeconds = (Math.floor(activeSong.currentTime % 60) < 10 ? '0' : '') + Math.floor(activeSong.currentTime % 60);
  var currentMinutes = Math.floor(activeSong.currentTime / 60);
  var radial = $('.loader');

  document.getElementById('songTime').innerHTML = currentMinutes + ":" + currentSeconds + ' / ' + Math.floor(activeSong.duration / 60) + ":" + (Math.floor(activeSong.duration % 60) < 10 ? '0' : '') + Math.floor(activeSong.duration % 60);

  var percentageOfSong = (activeSong.currentTime/activeSong.duration);
  var percentageOfSlider = (percentageOfSong)*180;
  
  var transformStyles = ['-webkit-transform', '-ms-transform', 'transform'];
  window.randomize = function() {
    var fillRotation = percentageOfSlider;
    var fixRotation = percentageOfSlider * 2;
    for(i in transformStyles) {
      $('.circle .fill, .circle .mask.full').css(transformStyles[i], 'rotate(' + fillRotation + 'deg)');
      $('.circle .fill.fix').css(transformStyles[i], 'rotate(' + fixRotation + 'deg)');
    }
  }
  setTimeout(window.randomize, 200);
  radial.click(window.randomize);
}

jQuery(document).ready(function() {

  var song;
  var i;
  var kaltListLi = $('.kaltlist.list > li');
  var mechListLi = $('.mechlist.list > li');
  var songPlayPause = $('.songPlayPause');
  var fill = $('.fill');
  var radial = $('.loader');

  
  var activeSong;

  activeSong = document.getElementById('song');

  activeSong.addEventListener("paused", function(e) {
    songPlayPause.removeClass('pauseButton').addClass('playButton');
  }, false);


  mechListLi.click(function () {
    switchSong(mechListLi.index( $(this) ), "audio/mech/");
    setlines($(this));
  });

  kaltListLi.click(function () {
    switchSong(kaltListLi.index( $(this) ), "audio/kalt/");
    setlines($(this));
  });

  songPlayPause.click(function() {
    //Sets the active song since one of the functions could be play.
    activeSong = document.getElementById('song');
    playPause('song');
  });

  radial.click(function() {
    //Sets the active song since one of the functions could be play.
    activeSong = document.getElementById('song');
    setSongPosition(this,event);
  });



  function setlines(xListLi) {
    // problem with $(this) - find how to solve
    var liPos = xListLi.position().top;
    var liHeight = xListLi.height();
    var linePos = liPos + liHeight - 1;
    var songHline = $('.songHline');
    var songVline = $('.songVline');
    var songLongline = $('.songLongline');
    var vLineHeight = linePos + 30;
    var ulLi = $('.list');

    songVline.css("height", vLineHeight);
    songHline.css("top", linePos);

    songHline.removeClass('hidden');
    songVline.removeClass('hidden');
    songLongline.removeClass('hidden');

    ulLi.children('*').removeClass('underlined');
    xListLi.addClass('underlined');
  }

  function switchSong (i, folder) {
    activeSong.pause();

    $('#songmp3').attr("src", ""+folder+""+(i+1)+".mp3");
    $('#songogg').attr("src", ""+folder+""+(i+1)+".ogg");
    $('#song').load();    

    activeSong.load();
    activeSong.play();
    songPlayPause.removeClass('playButton').addClass('pauseButton');

  }

  //Does a switch of the play/pause with one button.
  function playPause(id) {
    //Checks to see if the song is paused, if it is, play it from where it left off otherwise pause it.
    if (activeSong.paused){
     activeSong.play();
     songPlayPause.removeClass('playButton').addClass('pauseButton');
    }else{
     activeSong.pause();
     songPlayPause.removeClass('pauseButton').addClass('playButton');
    }
  }

  function pause() {
    activeSong.pause();
  }

  function setLocation(percentage) {
    activeSong.currentTime = activeSong.duration * percentage;
  }

  function setSongPosition(obj,e) {
    // If the player is circle, its width = height, so height is skipped
    var playerWidth = radial.width(); // width of circle player
    var centerX = playerWidth/2; // horisontal coordinate of center
    var centerY = playerWidth/2; // vertical coordinate of center
    var playWidth = songPlayPause.width(); //width of play button
    var minClickCoord = centerX - (playWidth/2); // minimum coordinate where clicking will trigger play/pause
    var maxClickCoord = centerX + (playWidth/2);
    var offset = radial.offset();


    var evtobj=window.event? event : e;
    var posX = evtobj.pageX - offset.left;
    var posY = evtobj.pageY - offset.top;
    var sideCsq = centerY*centerY;
    var sideBsq = (posX-centerX)*(posX-centerX)+(posY-centerY)*(posY-centerY);
    var sideAsq = (posX-centerX)*(posX-centerX)+(posY)*(posY);

    var squares = (sideBsq + sideCsq - sideAsq);

    var bc2 = Math.sqrt(sideBsq*sideCsq)*2;

    var cos = squares/bc2;

    var acosA = Math.acos(cos);

    var grad;

    if (posX >= centerX) {grad = (acosA*180)/Math.PI;}
    else {grad = (360-(acosA*180)/Math.PI);}

    var percentage = grad/360;

    // Set postion in song manually
    if ((minClickCoord > posX || posX > maxClickCoord) || (minClickCoord > posY || posY > maxClickCoord)) {
      setLocation(percentage); }
  }

  activeSong.addEventListener("ended", function() {
    activeSong.currentTime = 0;
    $('.songPlayPause').removeClass('pauseButton').addClass('playButton');
  });

});
