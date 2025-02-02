import { ReduxMenuAction, ReduxMenuItemConfig } from "./ReduxMenuTypes";
import { ReduxMenu } from "./ReduxMenu";
import { Align, DrawEvent, Font } from "../.config/sa.enums.js";

export class ReduxMenuItem {
    public submenu: ReduxMenu | null = null;
    private action: ReduxMenuAction | null = null;

    constructor(
        public text: string,
        public x: number,
        public y: number,
        public width: number = 200,
        public height: number = 30,
        config?: ReduxMenuItemConfig

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

    isHovered(pointerX: number, pointerY: number): boolean {
        return pointerX >= this.x && 
               pointerX <= this.x + this.width && 
               pointerY >= this.y && 
               pointerY <= this.y + this.height;
    }

    draw(isHovered: boolean) {

        Hud.DrawRect(
            this.x + this.width / 2, 
            this.y + this.height / 2,
            this.width,
            this.height,
            0,
            0,
            0,
            isHovered ? 180 : 120
        );

        
        const displayText = this.getDisplayText();
        const textLength = displayText.length;
        const scale = Math.max(0.5, Math.min(0.7, 1.2 - (textLength * 0.05)));
        
        Text.SetColor(255, 255, 255, isHovered ? 255 : 230);
        const currentYScale = 3.3 * scale;
        Text.SetScale(scale * 1, currentYScale);
        Text.SetWrapX(500.0);
        
        const maxYScale = 3.3 * 0.7;
        const scaleFactor = currentYScale / maxYScale;
        const baseOffset = 2;
        const verticalOffset = baseOffset + (this.height - (this.height * scaleFactor)) / 2;
        
        Text.DisplayFormatted(this.x + 10, this.y + verticalOffset, displayText);
        
    }

    private getDisplayText(): string {
        const maxLength = 22;
        let finalText = this.text;
        
        if (Text.GetLength(this.text) > maxLength) {
            finalText = this.text.substring(0, maxLength - 3) + "...";
        }
        
        return this.hasSubmenu() ? `${finalText} >` : finalText;
    }
}