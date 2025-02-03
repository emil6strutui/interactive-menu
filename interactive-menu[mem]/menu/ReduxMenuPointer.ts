import { DrawEvent } from "../.config/sa.enums.js";

export class ReduxMenuPointer {
    private POINTER_SPEED = 1;
    private SCREEN_WIDTH = 640;
    private SCREEN_HEIGHT = 448;
    private MOUSE_MEMORY_BASE = 0xB73418;
    
    // Memory addresses for texture handling
    private readonly CTXD_STORE_ADD_TXD_SLOT = 0x731C80;
    private readonly CTXD_STORE_LOAD_TXD = 0x7320B0;
    private readonly CTXD_STORE_PUSH_CURRENT_TXD = 0x7316A0;
    private readonly CTXD_STORE_FIND_TXD_SLOT = 0x731850;
    private readonly CTXD_STORE_SET_CURRENT_TXD = 0x7319C0;
    private readonly RW_TEXTURE_READ = 0x7F3AC0;
    private readonly CTXD_STORE_POP_CURRENT_TXD = 0x7316B0;
    
    private pointerX: number;
    private pointerY: number;
    private pointerTexture: number | null = null;

    constructor() {
        this.pointerX = this.SCREEN_WIDTH / 2;
        this.pointerY = this.SCREEN_HEIGHT / 2;
        this.initializePointerTexture();
    }

    private initializePointerTexture() {

        const stringBuffer = Memory.Allocate(256);
        const stringBuffer2 = Memory.Allocate(256);
        Memory.WriteUtf8(stringBuffer, "mouse\0", false);

        const txdSlot = Memory.CallFunctionReturn(this.CTXD_STORE_ADD_TXD_SLOT, 1, 1, stringBuffer);

        Memory.WriteUtf8(stringBuffer, "MODELS\\FRONTEN_PC.TXD\0", false);

        Memory.CallFunctionReturn(this.CTXD_STORE_LOAD_TXD, 2, 2, txdSlot, stringBuffer);
        
        Memory.WriteUtf8(stringBuffer, "mouse\0", false);
        Memory.CallFunction(this.CTXD_STORE_PUSH_CURRENT_TXD, 0, 0);
        
        const foundSlot = Memory.CallFunctionReturn(this.CTXD_STORE_FIND_TXD_SLOT, 1, 1, stringBuffer);

        Memory.CallFunction(this.CTXD_STORE_SET_CURRENT_TXD, 1, 1, foundSlot);

        Memory.WriteUtf8(stringBuffer2, "mousea\0", false);
        this.pointerTexture = Memory.CallFunctionReturn(this.RW_TEXTURE_READ, 2, 2, stringBuffer, stringBuffer2);
        
        
        Memory.CallFunction(this.CTXD_STORE_POP_CURRENT_TXD, 0, 0);

        Memory.Free(stringBuffer);
        Memory.Free(stringBuffer2);
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
        if (this.pointerTexture) {
            Txd.DrawTexturePlus(
                this.pointerTexture,
                DrawEvent.AfterRadarOverlay,
                this.pointerX,
                this.pointerY,
                -16.0,
                16.0,
                0.0,
                -100.0,
                true,
                0,
                0,
                255,
                255,
                255,
                255
            );
        }
    }

    getPosition(): { x: number, y: number } {
        return {
            x: this.pointerX,
            y: this.pointerY
        };
    }

    reset() {
        this.pointerX = this.SCREEN_WIDTH / 2;
        this.pointerY = this.SCREEN_HEIGHT / 2;
    }
} 