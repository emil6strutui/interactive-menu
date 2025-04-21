import { ReduxMenu } from "./ReduxMenu";
import { ReduxMenuPointer } from "./ReduxMenuPointer";
import { MenuRenderStack } from "./ReduxMenuRenderStack";
import { ReduxMenuItemConfig, ReduxMenuConfig } from "./ReduxMenuTypes";

export class ReduxMenuSystem {
    private static pointer: ReduxMenuPointer;
    private menu: ReduxMenu;

    public constructor(menuItems: ReduxMenuItemConfig[], config: ReduxMenuConfig) {
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