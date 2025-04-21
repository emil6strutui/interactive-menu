import { BaseReduxMenuItemConfig } from "./base/BaseReduxMenuItemConfig";
import { ReduxSliderMenuItem } from "../ReduxSliderMenuItem";

export class ReduxSliderMenuItemConfig extends BaseReduxMenuItemConfig<ReduxSliderMenuItem> {
    constructor(
        text: string, 
        public min: number, 
        public max: number, 
        public step: number, 
        public initial: number, 
        public sliderAction: (value: number) => void,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
    ) {
        super(text, x, y, width, height);
    }

    create(): ReduxSliderMenuItem {
        return new ReduxSliderMenuItem(this.text, this.x, this.y, this.width, this.height, this.min, this.max, this.step, this.initial, this.sliderAction);
    }
}