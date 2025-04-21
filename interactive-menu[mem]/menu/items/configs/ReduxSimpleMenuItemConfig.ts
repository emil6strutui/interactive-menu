import { ReduxSimpleMenuItem, } from "../ReduxSimpleMenuItem";
import { BaseReduxMenuItemConfig } from "./base/BaseReduxMenuItemConfig";

export type ReduxSimpleMenuItemAction = () => void;

export class ReduxSimpleMenuItemConfig extends BaseReduxMenuItemConfig<ReduxSimpleMenuItem> {

    constructor(
        text: string,
        public action: ReduxSimpleMenuItemAction,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
    ) {
        super(text, x, y, width, height);
    }

    create(): ReduxSimpleMenuItem {
        return new ReduxSimpleMenuItem(this.x, this.y, this.width, this.height, this.text, this.action);
    }
}
