export function Phone() {
	this.width = document.documentElement.clientWidth; 
	this.height = document.documentElement.clientHeight; 
}

Phone.prototype.getWidth = function() {
	return this.width;
}

Phone.prototype.getHeight = function() {
	return this.height;
}




