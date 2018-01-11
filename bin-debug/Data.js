var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var Data = (function () {
    function Data() {
    }
    Data.getScore = function (camp, occasion, total) {
        Data.game.updateMaxBet(total, camp, occasion);
    };
    Data.payBack = function (occasion, total) {
        Data.game.updatePayBack(occasion, total);
    };
    Data.close = function () {
        console.log(">>>>>>>>>>>>>>>>>>closeWeb<<<<<<<<<<<<<<<<");
        alert("我是 " + Utils.deviceOS());
        if (Utils.deviceOS() == "iOS") {
            closeWeb();
        }
        else if (Utils.deviceOS() == "Android") {
            appInterface.closeWeb();
        }
    };
    Data.pay = function (type, curMoney) {
        console.log(">>>>>>>>>>>>>>>>>>recharge<<<<<<<<<<<<<<<<");
        if (Utils.deviceOS() == "iOS") {
            recharge(type, curMoney);
        }
        else if (Utils.deviceOS() == "Android") {
            appInterface.recharge(type, curMoney);
        }
    };
    Data.noMoney = function (type, curMoney) {
        console.log(">>>>>>>>>>>>>>>>>>notEnough<<<<<<<<<<<<<<<<");
        if (Utils.deviceOS() == "iOS") {
            notEnough(type, curMoney);
        }
        else if (Utils.deviceOS() == "Android") {
            appInterface.notEnough(type, curMoney);
        }
    };
    Data.winOrLose = function () {
        console.log(">>>>>>>>>>>>>>>>>>bet<<<<<<<<<<<<<<<<");
        if (Utils.deviceOS() == "iOS") {
            bet();
        }
        else if (Utils.deviceOS() == "Android") {
            appInterface.bet();
        }
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