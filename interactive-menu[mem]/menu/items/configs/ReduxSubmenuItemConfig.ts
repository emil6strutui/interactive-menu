import { ReduxMenu } from "../../ReduxMenu";
import { MenuRenderStack } from "../../ReduxMenuRenderStack";
import { AbstractReduxMenuItem } from "../base/AbstractReduxMenuItem";
import { ReduxSubmenuItem } from "../ReduxSubmenuItem";
import { BaseReduxMenuItemConfig } from "./base/BaseReduxMenuItemConfig";

export class ReduxSubmenuItemConfig extends BaseReduxMenuItemConfig<ReduxSubmenuItem> {
    public renderStack: MenuRenderStack;
    public submenuX?: number;
    public submenuY?: number;
    public submenuWidth?: number;
    public submenuHeight?: number;
    public itemsPerPage?: number;
    public scrollBar?: boolean;

    constructor(
        text: string,
        public submenu: BaseReduxMenuItemConfig<AbstractReduxMenuItem>[],
        x?: number,
        y?: number,
        width?: number,
        height?: number,
    ) {
        super(text, x, y, width, height);
    }

    create(): ReduxSubmenuItem {
        const item = new ReduxSubmenuItem(
            this.text,
            this.x,
            this.y,
            this.width,
            this.height,
        );

        const submenu = new ReduxMenu(this.submenu, this.renderStack, {
            itemsPerPage: this.itemsPerPage,
            scrollBar: this.scrollBar,
            title: item.text,
            x: this.submenuX,
            y: this.submenuY,
            width: this.submenuWidth,
            height: this.submenuHeight,
          }, true);

        item.setSubmenu(submenu);

        return item;
    }
}
