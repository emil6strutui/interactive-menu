import { ReduxMenuAction, ReduxMenuItemConfig } from "./ReduxMenuTypes";
import { ReduxMenu } from "./ReduxMenu";

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

        Text.UseCommands(true);
        
        Text.SetColor(255, 255, 255, isHovered ? 255 : 230);
        Text.SetScale(0.7, 2.0);
        Text.SetWrapX(500.0);
        Text.DisplayFormatted(this.x + 10, this.y + 5, 
            this.hasSubmenu() ? `${this.text} >` : this.text
        );
        
        Text.UseCommands(false);
    }
}