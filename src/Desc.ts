class Desc extends eui.Component implements  eui.UIComponent {
	private closeBtn:eui.Button = null;
	public constructor() {
		super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
		this.skinName = "resource/desc.exml";
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
	}

	protected childrenCreated():void {
		super.childrenCreated();
	}
}