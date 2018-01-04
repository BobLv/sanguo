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
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        // 银币 和 金币
        _this.coin_check1 = null;
        _this.coin_check2 = null;
        // 选中押注额度
        _this.choice1 = null;
        _this.choice2 = null;
        _this.choice3 = null;
        _this.choice4 = null;
        _this.choice_coin1 = null;
        _this.choice_coin2 = null;
        _this.choice_coin3 = null;
        _this.choice_coin4 = null;
        _this.wei_coin1 = null;
        _this.wei_coin2 = null;
        _this.shu_coin1 = null;
        _this.shu_coin2 = null;
        _this.wu_coin1 = null;
        _this.wu_coin2 = null;
        _this.choiceArray = [];
        _this.wei_show1 = null;
        _this.shu_show1 = null;
        _this.wu_show1 = null;
        _this.wei_cards = [];
        _this.wei_show2 = null;
        _this.shu_show2 = null;
        _this.wu_show2 = null;
        _this.shu_cards = [];
        _this.wei_show3 = null;
        _this.shu_show3 = null;
        _this.wu_show3 = null;
        _this.wu_cards = [];
        _this.wei_mark = null;
        _this.shu_mark = null;
        _this.wu_mark = null;
        // 总钱数
        _this.moneyType = "coin";
        _this.qianshu = null;
        _this.coin_mark = null;
        _this.chongzhi_font = null;
        _this.checkBet = 0;
        _this.chip = null;
        // 状态
        _this.zhunbei = null;
        _this.touzhu = null;
        _this.timeout = null;
        _this.timeoutBg = null;
        _this.weiScoreBg = null;
        _this.shuScoreBg = null;
        _this.wuScoreBg = null;
        _this.wei_bg = null;
        _this.shu_bg = null;
        _this.wu_bg = null;
        _this.wei_one = null;
        _this.shu_one = null;
        _this.wu_one = null;
        _this.betUser = [];
        _this.wei_all = null;
        _this.shu_all = null;
        _this.wu_all = null;
        _this.betAll = [];
        _this.mingpai = null;
        _this.jieguo = null;
        _this.wei_mask = null;
        _this.shu_mask = null;
        _this.wu_mask = null;
        _this.wei_win = null;
        _this.shu_win = null;
        _this.wu_win = null;
        _this.results = [];
        _this.winData = null;
        _this.notice = null;
        _this.noticeLabel = null;
        _this.noticeStr = "";
        _this.result = null;
        _this.history = null;
        _this.lishi = null;
        _this.baseInfo = {
            apiDomain: Data.apiDomain,
            uid: Data.uid,
            token: Data.token,
            app: Data.app,
            coin: Number(Data.coin),
            silver: Number(Data.silver),
        };
        _this._state = 0;
        // 亮牌
        // 牌型：[1 => '豹子', 2 => '同花顺', 3 => '同花', 4 => '顺子', 5 => '对子', 6 => '单牌']
        // 花色：['Z' => '黑桃', 'Y' => '红桃', 'X' => '梅花', 'W' => '方块']
        _this.showCardData = null;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/game.exml";
        return _this;
    }
    Game.prototype.uiCompHandler = function () {
        // 计时器
        var timer = new egret.Timer(1000, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        //开始计时
        timer.start();
        // 默认页面
        this.zhunbei.visible = true;
        // 第一次进来请求
        this.sendHttpServer("/q102/sgstart?uid=" + this.baseInfo.uid, function (e) {
            var request = e.currentTarget;
            console.log("get data : ", request.response);
            var commond01 = JSON.parse(request.response);
            if (commond01["code"] != 200)
                return;
            if (commond01["data"]["remain"]) {
                this.updateScore(commond01["data"]["remain"]);
            }
            if (commond01["data"]["chip"]) {
                this.chip = commond01["data"]["chip"];
            }
            if (commond01["data"]["cards"]["win"]) {
                this.winData = commond01["data"]["cards"]["win"];
            }
            if (commond01["data"]["cards"]["cards"]) {
                this.showCard(commond01["data"]["cards"]["cards"]);
            }
            // 默认开启一个
            this.checkBoxByTarget(this.coin_check2);
            this.checkBoxByTarget(this.choice1);
        });
    };
    Game.prototype.timerFunc = function () {
        var t = new Date().getSeconds();
        console.log(" 秒 。。。" + t);
        if (t >= 0 && t < 3) {
            console.log(" ================ 准备期 ");
            this.setGameState(1, t);
        }
        if (t >= 3 && t < 43) {
            console.log(" ================ 投注期 ");
            this.setGameState(2, t);
        }
        if (t >= 43 && t < 46) {
            console.log(" ================ 开奖准备期 ");
            this.setGameState(3, t);
        }
        if (t >= 46 && t < 52) {
            console.log(" ================ 明牌期 ");
            this.setGameState(4, t);
        }
        if (t >= 52 && t < 59) {
            console.log(" ================ 开奖结果 ");
            this.setGameState(5, t);
        }
    };
    Game.prototype.timerComFunc = function () {
        console.log("计时结束");
    };
    Game.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.coin_check1 || instance == this.coin_check2) {
            instance.addEventListener(eui.UIEvent.CHANGE, this.onCheckBoxClick, this);
        }
        if (instance == this.choice1 || instance == this.choice2 || instance == this.choice3 || instance == this.choice4) {
            instance.addEventListener(eui.UIEvent.CHANGE, this.onCheckBoxClick, this);
            this.choiceArray.push(instance);
        }
        if (instance == this.qianshu) {
            instance.touchEnabled = false;
        }
        if (instance == this.weiScoreBg || instance == this.shuScoreBg || instance == this.wuScoreBg || instance == this.lishi) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        if (instance == this.wei_show1 || instance == this.wei_show2 || instance == this.wei_show3) {
            this.wei_cards.push(instance);
        }
        if (instance == this.shu_show1 || instance == this.shu_show2 || instance == this.shu_show3) {
            this.shu_cards.push(instance);
        }
        if (instance == this.wu_show1 || instance == this.wu_show2 || instance == this.wu_show3) {
            this.wu_cards.push(instance);
        }
        if (instance == this.wei_mask || instance == this.shu_mask || instance == this.wu_mask ||
            instance == this.wei_win || instance == this.shu_win || instance == this.wu_win ||
            instance == this.wei_bg || instance == this.shu_bg || instance == this.wu_bg) {
            this.results.push(instance);
        }
        if (instance == this.wei_one || instance == this.shu_one || instance == this.wu_one) {
            this.betUser.push(instance);
        }
        if (instance == this.wei_all || instance == this.shu_all || instance == this.wu_all) {
            this.betAll.push(instance);
        }
    };
    // checkbox事件触发
    Game.prototype.onCheckBoxClick = function (e) {
        this.checkBoxByTarget(e.target);
    };
    Game.prototype.checkBoxByTarget = function (target) {
        if (target == this.coin_check1 || target == this.coin_check2) {
            this.coin_check1.selected = false;
            this.coin_check2.selected = false;
            target.selected = true;
            switch (target) {
                case this.coin_check1:
                    this.setCoinMarkTexture("yinbi_png");
                    this.moneyType = "silver";
                    this.updateScore(this.baseInfo.coin);
                    break;
                case this.coin_check2:
                    this.setCoinMarkTexture("jinbi_png");
                    this.moneyType = "coin";
                    this.updateScore(this.baseInfo.silver);
                    break;
            }
            // 切换 金币 和 银币 之前的押注效果
            this.setBetValue(0);
            if (this._state == 4 || this._state == 5) {
                this.showCard(null);
            }
            if (this._state == 5) {
                this.showWin();
            }
        }
        if (target == this.choice1 || target == this.choice2 || target == this.choice3 || target == this.choice4) {
            for (var i = 0; i < this.choiceArray.length; i++) {
                this.choiceArray[i].selected = false;
                if (this.choiceArray[i] == target) {
                    this.checkBet = 100 * Math.pow(10, i);
                    console.log(i + "=押注索引 " + this.checkBet);
                }
            }
            target.selected = true;
        }
    };
    Game.prototype.setCoinMarkTexture = function (resName) {
        this.coin_mark.texture = RES.getRes(resName);
        this.choice_coin1.texture = RES.getRes(resName);
        this.choice_coin2.texture = RES.getRes(resName);
        this.choice_coin3.texture = RES.getRes(resName);
        this.choice_coin4.texture = RES.getRes(resName);
        this.wei_coin1.texture = RES.getRes(resName);
        this.wei_coin2.texture = RES.getRes(resName);
        this.shu_coin1.texture = RES.getRes(resName);
        this.shu_coin2.texture = RES.getRes(resName);
        this.wu_coin1.texture = RES.getRes(resName);
        this.wu_coin2.texture = RES.getRes(resName);
    };
    // 游戏各个状态
    Game.prototype.setGameState = function (state, t) {
        this.zhunbei.visible = false;
        this.jieguo.visible = false;
        this.timeout.visible = false;
        this.timeoutBg.visible = false;
        this.mingpai.visible = false;
        this.touzhu.visible = false;
        switch (state) {
            case 1:// 准备期
                this.showNotice("即将开始，请稍后");
                this.zhunbei.visible = true;
                if (this._state != state) {
                    this.replay();
                }
                break;
            case 2:// 投注期
                this.showNotice("开始选择");
                this.touzhu.visible = true;
                // 投注倒计时显示
                this.timeout.visible = true;
                this.timeoutBg.visible = true;
                this.timeout.text = (43 - t).toString();
                this.timeout.anchorOffsetX = this.timeout.width / 2;
                if (this._state != state) {
                    this.replay();
                }
                break;
            case 3:// 开奖准备期
                this.showNotice("即将揭晓结果");
                this.touzhu.visible = true;
                break;
            case 4:// 开奖明牌期
                this.mingpai.visible = true;
                this.touzhu.visible = true;
                // 获取本轮游戏开奖结果
                // 无参数
                if (this._state != state) {
                    this.sendHttpServer("/q102/sgdisplay", function (e) {
                        var request = e.currentTarget;
                        console.log("get data : ", request.response);
                        var commond03 = JSON.parse(request.response);
                        if (commond03["code"] != 200)
                            return;
                        this.showCard(commond03["data"]["cards"]);
                        this.winData = commond03["data"]["win"];
                    });
                }
                break;
            case 5:// 开奖结果
                this.jieguo.visible = true;
                this.mingpai.visible = true;
                this.touzhu.visible = true;
                if (this._state != state) {
                    this.showWin();
                }
                // 主动领取获胜金额，游戏进入明牌期展示获奖金额时js调用（js判断用户是否有在获胜阵营投注再调用），也可以用押注金额和接口3返回的multi自行计算
                // 需要参数：
                // uid int 押注用户id
                if (this._state != state) {
                    if (this.isSendResultCommond(this.winData["coin"], this.winData["silver"])) {
                        this.sendHttpServer("/q102/sgshowgain?uid=" + this.baseInfo.uid, function (e) {
                            var request = e.currentTarget;
                            console.log("get data : ", request.response);
                            var commond04 = JSON.parse(request.response);
                            if (commond04["code"] != 200)
                                return;
                            this.showResult(commond04["data"]);
                        });
                    }
                }
                break;
        }
        this._state = state;
    };
    Game.prototype.sendHttpServer = function (param, fun) {
        var url = this.baseInfo.apiDomain + param;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, fun, this);
    };
    Game.prototype.showNotice = function (str) {
        if (this.noticeStr != str) {
            this.notice.visible = true;
            this.noticeLabel.text = str;
            this.noticeLabel.anchorOffsetX = this.noticeLabel.width / 2;
            var self = this;
            egret.Tween.get(this.notice, { loop: false }).wait(2000).call(function () {
                self.notice.visible = false;
            });
            this.noticeStr = str;
        }
    };
    Game.prototype.onButtonClick = function (e) {
        var target = e.target;
        switch (target) {
            case this.lishi:
                this.sendHttpServer("/q102/sglog", function (e) {
                    var request = e.currentTarget;
                    console.log("get data : ", request.response);
                    var commond05 = JSON.parse(request.response);
                    if (commond05["code"] != 200)
                        return;
                    this.history = new Lishi(commond05["data"][this.moneyType]);
                    this.addChild(this.history);
                });
                break;
        }
        if (target == this.weiScoreBg || target == this.shuScoreBg || target == this.wuScoreBg) {
            var countryType = 0;
            switch (e.target) {
                case this.weiScoreBg:
                    countryType = 1;
                    break;
                case this.shuScoreBg:
                    countryType = 2;
                    break;
                case this.wuScoreBg:
                    countryType = 3;
                    break;
            }
            // 押注状态下发送押注指令
            if (this._state == 2 && countryType != 0) {
                // uid int 押注用户id
                // occasion string 押注场类型[金币场：coin|银币场：silver]之一
                // camp int 押注阵营[魏：1|蜀：2|吴：3]之一
                // amount int 押注金额
                this.sendHttpServer("/q102/sgchipin?uid=" + this.baseInfo.uid + "&occasion=" + this.moneyType + "&camp=" + countryType + "&amount=" + this.checkBet, function (e) {
                    var request = e.currentTarget;
                    console.log("get data : ", request.response);
                    var commond02 = JSON.parse(request.response);
                    if (commond02["code"] == 200) {
                        this.updateScore(commond02["data"]["remain"]);
                        // 押注
                        this.setBetValue(countryType);
                    }
                    else if (commond02["code"] == 500) {
                        this.showNotice(decodeURIComponent(commond02["message"]));
                    }
                });
            }
        }
    };
    Game.prototype.showResult = function (data) {
        var curWinScore = data["gain"][this.moneyType];
        // 赢取
        if (curWinScore > 0) {
            egret.Tween.get(this, { loop: false }).wait(3000).call(function () {
                this.result = new Result(curWinScore, this.moneyType);
                this.addChild(this.result);
            }).wait(2000).call(function () {
                if (this.result != null) {
                    this.removeChild(this.result);
                    this.result = null;
                }
            });
        }
        // 赢取后改变总额
        var curAllScore = data["remain"][this.moneyType];
        this.updateScore(curAllScore);
        this.baseInfo.coin = data["remain"]["coin"];
        this.baseInfo.silver = data["remain"]["silver"];
    };
    // 设置押注数值
    Game.prototype.setBetValue = function (cardIndex) {
        if (cardIndex != 0) {
            this.chip[this.moneyType][cardIndex - 1]["user"] += this.checkBet;
        }
        for (var i = 0; i < this.betUser.length; i++) {
            this.betUser[i].text = this.chip[this.moneyType][i]["user"];
        }
    };
    // 刷新剩余总金钱
    Game.prototype.updateScore = function (score) {
        this.qianshu.text = Utils.numToW(score);
        // 暂时存下数据
        this.baseInfo[this.moneyType] = score;
    };
    Game.prototype.updateMaxBet = function (betScore, index, type) {
        console.log(betScore + index + type);
    };
    // 重新初始化
    Game.prototype.replay = function () {
        // 结果页遮罩效果初始化
        for (var i = 0; i < this.results.length; i++) {
            this.results[i].visible = false;
        }
        // 押注本地数值初始化
        for (var i = 0; i < this.betUser.length; i++) {
            this.chip["coin"][i]["user"] = 0;
            this.chip["silver"][i]["user"] = 0;
            this.betUser[i].text = this.chip[this.moneyType][i]["user"];
        }
        this.winData = null;
        if (this.result != null) {
            this.removeChild(this.result);
            this.result = null;
        }
    };
    // 本地先判断是否满足发送结果指令
    Game.prototype.isSendResultCommond = function (winCoin, winSilver) {
        var isSend = false;
        for (var i = 0; i < this.betUser.length; i++) {
            if (winCoin - 1 == i && this.chip["coin"][i]["user"] > 0) {
                isSend = true;
            }
        }
        for (var i = 0; i < this.betUser.length; i++) {
            if (winSilver - 1 == i && this.chip["silver"][i]["user"] > 0) {
                isSend = true;
            }
        }
        return isSend;
    };
    // 显示胜利
    Game.prototype.showWin = function () {
        for (var i = 0; i < this.results.length; i++) {
            this.results[i].visible = true;
        }
        switch (this.winData[this.moneyType]) {
            case 1:
                this.wei_mask.visible = false;
                egret.Tween.get(this.wei_win, { loop: false }).to({ scaleX: 2, scaleY: 2 }, 0).to({ scaleX: 1, scaleY: 1 }, 200);
                this.shu_win.visible = false;
                this.wu_win.visible = false;
                this.shu_bg.visible = false;
                this.wu_bg.visible = false;
                break;
            case 2:
                this.shu_mask.visible = false;
                egret.Tween.get(this.shu_win, { loop: false }).to({ scaleX: 2, scaleY: 2 }, 0).to({ scaleX: 1, scaleY: 1 }, 200);
                this.wei_win.visible = false;
                this.wu_win.visible = false;
                this.wei_bg.visible = false;
                this.wu_bg.visible = false;
                break;
            case 3:
                this.wu_mask.visible = false;
                egret.Tween.get(this.wu_win, { loop: false }).to({ scaleX: 2, scaleY: 2 }, 0).to({ scaleX: 1, scaleY: 1 }, 200);
                this.wei_win.visible = false;
                this.shu_win.visible = false;
                this.wei_bg.visible = false;
                this.shu_bg.visible = false;
                break;
        }
    };
    Game.prototype.showCard = function (data) {
        if (data == null) {
            data = this.showCardData;
            if (data == null)
                return;
        }
        else {
            this.showCardData = data;
        }
        // wei
        var weiData = data[this.moneyType][1];
        for (var i = 0; i < weiData.length; i++) {
            if (i == weiData.length - 1) {
                this.wei_mark.texture = RES.getRes(Utils.mixType(weiData[i]));
            }
            else {
                this.wei_cards[i].texture = RES.getRes(Utils.mixCard(weiData[i][0]) + "_" + Utils.mixCard(weiData[i][1]) + "_png");
            }
        }
        // shu
        var shuData = data[this.moneyType][2];
        for (var i = 0; i < shuData.length; i++) {
            if (i == shuData.length - 1) {
                this.shu_mark.texture = RES.getRes(Utils.mixType(shuData[i]));
            }
            else {
                this.shu_cards[i].texture = RES.getRes(Utils.mixCard(shuData[i][0]) + "_" + Utils.mixCard(shuData[i][1]) + "_png");
            }
        }
        // wu
        var wuData = data[this.moneyType][3];
        for (var i = 0; i < wuData.length; i++) {
            if (i == wuData.length - 1) {
                this.wu_mark.texture = RES.getRes(Utils.mixType(wuData[i]));
            }
            else {
                this.wu_cards[i].texture = RES.getRes(Utils.mixCard(wuData[i][0]) + "_" + Utils.mixCard(wuData[i][1]) + "_png");
            }
        }
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Game.js.map