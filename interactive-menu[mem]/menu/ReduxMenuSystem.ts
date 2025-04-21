import { ReduxMenu } from "./ReduxMenu";
import { ReduxMenuPointer } from "./ReduxMenuPointer";
import { MenuRenderStack } from "./ReduxMenuRenderStack";
import { AbstractReduxMenuItem } from "./items/base/AbstractReduxMenuItem";
import { BaseReduxMenuItemConfig } from "./items/configs/base/BaseReduxMenuItemConfig";
import { ReduxMenuConfig } from "./items/types/ReduxMenuItemTypes";

export class ReduxMenuSystem {
    private static pointer: ReduxMenuPointer;
    private menu: ReduxMenu;

    public constructor(menuItems: BaseReduxMenuItemConfig<AbstractReduxMenuItem>[], config: ReduxMenuConfig) {
        this.menu = new ReduxMenu(menuItems, new MenuRenderStack(), config);
    }

    static getPointer(): ReduxMenuPointer {
        if(!this.pointer) {
            this.pointer = new ReduxMenuPointer();
        }
        return this.pointer;
    }


    getMenu(): ReduxMenu {
        return this.menu;
    }

}