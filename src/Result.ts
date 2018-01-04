// TypeScript file
class Result extends eui.Component implements  eui.UIComponent {
	private light:eui.Image = null;
    private moneyLabel:eui.Label = null;
    private coin:eui.Image = null;

    private _winScore:number = 0;
    private _type:string = "";
	public constructor(winScore:number, type:string) {
		super();
        this._winScore = winScore;
        this._type = type;
        console.log(this._type + " ========");
		this.skinName = "resource/result.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
        if (instance == this.light) {
            egret.Tween.get(this.light, {loop:true}).to({rotation:360},4000);
        }
        if (instance == this.moneyLabel) {
            this.moneyLabel.text = this._winScore.toString();
        }
        if (instance == this.coin) {
            if (this._type == "coin") {
                this.coin.texture = RES.getRes("jinbi_png");
            }else if (this._type == "silver") {
                this.coin.texture = RES.getRes("yinbi_png");
            }
        }
    }

	protected childrenCreated():void {
		super.childrenCreated();
	}
}