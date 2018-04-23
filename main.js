var score = 0;
var board = new Array(); //声明 一个棋盘数组
var whetherAdd = new Array(); //声明 一个累加数组 用于判断棋盘格中每一个格子是否进行过累加
var win = [0, 0];
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
$(document).ready(function() {

	Mobile(); //移动端兼容
	newgame(); //游戏的开始
});


//移动端兼容
function Mobile() {
	$("#container").css("width", containerWidth - 2 * space);
	$("#container").css("height", containerWidth - 2 * space);
	$("#container").css("padding", space);
	$("#container").css("border-radius", 0.1 * grid);



	$(".grid").css("width", grid);
	$(".grid").css("height", grid);
	$(".grid").css("line-height", grid);



}
//新游戏的开始
function newgame() {

	//初始化棋盘格
	Initialization();

	//在随机的两个格子生成两个数字小方块
	generateNumber();
	generateNumber();

}


//给棋盘格子定位，形成4*4的棋盘格
function Initialization() {

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var grid = $("#grid-" + i + j);
			grid.css("top", getTop(i, j));
			grid.css("left", getLeft(i, j));

		}
	}
	//初始化数组，设置棋盘格，棋盘格上的每个小格子都是空格，每一个格子未进行过累加
	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		whetherAdd[i] = new Array();
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0; //空格
			whetherAdd[i][j] = false; //未累加

		}


	}


	updateBoardView(); //用于每次动作后，页面更新

}



//用于每次动作后，页面更新
function updateBoardView() {
	//清空棋盘格字
	$(".number").remove();
	//重新生成棋盘格
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			//生成数字小方块
			$("#container").append('<div class="number" id="number-' + i + j + '"></div>')
			var currentNumber = $("#number-" + i + j);
			//给数字小方块进行布局及样式设置
			if (board[i][j] == 0) {
				currentNumber.css('width', '0px');
				currentNumber.css('height', '0px');
				currentNumber.css('top', getTop(i, j) + grid / 2); //设置定位
				currentNumber.css('left', getLeft(i, j) + grid / 2); //设置定位

			} else {
				currentNumber.css('width', grid);
				currentNumber.css('height', grid);
				currentNumber.css('top', getTop(i, j)); //设置定位
				currentNumber.css('left', getLeft(i, j)); //设置定位
				currentNumber.css('background-color', getNumberBackgroundColor(board[i][j])); //设置颜色
				currentNumber.css('color', getNumberColor(board[i][j])); //设置颜色
				currentNumber.text(board[i][j]);
			}
			whetherAdd[i][j] = false; //更新棋盘格累加情况
		}

	}
	$(".number").css("line-height", grid + "px");
	$(".number").css("font-size", fontSize + "px");

}


//在棋盘格中，随机位置生成数字小方块值为2或4
function generateNumber() {


	if (!fullSpace(board)) { //棋盘格存在空位

		//位置随机
		var randomX = parseInt(Math.floor(Math.random() * 4));
		var randomY = parseInt(Math.floor(Math.random() * 4));
		var time = 60;
		while (time < 60) { //计算机寻找空位的机会60次，计算机要在60次之内找到空位
			if (board[randomX][randomY] == 0) {
				break;
			}

			randomX = parseInt(Math.floor(Math.random() * 4));
			randomY = parseInt(Math.floor(Math.random() * 4));

			time++;
		}
		if (time == 60) { //如果计算机超出规定的60次机会，就从第一行第一列开始依次查找，找到第一个空位
			for (var i = 0; i < 4; i++)
				for (var j = 0; j < 4; j++) {
					if (board[i][j] == 0) {
						randomX = i;
						randomY = j;
					}
				}
		}
		//数字随机
		var randomNumber = Math.random() < 0.5 ? 2 : 4;
		board[randomX][randomY] = randomNumber;

		//在randomX行randomY列生成值为randomNumber的数字小方块
		animation(randomX, randomY, randomNumber);
		return true;

	} else {
		return false;
	}



}

function gameover() { //是否游戏结束

	if (fullSpace(board) && nomove(board)) {

		alert("gameover");
	} else if (win[0] != 0 && win[1] != 0) {
		alert("gameover");
	}
}


//键盘操作
$(document).keydown(function(event) {
	switch (event.keyCode) {
		//left
		case 37:
			if (allMoveLeft()) { //左移数字小方块
				setTimeout("generateNumber()", 250); //随机位置生成数字
				setTimeout("gameover()", 300); //是否游戏结束

			}
			break;
			//up
		case 38:
			if (allMoveUp()) { //上移数字小方块
				setTimeout("generateNumber()", 250); //随机位置生成数字
				setTimeout("gameover()", 300); //是否游戏结束
			}
			break;
			//right
		case 39:
			if (allMoveRight()) { //右移数字小方块
				setTimeout("generateNumber()", 250);
				setTimeout("gameover()", 300);
			}
			break;
			//down
		case 40:
			if (allMoveDown()) { //下移数字小方块
				setTimeout("generateNumber()", 250);
				setTimeout("gameover()", 300);
			}
			break;
	}
});

//移动端手势移动
document.addEventListener('touchstart', function(event) {
	//获取手势开始时的坐标点
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
});
document.addEventListener('touchend', function(event) {
	//获取手势停止时的坐标点
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;

	var x = endX - startX;
	var y = endY - startY;

	if (Math.abs(x) < 0.25 * documentWidth && Math.abs(y) < 0.25 * documentWidth) {
		return;

	}
	if (Math.abs(x) > Math.abs(y)) {
		if (x > 0) {
			//right
			if (allMoveRight()) { //右移数字小方块
				setTimeout("generateNumber()", 250);
				setTimeout("gameover()", 300);
			}
		} else {
			//left
			if (allMoveLeft()) { //左移数字小方块
				setTimeout("generateNumber()", 250); //随机位置生成数字
				setTimeout("gameover()", 300); //是否游戏结束

			}
		}
	} else {
		if (y > 0) {
			//down
			if (allMoveDown()) { //下移数字小方块
				setTimeout("generateNumber()", 250);
				setTimeout("gameover()", 300);
			}
		} else {
			//up
			if (allMoveUp()) { //上移数字小方块
				setTimeout("generateNumber()", 250); //随机位置生成数字
				setTimeout("gameover()", 300); //是否游戏结束
			}
		}
	}

});


function allMoveLeft() {
	if (canMoveLeft(board)) {
		for (var i = 0; i < 4; i++) {
			for (var j = 1; j < 4; j++) {
				if (board[i][j] != 0) {
					for (var k = 0; k < j; k++) {
						if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) { //第i行的
							//移动
							moveAnimation(i, j, i, k);
							board[i][k] = board[i][j];
							board[i][j] = 0;

							continue;
						} else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !whetherAdd[i][k]) {
							//移动
							moveAnimation(i, j, i, k);
							//两块相加
							board[i][k] += board[i][j];
							if (board[i][k] == 2048) {

								console.log('success');
								win[0] = i;
								win[1] = k;
							}
							board[i][j] = 0;
							whetherAdd[i][k] = true; //第i行第j列已经累加
							//分数更新，分数的值为碰撞叠加的数字小方块值的和
							score += board[i][k];
							//页面更新分数
							showScore(score);

							continue;
						}
					}
				}

			}
		}
		setTimeout('updateBoardView()', 200);
		return true;
	} else {
		return false;
	}


}

function allMoveRight() {
	if (canMoveRight(board)) {
		for (var i = 0; i < 4; i++) {
			for (var j = 2; j >= 0; j--) {
				if (board[i][j] != 0) {
					for (var k = 3; k > j; k--) {
						if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
							//移动
							moveAnimation(i, j, i, k);
							board[i][k] = board[i][j];
							board[i][j] = 0;

							continue;
						} else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !whetherAdd[i][k]) {
							//移动
							moveAnimation(i, j, i, k);
							board[i][k] += board[i][j];
							board[i][j] = 0;
							if (board[i][k] == 2048) {
								console.log('success');
								win[0] = i;
								win[1] = k;
							}
							//两块相加
							//两数相加
							score += board[i][k];
							whetherAdd[i][k] = true;
							//页面更新分数
							showScore(score);
							continue;
						}
					}
				}

			}
		}
		setTimeout('updateBoardView()', 200);
		return true;
	} else {
		return false;
	}


}

function allMoveUp() {
	if (canMoveUp(board)) {
		for (var j = 0; j < 4; j++) {
			for (var i = 1; i < 4; i++) {
				if (board[i][j] != 0) {
					for (var k = 0; k < i; k++) {
						if (board[k][j] == 0 && noBlockvertical(j, k, i, board)) {
							//移动
							moveAnimation(i, j, k, j);
							board[k][j] = board[i][j];
							board[i][j] = 0;

							continue;
						} else if (board[k][j] == board[i][j] && noBlockvertical(j, k, i, board) && !whetherAdd[k][j]) {
							//移动
							moveAnimation(i, j, k, j);
							board[k][j] += board[i][j];
							board[i][j] = 0;
							if (board[k][j] == 2048) {
								console.log('success');
								win[0] = k;
								win[1] = j;

							}
							whetherAdd[k][j] = true;
							//两块相加
							//两数相加
							score += board[k][j];
							//页面更新分数
							showScore(score);
							continue;
						}
					}
				}

			}
		}
		setTimeout('updateBoardView()', 200);
		return true;
	} else {
		return false;
	}

}

function allMoveDown() {
	if (canMoveDown(board)) {
		for (var j = 0; j < 4; j++) {
			for (var i = 2; i >= 0; i--) {
				if (board[i][j] != 0) {
					for (var k = 3; k > i; k--) {
						if (board[k][j] == 0 && noBlockvertical(j, i, k, board)) { //
							//移动
							moveAnimation(i, j, k, j);
							board[k][j] = board[i][j];
							board[i][j] = 0;

							continue;
						} else if (board[k][j] == board[i][j] && noBlockvertical(j, i, k, board) && !whetherAdd[k][j]) {
							//移动
							moveAnimation(i, j, k, j);
							board[k][j] += board[i][j];
							board[i][j] = 0;
							if (board[k][j] == 2048) {
								console.log('success');
								win[0] = k;
								win[1] = j;

							}
							whetherAdd[k][j] = true;
							//两块相加
							//两数相加
							score += board[k][j];
							//页面更新分数
							showScore(score);
							continue;
						}
					}
				}

			}
		}
		setTimeout('updateBoardView()', 200);
		return true;
	} else {
		return false;
	}


}