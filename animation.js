function animation(x, y, n) {
	var currentNumber = $("#number-" + x + y);
	currentNumber.css('background-color', getNumberBackgroundColor(n));
	currentNumber.css('color', getNumberColor(n));
	currentNumber.text(n);
	currentNumber.animate({
		display: 'block',
		width: grid + 'px',
		height: grid + 'px',
		top: getTop(x, y),
		left: getLeft(x, y),
	}, 50);

}

function moveAnimation(x, y, aimx, aimy) {
	var number = $('#number-' + x + y);
	number.animate({
		top: getTop(aimx, aimy),
		left: getLeft(aimx, aimy)
	}, 200);
}

function showScore(score) {
	$("#score").text(score);
}