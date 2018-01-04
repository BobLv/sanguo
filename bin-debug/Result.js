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
// TypeScript file
var Result = (function (_super) {
    __extends(Result, _super);
    function Result(winScore, type) {
        var _this = _super.call(this) || this;
        _this.light = null;
        _this.moneyLabel = null;
        _this.coin = null;
        _this._winScore = 0;
        _this._type = "";
        _this._winScore = winScore;
        _this._type = type;
        console.log(_this._type + " ========");
        _this.skinName = "resource/result.exml";
        return _this;
    }
    Result.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.light) {
            egret.Tween.get(this.light, { loop: true }).to({ rotation: 360 }, 4000);
        }
        if (instance == this.moneyLabel) {
            this.moneyLabel.text = this._winScore.toString();
        }
        if (instance == this.coin) {
            if (this._type == "coin") {
                this.coin.texture = RES.getRes("jinbi_png");
            }
            else if (this._type == "silver") {
                this.coin.texture = RES.getRes("yinbi_png");
            }
        }
    };
    Result.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return Result;
}(eui.Component));
__reflect(Result.prototype, "Result", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Result.js.map