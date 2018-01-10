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
var Desc = (function (_super) {
    __extends(Desc, _super);
    function Desc() {
        var _this = _super.call(this) || this;
        _this.closeBtn = null;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/desc.exml";
        return _this;
    }
    Desc.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.closeBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
    };
    Desc.prototype.onButtonClick = function (e) {
        var target = e.target;
        switch (target) {
            case this.closeBtn:
                this.removeChildren();
                break;
        }
    };
    Desc.prototype.uiCompHandler = function () {
    };
    Desc.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return Desc;
}(eui.Component));
__reflect(Desc.prototype, "Desc", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Desc.js.map