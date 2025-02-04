import { ReduxMenuItem } from "./ReduxMenuItem";
import { ReduxMenuItemConfig } from "./ReduxMenuTypes";
import { DrawEvent, Font, KeyCode } from "../.config/sa.enums.js";

// Define a new type for slider actions
export type SliderReduxMenuAction = (value: number) => void;

// Omit the parent "action" and use "sliderAction" instead.
export interface SliderReduxMenuItemConfig extends Omit<ReduxMenuItemConfig, "action"> {
  // Slider configuration:
  min: number;
  max: number;
  step: number;
  initial: number;
  // This slider-specific callback takes a number.
  sliderAction?: SliderReduxMenuAction;
}

// A slider menu item that extends the standard menu item.
export class SliderReduxMenuItem extends ReduxMenuItem {
  // Slider-specific properties
  public min: number;
  public max: number;
  public step: number;
  public value: number;
  private sliderAction?: SliderReduxMenuAction;
  private isDragging: boolean = false;
  private lastExecuteTime: number = 0;
  private readonly DRAGGING_INTERVAL: number = 500; // 100ms interval

  constructor(
    text: string,
    x: number,
    y: number,
    width: number = 200,
    height: number = 30,
    config: SliderReduxMenuItemConfig
  ) {
    // Pass common parameters to the parent class without an "action".
    super(text, x, y, width, height);
    this.min = config.min;
    this.max = config.max;
    this.step = config.step;
    this.value = config.initial;
    this.sliderAction = config.sliderAction;
  }

  // Override execute so that when the slider "commits" its value,
  // it calls the sliderAction with the current value.
  execute() {
    if (this.sliderAction) {
      this.sliderAction(this.value);
    }
  }

  // Override isHovered to include the slider track area
  isHovered(pointerX: number, pointerY: number): boolean {
    const trackY = this.y + this.height - 10;
    return (
      pointerX >= this.x && 
      pointerX <= this.x + this.width + 8 && 
      pointerY >= this.y && 
      pointerY <= trackY + 14 // Extended to include slider track
    );
  }

  // Handle slider interaction when selected
  update(pointerX: number, isSelected: boolean) {
    if (!isSelected) {
      this.isDragging = false;
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
        this.isDragging = true;

        if (currentTime - this.lastExecuteTime >= this.DRAGGING_INTERVAL) {
            // Calculate value based on pointer position
            const relativeX = Math.max(0, Math.min(pointerX - trackX, trackWidth));
            const ratio = relativeX / trackWidth;
            const newValue = this.min + (this.max - this.min) * ratio;
            const steps = Math.round((newValue - this.min) / this.step);
            const newSteppedValue = Math.min(this.max, Math.max(this.min, this.min + steps * this.step));
            
            if (this.value !== newSteppedValue) {
                this.value = newSteppedValue;
            }
        } else {
            this.execute();
            this.lastExecuteTime = Date.now();
        }
    }
  }

  // Update the slider's value by a delta (multiplied by step)
  // This could be called on pointer or key events.
  updateValue(delta: number): void {
    const newValue = this.value + delta * this.step;
    // Clamp the value between min and max.
    this.value = Math.min(this.max, Math.max(this.min, newValue));
  }

  // Override draw to display the slider value.
  draw(isHovered: boolean): void {
    // Draw the background
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
        isHovered ? 180 : 120
    );

    // Draw the text with value
    const displayText = `${this.text}: ${this.value.toFixed(0)}`;
    const textLength = displayText.length;
    const scale = Math.max(0.4, Math.min(0.6, 1.2 - textLength * 0.05));
    Text.SetColor(255, 255, 255, isHovered ? 255 : 230);
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
    const valueRatio = (this.value - this.min) / (this.max - this.min);
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
        isHovered ? 255 : 200
    );
  }
}
