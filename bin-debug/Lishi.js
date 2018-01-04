var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Lishi = (function (_super) {
    __extends(Lishi, _super);
    function Lishi(data) {
        var _this = _super.call(this) || this;
        _this.closeBtn = null;
        _this.scrollG = null;
        _this.scroll = null;
        _this._data = null;
        _this._data = data;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/lishi.exml";
        return _this;
    }
    Lishi.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.closeBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
    };
    Lishi.prototype.onButtonClick = function (e) {
        var target = e.target;
        switch (target) {
            case this.closeBtn:
                this.removeChildren();
                break;
        }
    };
    Lishi.prototype.uiCompHandler = function () {
        for (var i = 0; i < this._data.length; i++) {
            var winIndex = this._data[i] - 1;
            for (var j = 0; j < 3; j++) {
                var mark = null;
                if (winIndex == j) {
                    mark = new eui.Image(RES.getRes("sheng_png"));
                }
                else {
                    mark = new eui.Image(RES.getRes("shu_png"));
                }
                if (mark != null) {
                    mark.x = 60 + j * 150;
                    mark.y = 5 + i * 75;
                    this.scrollG.addChild(mark);
                }
            }
        }
    };
    Lishi.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return Lishi;
}(eui.Component));
__reflect(Lishi.prototype, "Lishi", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Lishi.js.map