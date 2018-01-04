var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var Data = (function () {
    function Data() {
    }
    Data.getScore = function (data) {
        alert(data);
        var commond01 = JSON.parse(data);
        Data.game.updateMaxBet(1000, 1, "coin");
    };
    //域名
    Data.apiDomain = "";
    //用户id
    Data.uid = "";
    //token
    Data.token = "";
    //应用包编号
    Data.app = "";
    //金币剩余量
    Data.coin = "";
    //银币剩余量
    Data.silver = "";
    Data.game = null;
    return Data;
}());
__reflect(Data.prototype, "Data");
//# sourceMappingURL=Data.js.map