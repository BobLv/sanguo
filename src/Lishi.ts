class Lishi extends eui.Component implements  eui.UIComponent {
	private closeBtn:eui.Button = null;
	private scrollG:eui.Group = null;
	private scroll:eui.Scroller = null;
	private _data:any = null;
	public constructor(data:any) {
		super();
		this._data = data;
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
		this.skinName = "resource/lishi.exml";
	}

    protected partAdded(partName:string, instance:any) {
        super.partAdded(partName, instance);
		if (instance == this.closeBtn) {
			instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
    }

	private onButtonClick(e: egret.TouchEvent) {
			var target = e.target;

			switch(target) {
				case this.closeBtn:
					this.removeChildren();
				break;
			}
	}

	private uiCompHandler() {
		for (var i = 0 ; i < this._data.length ; i++) {
			var winIndex = this._data[i] - 1;
			for (var j = 0 ; j < 3 ; j++) {
				var mark = null;
				if (winIndex == j) {
					mark = new eui.Image(RES.getRes("sheng_png"));
				}else {
					mark = new eui.Image(RES.getRes("shu_png"));
				}
				if (mark != null) {
					mark.x = 60+ j * 150;
					mark.y = 5+ i * 75;
					this.scrollG.addChild(mark);
				}
			}
		}
	}

	protected childrenCreated():void {
		super.childrenCreated();
	}
}