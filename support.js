documentWidth = window.screen.availWidth; //获取当前设备可以用宽度

//兼容手机端
if (documentWidth < 768) { //当设备可以用宽度小于768
	containerWidth = 0.92 * documentWidth; //主体宽度为可以宽度的百分之92
	grid = 0.18 * documentWidth; //数字小方块大小为可以宽度的百分之18
	space = 0.04 * documentWidth; //数字小方块间距为可以宽度的百分之4
	fontSize = 40; //字体大小40px;
} else if (documentWidth > 767) { //当设备可以用宽度大于768
	documentWidth = 1920; //设置设备可以用宽度都为1920
	containerWidth = 0.26 * documentWidth; //主体约500
	grid = 0.05208 * documentWidth; //数字小方块大小约100
	space = 0.01 * documentWidth; //数字小方块间距约20
	fontSize = 60; //字体大小60px;
}


//用于数字小方块在界面中的绝对定位
function getTop(i, j) { //每一个数字小方块距离顶端的距离计算公式(间距+小方块所在行*(小方块宽+间距))
	return space + i * (grid + space);
}

function getLeft(i, j) { //每一个数字小方块距离最左端的距离计算公式(间距+小方块所在列*(小方块宽+间距))
	return space + j * (grid + space);
}



//用于不同值数字小方块在界面中的显示的颜色
function getNumberBackgroundColor(number) {
	switch (number) {
		case 2:
			return '#FCFC86';
			break;
		case 4:
			return '#FFC615';
			break;
		case 8:
			return '#17B9C1';
			break;
		case 16:
			return '#FCA286';
			break;
		case 32:
			return '#B9E315';
			break;
		case 64:
			return '#B986FC';
			break;
		case 128:
			return '#C9BFCB';
			break;
		case 256:
			return '#F2FA00';
			break;
		case 512:
			return '#00FAA5';
			break;
		case 1024:
			return '#FA6F00';
			break;
		case 2048:
			return '#EA5D6C';
			break;
	}


}


//用于空块在界面中的显示的颜色
function getNumberColor(number) {
	if (number <= 4)
		return '#776e65';
	return '#fff';
}



//判断棋盘块是否还能增加数字小方块
function fullSpace(board) { //遍历整个棋盘
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] == 0) //这是标识  数组第[i][j]的值为0,表示棋盘(i,j)位置上是个空位

				return false; //返回false 表示棋盘并没有全充满，还有空位
		}
	}
	return true; //返回true 表示棋盘充满，无空位
}



//判断数字小方块是否能向左移动
function canMoveLeft() {
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) { //找到数字小方块
				if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
					//判断数字小方块左边还有没有空位，或者数字小方块左边的数字小方块是否相等
					return true; //存在这样一个情况,数字小方块能向左移动
			}

		}
	}
	return false; //不存在这样一个情况,数字小方块不能向左移动
}

//判断数字小方块是否能向右移动
function canMoveRight(board) {

	for (var i = 0; i < 4; i++)
		for (var j = 2; j >= 0; j--)
			if (board[i][j] != 0)
				if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
					return true;

	return false;
}
//判断数字小方块是否能向上移动
function canMoveUp(board) {

	for (var j = 0; j < 4; j++)
		for (var i = 1; i < 4; i++)
			if (board[i][j] != 0)
				if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
					return true;

	return false;
}
//判断数字小方块是否能向下移动
function canMoveDown(board) {

	for (var j = 0; j < 4; j++)
		for (var i = 2; i >= 0; i--)
			if (board[i][j] != 0)
				if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
					return true;

	return false;
}


//判断第row行col1列与col2列之间有没有存在数字小方块
function noBlockHorizontal(row, col1, col2, board) {
	for (var i = col1 + 1; i < col2; i++) {
		if (board[row][i] != 0)
			return false;
	}
	return true;

}

//判断第column列row1行与row2行之间有没有存在数字小方块
function noBlockvertical(column, row1, row2, board) {
	for (var i = row1 + 1; i < row2; i++) {
		if (board[i][column] != 0)
			return false;
	}
	return true;

}

//判断整体数字小方块能否移动
function nomove(board) {
	if (canMoveLeft(board) || canMoveRight(board) || canMoveDown(board) || canMoveUp(board)) {
		return false;
	}
	return true;
}