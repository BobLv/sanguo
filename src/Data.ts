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

    public static getScore(data:any):void {
        alert(data);
        var commond01 = JSON.parse(data);
        Data.game.updateMaxBet(1000,1,"coin");
    }
}

