(function (window, document, drawModule, undefined) {
	document.getElementById('record').innerHTML = "Record: " + record;
	var btn = document.getElementById('btn');
	btn.addEventListener("click", function(){
		btn.blur(); 
		mycanvas.focus(); 
		drawModule.init();}
		);
	document.onkeydown = function(event) {
        keyCode = window.event.keyCode;
        keyCode = event.keyCode;
        switch(keyCode) {
		        case 37:
		          if (direction != 'right') direction = 'left';
		          break;

		        case 39:
		          if (direction != 'left') direction = 'right';
		          break;

		        case 38:
		          if (direction != 'down') direction = 'up';
		          break;

		        case 40:
		          if (direction != 'up') direction = 'down';
		          break;
          }
      }
})(window, document, drawModule);
