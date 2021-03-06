var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Bob on 14-8-19.
 */
var Utils = (function () {
    function Utils() {
    }
    // ========================== BASE ============================
    // 得到屏幕尺寸
    Utils.getStageWidth = function () {
        return egret.Stage.prototype.stageWidth;
    };
    Utils.getStageHeight = function () {
        return egret.Stage.prototype.stageHeight;
    };
    Utils.setResult = function (result_) {
        this._result = result_;
    };
    Utils.getResult = function () {
        return this._result;
    };
    // 初始化单张图片
    Utils.createBitmapByImageName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    // 初始化列表图片
    Utils.createBitmapBySheetName = function (name, sheet) {
        var result = new egret.Bitmap();
        var texture = sheet.getTexture(name);
        result.texture = texture;
        return result;
    };
    // 是否使用微信浏览器
    Utils.isWeiXin = function () {
        var ua = navigator.userAgent.toString();
        var str = ua.match(/MicroMessenger/i);
        if (str == "MicroMessenger") {
            return true;
        }
        else {
            return false;
        }
    };
    // 是否使用手机浏览器
    Utils.isMobile = function () {
        return egret.Capabilities.isMobile;
    };
    // 获得当前设备
    Utils.deviceOS = function () {
        // 苹果手机操作系统 “iOS”
        // 安卓手机操作系统 “Android”
        // 微软手机操作系统 “Windows Phone”
        // 微软桌面操作系统 “Windows PC”
        // 苹果桌面操作系统 “Mac OS”
        // 未知操作系统 “Unknown”
        return egret.Capabilities.os;
    };
    // 获取时间戳
    Utils.getTimeMark = function () {
        return Date.parse(new Date().toString()) / 1000;
    };
    // 获取一段随机字符
    Utils.getRandomStr = function () {
        return Math.random().toString(36).substr(2, 15);
    };
    // 点与矩形的碰撞
    Utils.isCheckCollide = function (touchPoint, rect) {
        if (touchPoint.x >= rect.x && touchPoint.x <= rect.x + rect.width) {
            if (touchPoint.y >= rect.y && touchPoint.y <= rect.y + rect.height) {
                return true;
            }
        }
        return false;
    };
    // ========================= APP ===========================
    // 从href获得参数
    Utils.getArgsValue = function (sHref, sArgName) {
        sHref = sHref.replace("/", "");
        var fun = function (sHref, sArgName) {
            var args = sHref.split("?");
            var retval = "";
            if (args[0] == sHref) {
                return retval;
            }
            var str = args[1];
            args = str.split("&");
            for (var i = 0; i < args.length; i++) {
                str = args[i];
                var arg = str.split("=");
                if (arg.length <= 1)
                    continue;
                if (arg[0] == sArgName)
                    retval = arg[1];
            }
            return retval;
        };
        return fun(sHref, sArgName);
    };
    // 获取当前访问地址
    Utils.getCurrHref = function () {
        return window.location.search;
    };
    // 返回设备
    Utils.getPlatform = function () {
        var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {
                    trident: u.indexOf('Trident') > -1,
                    presto: u.indexOf('Presto') > -1,
                    webKit: u.indexOf('AppleWebKit') > -1,
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
                    iOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
                    iPad: u.indexOf('iPad') > -1,
                    webApp: u.indexOf('Safari') == -1,
                    weChat: u.search(/MicroMessenger/i) !== -1 //是否是微信
                };
            }()
        };
        return browser;
    };
    Utils.getRandNum = function (length) {
        var a = Math.floor(Math.random() * length);
        var b = Math.floor(Math.random() * length);
        while (a == b) {
            b = Math.floor(Math.random() * length);
        }
        console.log(a, b);
        return [a, b];
    };
    Utils.numToW = function (value) {
        if (value > 9999) {
            return Math.floor(value / 10000) + "万";
        }
        return value.toString();
    };
    Utils.mixCard = function (str) {
        // 花色：['Z' => '黑桃', 'Y' => '红桃', 'X' => '梅花', 'W' => '方块']
        switch (str) {
            case "A":
                return "1";
                break;
            case "J":
                return "11";
                break;
            case "Q":
                return "12";
                break;
            case "K":
                return "13";
                break;
            case "Z":
                return "h";
                break;
            case "Y":
                return "r";
                break;
            case "X":
                return "m";
                break;
            case "W":
                return "f";
                break;
        }
        return str;
    };
    Utils.mixType = function (value) {
        // 牌型：[1 => '豹子', 2 => '同花顺', 3 => '同花', 4 => '顺子', 5 => '对子', 6 => '单牌']
        switch (value) {
            case 1:
                return "baozi_mark_png";
                break;
            case 2:
                return "tonghuashun_mark_png";
                break;
            case 3:
                return "tonghua_mark_png";
                break;
            case 4:
                return "shunzi_mark_png";
                break;
            case 5:
                return "duizi_mark_png";
                break;
            case 6:
                return "danpai_mark_png";
                break;
        }
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map