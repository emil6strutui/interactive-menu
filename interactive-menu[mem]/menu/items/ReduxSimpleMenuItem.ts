import { AbstractReduxMenuItem } from "./base/AbstractReduxMenuItem";
import { DrawEvent, Font } from "../../.config/sa.enums.js";
import { ReduxSimpleMenuItemAction } from "./configs/ReduxSimpleMenuItemConfig";

export class ReduxSimpleMenuItem extends AbstractReduxMenuItem {

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        text: string,
        public action: ReduxSimpleMenuItemAction,
    ) {
        super(text, x, y, width, height);
        this.action = action;
    }

    execute(): void {
        this.action();
    }

    draw(isHovered: boolean): void {
        Txd.DrawTexturePlus(0, DrawEvent.BeforeHud, this.x + this.width / 2, this.y + this.height / 2, this.width, this.height, 0.0, 0.0, false, 0, 0, 0, 0, 0, isHovered ? 180 : 120);
        
        const displayText = this.getDisplayText();
        const textLength = displayText.length;
        const scale = Math.max(0.4, Math.min(0.6, 1.2 - (textLength * 0.05)));
        
        const sizeX = scale * 1;
        const sizeY = scale * 2;
        
        const maxYScale = 2 * 0.7;
        const scaleFactor = sizeY / maxYScale;
        const baseOffset = 2;
        const verticalOffset = baseOffset + (this.height - (this.height * scaleFactor)) / 2;
        
        Text.DrawString(displayText, DrawEvent.BeforeHud, this.x + 10, this.y + verticalOffset, sizeX, sizeY, true, Font.Subtitles);
    }

    private getDisplayText(): string {
        const maxLength = 30;
        let finalText = this.text;
        
        if (Text.GetLength(this.text) > maxLength) {
            finalText = this.text.substring(0, maxLength - 3) + "...";
        }
        
        return finalText;
    }

    
}
