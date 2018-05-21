new function() {
	var _self = this;
	_self.width = 1080; //设置默认最大宽度
	_self.fontSize = 108; //默认字体大小
	_self.widthProportion = function() {
		var p = (document.body && document.body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth) / _self.width;
        console.log(p);
        return p > 1 ? 1 : p < 0.5 ? 0.5 : p;
	};
	_self.changePage = function() {
        if(_self.widthProportion() * _self.fontSize >= _self.fontSize){
           document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _self.fontSize + "px !important");
        }else{
            document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _self.widthProportion() * _self.fontSize + "px !important");
        }
	}
	_self.changePage();
    console.log(parseInt(window.getComputedStyle(document.documentElement)["fontSize"])*10);
	window.addEventListener('resize', function() {
		_self.changePage();
	}, false);
};