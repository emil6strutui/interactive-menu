import { DrawEvent } from "../.config/sa.enums.js";

export class ReduxMenuPointer {
    private POINTER_SPEED = 1;
    private SCREEN_WIDTH = 640;
    private SCREEN_HEIGHT = 448;
    private MOUSE_MEMORY_BASE = 0xB73418;
    
    private pointerX: number;
    private pointerY: number;

    constructor() {
        this.pointerX = this.SCREEN_WIDTH / 2;
        this.pointerY = this.SCREEN_HEIGHT / 2;
    }

    update() {
        const mouseX = Memory.ReadFloat(this.MOUSE_MEMORY_BASE + 12, false);
        const mouseY = Memory.ReadFloat(this.MOUSE_MEMORY_BASE + 16, false);

        this.pointerX += mouseX * this.POINTER_SPEED;
        this.pointerY -= mouseY * this.POINTER_SPEED;
        
        // Clamp pointer position to screen bounds
        this.pointerX = Math.max(0, Math.min(this.pointerX, this.SCREEN_WIDTH));
        this.pointerY = Math.max(0, Math.min(this.pointerY, this.SCREEN_HEIGHT));
    }

    draw() {

        Hud.DrawSprite(1, this.pointerX, this.pointerY, 10, 10, 180, 180, 180, 255);
    }

    getPosition(): { x: number, y: number } {
        return {
            x: this.pointerX,
            y: this.pointerY
        };
    }
} 