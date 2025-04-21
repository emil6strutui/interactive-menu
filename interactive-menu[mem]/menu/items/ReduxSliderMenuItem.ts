import { SliderReduxMenuItemAction } from "./types/ReduxMenuItemTypes";
import { DrawEvent, Font, KeyCode } from "../../.config/sa.enums.js";
import { AbstractReduxMenuItem } from "./base/AbstractReduxMenuItem";

// A slider menu item that extends the standard menu item.
export class ReduxSliderMenuItem extends AbstractReduxMenuItem {
  // Slider-specific properties
  public min: number;
  public max: number;
  public step: number;
  public value: number;
  private sliderAction?: SliderReduxMenuItemAction;
  private isSliderHovered: boolean = false;
  private lastExecuteTime: number = 0;
  private readonly DRAGGING_INTERVAL: number = 500; // 100ms interval
  
  // Confirm button properties
  private confirmButtonWidth: number = 15;
  private confirmButtonHeight: number = 15;
  private confirmButtonX: number;
  private confirmButtonHovered: boolean = false;
  private pendingValue: number;
  private lastConfirmButtonClickTime: number = 0;
  private readonly CONFIRM_BUTTON_COOLDOWN: number = 100; // 500ms cooldown

  constructor(
    text: string,
    x: number,
    y: number,
    width: number = 200,
    height: number = 30,
    min: number,
    max: number,
    step: number,
    initial: number,
    sliderAction: SliderReduxMenuItemAction,
  ) {
    super(text, x, y, width, height);
    this.min = min;
    this.max = max;
    this.step = step;
    this.value = initial;
    this.pendingValue = initial;
    this.sliderAction = sliderAction;
    
    this.confirmButtonX = this.x + this.width + 12;
  }

  execute() {
    if (this.sliderAction && this.confirmButtonHovered && this.pendingValue !== 0) {
      const currentTime = Date.now();
      if(currentTime - this.lastConfirmButtonClickTime >= this.CONFIRM_BUTTON_COOLDOWN) {
        this.value = this.pendingValue;
        this.sliderAction(this.value);
        this.lastConfirmButtonClickTime = currentTime;
      }
    }
  }

  isHovered(pointerX: number, pointerY: number): boolean {
    const trackY = this.y + this.height - 10;
    this.isSliderHovered = (
      pointerX >= this.x && 
      pointerX <= this.x + this.width + 8 && 
      pointerY >= this.y && 
      pointerY <= trackY + 14 // Extended to include slider track
    );
 

    this.confirmButtonHovered = (
      pointerX >= this.confirmButtonX && 
      pointerX <= this.confirmButtonX + this.confirmButtonWidth && 
      pointerY >= this.y && 
      pointerY <= this.y + this.height
    );

    return this.confirmButtonHovered || this.isSliderHovered;
  }

  update(pointerX: number, isSelected: boolean) {
    if (!isSelected) {
      return;
    }

    // Handle keyboard input
    if (Pad.IsKeyPressed(KeyCode.Left)) {
      this.updateValue(-1);
    } else if (Pad.IsKeyPressed(KeyCode.Right)) {
      this.updateValue(1);
    }

    // Handle mouse/pointer input
    const trackX = this.x + 10;
    const trackWidth = this.width - 20;

    if (Pad.IsKeyPressed(KeyCode.LeftButton)) {
        const currentTime = Date.now();
        
        // Check if confirm button is clicked
        if (this.confirmButtonHovered) {
            this.execute();
            return;
        }

        if (currentTime - this.lastExecuteTime >= this.DRAGGING_INTERVAL) {
            // Calculate value based on pointer position
            const relativeX = Math.max(0, Math.min(pointerX - trackX, trackWidth));
            const ratio = relativeX / trackWidth;
            const newValue = this.min + (this.max - this.min) * ratio;
            const steps = Math.round((newValue - this.min) / this.step);
            const newSteppedValue = Math.min(this.max, Math.max(this.min, this.min + steps * this.step));
            
            if (this.pendingValue !== newSteppedValue) {
                this.pendingValue = newSteppedValue;
            }
        }
    }
  }

  updateValue(delta: number): void {
    const newValue = this.pendingValue + delta * this.step;
    this.pendingValue = Math.min(this.max, Math.max(this.min, newValue));
  }
  
  draw(isHovered: boolean): void {
    Txd.DrawTexturePlus(
        0,
        DrawEvent.BeforeHud,
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.width,
        this.height,
        0.0,
        100.0,
        false,
        0,
        0,
        0,
        0,
        0,
        isHovered && this.isSliderHovered ? 180 : 120
    );

    // Draw the text with value
    const displayText = `${this.text}: ${this.pendingValue.toFixed(0)}`;
    const textLength = displayText.length;
    const scale = Math.max(0.4, Math.min(0.6, 1.2 - textLength * 0.05));
    Text.SetColor(255, 255, 255, isHovered && this.isSliderHovered ? 255 : 230);
    const sizeX = scale * 1;
    const sizeY = scale * 2;
    const maxYScale = 2 * 0.7;
    const scaleFactor = sizeY / maxYScale;
    const baseOffset = 2;
    const verticalOffset = baseOffset + (this.height - this.height * scaleFactor) / 2;

    Text.DrawString(
        displayText,
        DrawEvent.BeforeHud,
        this.x + 10,
        this.y + verticalOffset,
        sizeX,
        sizeY,
        true,
        Font.Subtitles
    );

    // Draw slider track
    const trackX = this.x + 10;
    const trackY = this.y + this.height - 10;
    const trackWidth = this.width - 20;
    const trackHeight = 4;

    // Draw track background
    Txd.DrawTexturePlus(
        0,
        DrawEvent.BeforeHud,
        trackX + trackWidth / 2,
        trackY + trackHeight / 2,
        trackWidth,
        trackHeight,
        0.0,
        0.0,
        false,
        0,
        0,
        80,
        80,
        80,
        150
    );

    // Draw handle
    const valueRatio = (this.pendingValue - this.min) / (this.max - this.min);
    const handleX = trackX + valueRatio * trackWidth;
    const handleWidth = 10;
    const handleHeight = 14;
    
    Txd.DrawTexturePlus(
        0,
        DrawEvent.BeforeHud,
        handleX,
        trackY + trackHeight / 2,
        handleWidth,
        handleHeight,
        0.0,
        0.0,
        false,
        0,
        0,
        255,
        255,
        255,
        isHovered && this.isSliderHovered ? 255 : 200
    );
    
    // Draw confirm button
    const buttonColor = this.confirmButtonHovered ? 160 : 80;
    Txd.DrawTexturePlus(
        0,
        DrawEvent.BeforeHud,
        this.confirmButtonX,
        this.y + this.height / 2,
        this.confirmButtonWidth,
        this.confirmButtonHeight,
        0.0,
        0.0,
        false,
        0,
        0,
        0,
        100,
        0,
        buttonColor
    );
    
    // Draw checkmark icon instead of text
    Text.SetColor(255, 255, 255, 255);
    Text.DrawString(
        "+",
        DrawEvent.BeforeHud,
        this.confirmButtonX - this.confirmButtonWidth / 3,
        this.y + 6,
        0.5,
        1.0,
        true,
        Font.Subtitles
    );
  }
}