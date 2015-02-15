
$(document).ready(function(){  
	var mechlist = $('.mechlist');
	var kaltlist = $('.kaltlist');
	var cominglist = $('.cominglist');
	var line = $('.line');

	$('.mech').click(function() {
		mechlist.removeClass('hidden');
		line.addClass('hidden');
      	$('.mechlist.list').children('*').removeClass('underlined');

		if(!kaltlist.hasClass('hidden')) {
			kaltlist.addClass('hidden');
		}
		if(!cominglist.hasClass('hidden')) {
			cominglist.addClass('hidden');
		}
	});	

	$('.kalt').click(function() {
		kaltlist.removeClass('hidden');
		line.addClass('hidden');
      	$('.kaltlist.list').children('*').removeClass('underlined');

		if(!mechlist.hasClass('hidden')) {
			mechlist.addClass('hidden');
		}
		if(!cominglist.hasClass('hidden')) {
			cominglist.addClass('hidden');
		}
	});

	$('.coming').click(function() {
		cominglist.removeClass('hidden');
		line.addClass('hidden');

		if(!kaltlist.hasClass('hidden')) {
			kaltlist.addClass('hidden');
		}
		if(!mechlist.hasClass('hidden')) {
			mechlist.addClass('hidden');
		}
	});



});


  $(function() {
    $( ".bigmech" ).dialog({
      autoOpen: false
    });
 
    $( ".openmech" ).click(function() {
      $( ".bigmech" ).dialog( "open" );
    });
  });

  $(function() {
    $( ".bigkalt" ).dialog({
      autoOpen: false
      
    });
 
    $( ".openkalt" ).click(function() {
      $( ".bigkalt" ).dialog( "open" );
    });
  });