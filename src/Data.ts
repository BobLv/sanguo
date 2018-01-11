// TypeScript file
class Data {
    //域名
    public static apiDomain:string = "";
    //用户id
    public static uid:string = "";
    //token
    public static token:string = "";
    //应用包编号
    public static app:string = "";
    //金币剩余量
    public static coin:string = "";
    //银币剩余量
    public static silver:string = "";

    public static game:Game = null;

    public static getScore(camp:number, occasion:string, total:number):void {
        Data.game.updateMaxBet(total, camp, occasion);
    }

    public static payBack(occasion:string, total:number) {
        Data.game.updatePayBack(occasion, total);
    }

    public static close() {
        console.log(">>>>>>>>>>>>>>>>>>closeWeb<<<<<<<<<<<<<<<<");
        if (Utils.deviceOS() == "iOS") {
            closeWeb();
        }else if (Utils.deviceOS() == "Android") {
            appInterface.closeWeb();
        }
    }

    public static pay(type, curMoney) {
        console.log(">>>>>>>>>>>>>>>>>>recharge<<<<<<<<<<<<<<<<");
        if (Utils.deviceOS() == "iOS") {
            recharge(type, curMoney);
        }else if (Utils.deviceOS() == "Android") {
            appInterface.recharge(type, curMoney);
        }
    }

    public static noMoney(type, curMoney) {
        console.log(">>>>>>>>>>>>>>>>>>notEnough<<<<<<<<<<<<<<<<");
        if (Utils.deviceOS() == "iOS") {
            notEnough(type, curMoney);
        }else if (Utils.deviceOS() == "Android") {
            appInterface.notEnough(type, curMoney);
        }
    }

    public static winOrLose() {
        console.log(">>>>>>>>>>>>>>>>>>bet<<<<<<<<<<<<<<<<");
        if (Utils.deviceOS() == "iOS") {
            bet();
        }else if (Utils.deviceOS() == "Android") {
            appInterface.bet();
        }
    }
}
