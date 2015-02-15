jQuery(document).ready( function () {

	$(document).keydown(function (e){ 
		switch(e.keyCode) {
			case 37:
				$(".lightbox:target .prev").click();
				break;
			case 39:
				$(".lightbox:target .next").click();
				console.log($(".lightbox:target .close"));
				break;
			case 27:
				$(".lightbox:target .close").click();
				break;
			default:
			return; // Quit when this doesn't handle the key event.
		}
	});

});
