import { ReduxMenu } from "./ReduxMenu";
import { ReduxMenuPointer } from "./ReduxMenuPointer";

export class MenuSystem {
    private static pointer: ReduxMenuPointer = new ReduxMenuPointer();
    private menu: ReduxMenu | null = null;

    public constructor(menu: ReduxMenu | null) {
        this.menu = menu;
    }


    static getPointer(): ReduxMenuPointer {
        return MenuSystem.pointer;
    }



    getMenu(): ReduxMenu | null {
        return this.menu;
    }
}