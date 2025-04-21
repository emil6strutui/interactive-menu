import { DrawEvent, Font, KeyCode, Align } from "../.config/sa.enums.js";
import { ReduxMenuConfig} from "./items/types/ReduxMenuItemTypes";
import { MenuRenderStack } from "./ReduxMenuRenderStack";
import { ReduxMenuPointer } from "./ReduxMenuPointer";
import { AbstractReduxMenuItem } from "./items/base/AbstractReduxMenuItem";
import { BaseReduxMenuItemConfig } from "./items/configs/base/BaseReduxMenuItemConfig";
import { ReduxSliderMenuItem } from "./items/ReduxSliderMenuItem";
import { ReduxSubmenuItem } from "./items/ReduxSubmenuItem";
import { ReduxSubmenuItemConfig } from "./items/configs/ReduxSubmenuItemConfig";
import { ReduxSimpleMenuItemConfig } from "./items/configs/ReduxSimpleMenuItemConfig";

export class ReduxMenu {
    // Class-level constants to replace magic numbers:
    private static readonly MENU_WIDTH = 250;
    private static readonly HEADER_HEIGHT = 40;
    private static readonly ITEM_HEIGHT = 40;
    private static readonly ITEM_SPACING = 5;
    private static readonly PADDING = 20;
    private static readonly MAX_MENU_HEIGHT = 430;
    
    private static readonly ITEM_TOP_OFFSET = 60;

    private static readonly TRACK_LEFT_OFFSET = 15;
    private static readonly TRACK_TOP_OFFSET = 40;
    private static readonly TRACK_WIDTH = 10;
  
    private items: AbstractReduxMenuItem[] = [];
    private selectedIndex: number = -1;
    private currentPage: number = 0;
    private itemsPerPage: number = 3;
    private totalPages: number = 0;
    private lastClickTime: number = 0;
    private clickCooldown: number = 50;
    private title: string;
    private x: number;
    private y: number;
    private width: number = 200;
    private height: number = 30;
    private readonly CLOSE_BUTTON_SIZE = 20;
    private readonly CLOSE_BUTTON_PADDING = 10;
    private onCloseCallback: (() => void) | null = null;
    private renderStack: MenuRenderStack;
    private scrollMode: boolean = false;

    constructor(
        menuItems: BaseReduxMenuItemConfig<AbstractReduxMenuItem>[],
        renderStack: MenuRenderStack,
        config?: ReduxMenuConfig,
        isSubmenu: boolean = false
    ) {
        this.renderStack = renderStack;
        this.x = config?.x ?? 220;
        this.y = config?.y ?? 150;
        this.itemsPerPage = config?.itemsPerPage ?? 3;
        this.title = config?.title ?? "Main Menu";
        this.width = config?.width ?? 200;
        this.height = config?.height ?? 30;
    
        this.scrollMode = config?.scrollBar ?? false;

        let configItems = menuItems;
        // Add a back button for submenus.
        if (isSubmenu) {
            configItems = [
                new ReduxSimpleMenuItemConfig(
                    "< Back",
                    () => this.navigateBack()
                ),
                ...configItems
            ] as BaseReduxMenuItemConfig<AbstractReduxMenuItem>[];
        }

        // Create all ReduxMenuItems.
        configItems.forEach((item: BaseReduxMenuItemConfig<AbstractReduxMenuItem>, index: number) => {
            let menuItem;

            item.x = this.x - 100;
            item.y = this.y + (index % this.itemsPerPage) * (item.height ?? ReduxMenu.ITEM_HEIGHT) 
            if (item instanceof ReduxSubmenuItemConfig) {
                item.renderStack = this.renderStack;
            }
            
            menuItem = item.create();
            this.items.push(menuItem);
          });

        
    
        if (this.scrollMode) {
            const maxVisible = Math.floor(
                (ReduxMenu.MAX_MENU_HEIGHT) / (ReduxMenu.ITEM_HEIGHT + ReduxMenu.ITEM_SPACING)
            );
    
            this.itemsPerPage = Math.min(this.itemsPerPage, maxVisible);
            // In scroll mode, each scroll moves one item.
            this.totalPages = Math.max(this.items.length - this.itemsPerPage + 1, 1);
        } else {
            const maxVisible = Math.floor(
                (ReduxMenu.MAX_MENU_HEIGHT - ReduxMenu.HEADER_HEIGHT - (ReduxMenu.PADDING * 2) + ReduxMenu.ITEM_SPACING)
                / (ReduxMenu.ITEM_HEIGHT + ReduxMenu.ITEM_SPACING)
            );
    
            this.itemsPerPage = Math.min(this.itemsPerPage, maxVisible);
            this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
        }
    }


    navigateToSubmenu(submenu: ReduxMenu) {
        this.renderStack.push(submenu);
    }

    navigateBack() {
        this.renderStack.pop();
    }

    update(pointerX: number, pointerY: number) {
        this.selectedIndex = -1;
        // Calculate start index based on scroll mode:
        const startIdx = this.scrollMode ? this.currentPage : (this.currentPage * this.itemsPerPage);
        const endIdx = Math.min(startIdx + this.itemsPerPage, this.items.length);

        for (let i = startIdx; i < endIdx; i++) {
            if (this.items[i].isHovered(pointerX, pointerY)) {
                this.selectedIndex = i;
                if (Pad.IsKeyJustPressed(KeyCode.LeftButton)) {
                    this.handleMenuClick(i);
                }
            }
            if (this.items[i] instanceof ReduxSliderMenuItem) {
                (this.items[i] as ReduxSliderMenuItem).update(pointerX, i === this.selectedIndex);
            }
        }
        // When in scroll mode, update the scrolling based on mouse wheel.
        if (this.scrollMode) {
            this.updateScrollBar();
        }
    }


    private updateItemPositions() {
        const menuHeight = this.calculateMenuHeight();
        const { y: menuY } = this.getBoundedMenuPosition(menuHeight);
        const startIdx = this.scrollMode ? this.currentPage : (this.currentPage * this.itemsPerPage);
        const endIdx = Math.min(startIdx + this.itemsPerPage, this.items.length);

        for (let i = startIdx; i < endIdx; i++) {
            const relativeIndex = i - startIdx;
            this.items[i].y = menuY - menuHeight / 2 + ReduxMenu.ITEM_TOP_OFFSET
                + (relativeIndex * ReduxMenu.ITEM_HEIGHT);
        }
    }

    private calculateMenuHeight(): number {
        // Use pagination height only in non–scroll mode.
        const paginationHeight = (!this.scrollMode && this.totalPages > 1) ? 15 : 0;
        const padding = ReduxMenu.PADDING;
        const visibleItems = Math.min(this.itemsPerPage, this.items.length);
        const contentHeight = (visibleItems * ReduxMenu.ITEM_HEIGHT) + ((visibleItems - 1) * ReduxMenu.ITEM_SPACING);
        const calculatedHeight = ReduxMenu.HEADER_HEIGHT + contentHeight + paginationHeight + (padding * 2);
        return Math.min(calculatedHeight, ReduxMenu.MAX_MENU_HEIGHT);
    }

    private getBoundedMenuPosition(menuHeight: number): { x: number, y: number } {
        let menuY = this.y;
        const halfHeight = menuHeight / 2;
        if (menuY - halfHeight < 0) {
            menuY = halfHeight;
        } else if (menuY + halfHeight > ReduxMenu.MAX_MENU_HEIGHT) {
            menuY = ReduxMenu.MAX_MENU_HEIGHT - halfHeight;
        }
        return { x: this.x, y: menuY };
    }

    private drawCloseButton(pointerX: number, pointerY: number) {
        const menuHeight = this.calculateMenuHeight();
        const { x: menuX, y: menuY } = this.getBoundedMenuPosition(menuHeight);
        const closeX = menuX + (this.width / 2) - this.CLOSE_BUTTON_PADDING;
        const closeY = menuY - (menuHeight / 2 - 8) + this.CLOSE_BUTTON_PADDING;
        const isCloseHovered = this.isPointInRect(
            pointerX, pointerY,
            closeX + 5, closeY + 8,
            this.CLOSE_BUTTON_SIZE, this.CLOSE_BUTTON_SIZE
        );

        // Draw a simple close button using two crossed lines.
        Txd.DrawTexturePlus(
            0,
            DrawEvent.AfterHud,
            closeX + this.CLOSE_BUTTON_SIZE / 2,
            closeY + this.CLOSE_BUTTON_SIZE / 2,
            this.CLOSE_BUTTON_SIZE,
            this.CLOSE_BUTTON_SIZE,
            0,
            0,
            true,
            0,
            0,
            0, 0, 0,
            isCloseHovered ? 255 : 180
        );
        Txd.DrawTexturePlus(
            0,
            DrawEvent.AfterHud,
            closeX + this.CLOSE_BUTTON_SIZE / 2,
            closeY + this.CLOSE_BUTTON_SIZE / 2,
            12,
            2,
            45,
            0,
            true,
            0,
            0,
            255, 255, 255,
            isCloseHovered ? 255 : 180
        );
        Txd.DrawTexturePlus(
            0,
            DrawEvent.AfterHud,
            closeX + this.CLOSE_BUTTON_SIZE / 2,
            closeY + this.CLOSE_BUTTON_SIZE / 2,
            12,
            2,
            -45,
            0,
            true,
            0,
            0,
            255, 255, 255,
            isCloseHovered ? 255 : 180
        );
        if (isCloseHovered && Pad.IsKeyJustPressed(KeyCode.LeftButton)) {
            const currentTime = Date.now();
            if (currentTime - this.lastClickTime >= this.clickCooldown) {
                this.hide();
                this.lastClickTime = currentTime;
            }
        }
    }

    draw(pointerX: number, pointerY: number) {
        const menuHeight = this.calculateMenuHeight();
        const { x: menuX, y: menuY } = this.getBoundedMenuPosition(menuHeight);
        
        // Draw menu background
        Txd.DrawTexturePlus(
            0, 
            DrawEvent.BeforeHud, 
            menuX, menuY + 8, 
            ReduxMenu.MENU_WIDTH, menuHeight, 
            0.0, 
            0.0, 
            false, 
            0, 0, 
            100, 149, 237, 100);
        // Draw title
        Text.DrawString(this.title, DrawEvent.BeforeHud, menuX - 100, menuY - menuHeight / 2 + 20, 0.7, 1.6, true, Font.Subtitles);
        
        // Update item positions based on bounded menu position
        const startIdx = this.scrollMode ? this.currentPage : this.currentPage * this.itemsPerPage;
        const endIdx = Math.min(startIdx + this.itemsPerPage, this.items.length);
        
        for (let i = startIdx; i < endIdx; i++) {
            const relativeIndex = i - startIdx;
            this.items[i].y = menuY - menuHeight / 2 + ReduxMenu.ITEM_TOP_OFFSET + (relativeIndex * ReduxMenu.ITEM_HEIGHT);
            this.items[i].draw(i === this.selectedIndex);
        }

        if (this.scrollMode && this.totalPages > 1) {
            this.drawScrollBar(pointerX, pointerY);
        } else if (this.totalPages > 1) {
            this.drawPagination(menuY + menuHeight/2 - 30, pointerX, pointerY);
        }
        
        this.drawCloseButton(pointerX, pointerY);
    }

    private drawPagination(paginationY: number, pointerX: number, pointerY: number) {
        const prevX = this.x - 130;
        const nextX = this.x + 60;
        const centerX = this.x - 25;
        
        Text.DrawString(
            `Page ${this.currentPage + 1}/${this.totalPages}`, 
            DrawEvent.BeforeHud, 
            centerX, paginationY + 2, 
            0.4, 0.8, 
            true, 
            Font.Subtitles)
        
        const currentTime = Date.now();
        const canClick = currentTime - this.lastClickTime >= this.clickCooldown;

        if (this.currentPage > 0) {
            const isPrevHovered = this.isPointInRect(
                pointerX, 
                pointerY, 
                prevX + 10, 
                paginationY + 5, 
                60, 
                20
            );

            Text.DrawStringExt(
                "< Prev", // Text
                DrawEvent.BeforeHud, // DrawEvent
                prevX + 10, // X
                paginationY, // Y
                0.5, // SizeX
                1.0, // SizeY
                true, // FixAr
                Font.Subtitles, // Font
                true, // Prop
                Align.Left, 
                500.0, // Wrap
                false, // Justify
                255, // Red 
                255, // Green
                255, // Blue
                isPrevHovered ? 255 : 220, // Alpha
                1, // Outline
                0, // Shadow
                0, // DropRed
                0, // DropGreen
                0, // DropBlue
                255, // DropAlpha
                false, // Background
                0, // BackRed
                0, // BackGreen
                0, // BackBlue
                0, // BackAlpha
            )
            

            if (isPrevHovered && Pad.IsKeyJustPressed(KeyCode.LeftButton) && canClick) {
                this.currentPage--;
                this.updateItemPositions();
                this.lastClickTime = currentTime;
            }
        }

        if (this.currentPage < this.totalPages - 1) {
            const isNextHovered = this.isPointInRect(
                pointerX, 
                pointerY, 
                nextX + 10,
                 paginationY + 5, 
                 60, 
                 20
                );
            Text.DrawStringExt(
                "Next >", // Text
                DrawEvent.BeforeHud, // DrawEvent
                nextX + 10, // X
                paginationY, // Y
                0.5, // SizeX
                1.0, // SizeY
                true, // FixAr
                Font.Subtitles, // Font
                true, // Prop
                Align.Left, 
                500.0, // Wrap
                false, // Justify
                255, // Red
                255, // Green
                255, // Blue
                isNextHovered ? 255 : 220, // Alpha
                1, // Outline
                0, // Shadow
                0, // DropRed
                0, // DropGreen
                0, // DropBlue
                255, // DropAlpha
                false, // Background
                0, // BackRed
                0, // BackGreen
                0, // BackBlue
                0, // BackAlpha
            )
            
            if (isNextHovered && Pad.IsKeyJustPressed(KeyCode.LeftButton) && canClick) {
                this.currentPage++;
                this.updateItemPositions();
                this.lastClickTime = currentTime;
            }
        }
    }

    private updateScrollBar() {
        if (this.scrollMode) {
            if (Mouse.IsWheelDown()) {
                if (this.currentPage < this.totalPages - 1) {
                    this.currentPage++;
                    this.updateItemPositions();
                }
            }
            if (Mouse.IsWheelUp()) {
                if (this.currentPage > 0) {
                    this.currentPage--;
                    this.updateItemPositions();
                }
            }
        }
    }

    // Draw the vertical scrollbar.
    private drawScrollBar(pointerX: number, pointerY: number) {
        const menuHeight = this.calculateMenuHeight();

        const { x: menuX, y: menuY } = this.getBoundedMenuPosition(menuHeight);
        // Place the scrollbar on the right side using the defined constants.
        const trackX = menuX + ReduxMenu.MENU_WIDTH / 2 - ReduxMenu.TRACK_LEFT_OFFSET;
        const trackY = menuY - menuHeight / 2 + ReduxMenu.TRACK_TOP_OFFSET;
        const itemHeight = ReduxMenu.ITEM_HEIGHT;
        const itemSpacing = ReduxMenu.ITEM_SPACING;
        const trackWidth = ReduxMenu.TRACK_WIDTH;
        const trackHeight = (this.itemsPerPage * (itemHeight - 2) + (this.itemsPerPage * itemSpacing));

        // Draw the scrollbar track.
        const trackCenterX = trackX + trackWidth / 2;
        const trackCenterY = trackY + trackHeight / 2;
        Txd.DrawTexturePlus(
            0,
            DrawEvent.AfterHud,
            trackCenterX,
            trackCenterY,
            trackWidth,
            trackHeight,
            0,
            0,
            true,
            0,
            0,
            80, 80, 80,
            150
        );

        // Draw the handle.
        const totalPages = this.totalPages;
        if (totalPages > 1) {
            const handleHeight = Math.max(20, trackHeight / totalPages);
            const maxHandleOffset = trackHeight - handleHeight;
            const handleOffset = totalPages > 1 ? (this.currentPage / (totalPages - 1)) * maxHandleOffset : 0;
            const handleY = trackY + handleOffset;
            const handleCenterX = trackX + trackWidth / 2;
            const handleCenterY = handleY + handleHeight / 2;
            const isHandleHovered = this.isPointInRect(pointerX, pointerY, trackX, handleY, trackWidth, handleHeight);
            Txd.DrawTexturePlus(
                0,
                DrawEvent.AfterHud,
                handleCenterX,
                handleCenterY,
                trackWidth,
                handleHeight,
                0,
                0,
                true,
                0,
                0,
                200, 200, 200,
                isHandleHovered ? 255 : 200
            );
        }
    }

    private isPointInRect(x: number, y: number, rectX: number, rectY: number, width: number, height: number): boolean {
        return x >= rectX && x <= rectX + width && y >= rectY && y <= rectY + height;
    }

    private handleMenuClick(index: number) {
        const item = this.items[index];
        const currentTime = Date.now();
        if (currentTime - this.lastClickTime < this.clickCooldown) {
            return;
        }
        this.lastClickTime = currentTime;
        if (item instanceof ReduxSubmenuItem) {
            const submenu = item.getSubmenu();
            this.navigateToSubmenu(submenu);
        } else {
            item.execute();
        }
    }

    display() {
        this.renderStack.push(this);
    }

    hide() {
        const rootMenu = this.renderStack.getRoot();
        this.renderStack.clear();
        if (rootMenu && rootMenu.onCloseCallback) {
            wait(300);
            rootMenu.onCloseCallback();
        }
    }

    process(pointer: ReduxMenuPointer) {
        if (this.renderStack.isEmpty()) return;
        const currentMenu = this.renderStack.peek() || this;
        pointer.update();
        const pointerPos = pointer.getPosition();
        currentMenu.update(pointerPos.x, pointerPos.y);
        pointer.draw();
        currentMenu.draw(pointerPos.x, pointerPos.y);
    }

    getIsVisible(): boolean {
        return !this.renderStack.isEmpty();
    }

    onClose(callback: () => void) {
        this.onCloseCallback = callback;
    }
}