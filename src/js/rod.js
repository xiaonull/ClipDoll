function Rod(rod) {
	this.rod = $(rod);
}

Rod.prototype.init = function() {
	// 初始化抓杆的柄的长度为60px
	return 60;
};

Rod.prototype.move_Left = function() {
	this.rod.animate({left: '+=5px'}, 1000);
}


export default Rod;

