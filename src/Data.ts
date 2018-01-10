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
        closeWeb();
    }

    public static pay(type) {
        console.log(">>>>>>>>>>>>>>>>>>recharge<<<<<<<<<<<<<<<<");
        recharge(type);
    }

    public static noMoney(type) {
        console.log(">>>>>>>>>>>>>>>>>>notEnough<<<<<<<<<<<<<<<<");
        notEnough(type);
    }

    public static winOrLose() {
        console.log(">>>>>>>>>>>>>>>>>>bet<<<<<<<<<<<<<<<<");
        bet();
    }
}
