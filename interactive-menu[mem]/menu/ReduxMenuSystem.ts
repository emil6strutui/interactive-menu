import { ReduxMenu } from "./ReduxMenu";
import { ReduxMenuPointer } from "./ReduxMenuPointer";
import { MenuRenderStack } from "./ReduxMenuRenderStack";
import { ReduxMenuItemConfig, ReduxMenuConfig } from "./ReduxMenuTypes";

export class MenuSystem {
    private static pointer: ReduxMenuPointer = new ReduxMenuPointer();
    private menu: ReduxMenu;

    public constructor(menuItems: ReduxMenuItemConfig[], config: ReduxMenuConfig) {
        this.menu = new ReduxMenu(menuItems, new MenuRenderStack(), config);
    }

    static getPointer(): ReduxMenuPointer {
        return MenuSystem.pointer;
    }

    getMenu(): ReduxMenu {
        return this.menu;
    }
}