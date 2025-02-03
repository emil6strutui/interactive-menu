import { ReduxMenuAction, ReduxMenuItemConfig } from "./ReduxMenuTypes";
import { ReduxMenu } from "./ReduxMenu";
import { DrawEvent, Font } from "../.config/sa.enums.js";

export class ReduxMenuItem {
    private submenu: ReduxMenu | null = null;
    private action: ReduxMenuAction | null = null;

    constructor(
        public text: string,
        public x: number,
        public y: number,
        public width: number = 200,
        public height: number = 30,
        config?: ReduxMenuItemConfig,


    ) {
        if (config?.action) {
            this.action = config.action;
        }
    }

    execute() {
        if (this.action) {
            this.action();
        }
    }

    hasSubmenu(): boolean {
        return this.submenu !== null;
    }

    setSubmenu(submenu: ReduxMenu) {
        this.submenu = submenu;
    }

    getSubmenu(): ReduxMenu | null {
        return this.submenu;
    }


    isHovered(pointerX: number, pointerY: number): boolean {
        return pointerX >= this.x && 
               pointerX <= this.x + this.width + 8 && 
               pointerY >= this.y && 
               pointerY <= this.y + this.height + 7;
    }

    draw(isHovered: boolean) {

        Txd.DrawTexturePlus(0, DrawEvent.AfterHud, this.x + this.width / 2, this.y + this.height / 2, this.width, this.height, 0.0, 0.0, false, 0, 0, 0, 0, 0, isHovered ? 180 : 120);

        
        const displayText = this.getDisplayText();
        const textLength = displayText.length;
        const scale = Math.max(0.4, Math.min(0.6, 1.2 - (textLength * 0.05)));
        
        Text.SetColor(255, 255, 255, isHovered ? 255 : 230);
        const sizeX = scale * 1;
        const sizeY = scale * 2;
        
        const maxYScale = 2 * 0.7;
        const scaleFactor = sizeY / maxYScale;
        const baseOffset = 2;
        const verticalOffset = baseOffset + (this.height - (this.height * scaleFactor)) / 2;
        
        Text.DrawString(displayText, DrawEvent.AfterHud, this.x + 10, this.y + verticalOffset, sizeX, sizeY, true, Font.Subtitles);
        
    }

    private getDisplayText(): string {
        const maxLength = 30;
        let finalText = this.text;
        
        if (Text.GetLength(this.text) > maxLength) {
            finalText = this.text.substring(0, maxLength - 3) + "...";
        }
        
        return this.hasSubmenu() ? `${finalText} >` : finalText;
    }
}