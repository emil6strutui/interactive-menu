import { DrawEvent, Font, KeyCode, Align } from "../.config/sa.enums.js";
import { ReduxMenuItem } from "./ReduxMenuItem";
import { ReduxMenuConfig, ReduxMenuItemConfig } from "./ReduxMenuTypes";
import { MenuRenderStack } from "./ReduxMenuRenderStack.js";
import { ReduxMenuPointer } from "./ReduxMenuPointer";

export class ReduxMenu {
    private items: ReduxMenuItem[] = [];
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

    constructor(menuItems: ReduxMenuItemConfig[], renderStack: MenuRenderStack, config?: ReduxMenuConfig, isSubmenu: boolean = false) {
        this.renderStack = renderStack;
        this.x = config?.x ?? 220;
        this.y = config?.y ?? 150;
        this.itemsPerPage = config?.itemsPerPage ?? 3;
        this.title = config?.title ?? "Main Menu";
        this.width = config?.width ?? 200;
        this.height = config?.height ?? 30;
    
        let configItems = menuItems;
        
        // Only add back button if this is a submenu
        if (isSubmenu) {
            configItems = [
                { text: "< Back", action: () => this.navigateBack() },
                ...configItems
            ];

        }

        this.totalPages = Math.ceil(configItems.length / this.itemsPerPage);
        
        configItems.forEach((item, index) => {
            const menuItem = new ReduxMenuItem(
                item.text, 
                this.x - 100, 
                this.y + (index % this.itemsPerPage) * 40,
                this.width,
                this.height,
                item
            );
            
            if (item.submenu) {
                const submenu = new ReduxMenu(item.submenu, this.renderStack, {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height,
                    itemsPerPage: this.itemsPerPage,
                    title: item.text
                }, true);
                menuItem.setSubmenu(submenu);
            }
            
            this.items.push(menuItem);
        });
    }

    navigateToSubmenu(submenu: ReduxMenu) {
        this.renderStack.push(submenu);
    }

    navigateBack() {
        this.renderStack.pop();
    }

    update(pointerX: number, pointerY: number) {
        this.selectedIndex = -1;
        const startIdx = this.currentPage * this.itemsPerPage;
        const endIdx = Math.min(startIdx + this.itemsPerPage, this.items.length);

        for (let i = startIdx; i < endIdx; i++) {
            if (this.items[i].isHovered(pointerX, pointerY)) {
                this.selectedIndex = i;
                if (Pad.IsKeyJustPressed(KeyCode.LeftButton)) {
                    this.handleMenuClick(i);
                }
            }
        }
    }

    private updateItemPositions() {
        const menuHeight = this.calculateMenuHeight();
        const startIdx = this.currentPage * this.itemsPerPage;
        const endIdx = Math.min(startIdx + this.itemsPerPage, this.items.length);

        for (let i = startIdx; i < endIdx; i++) {
            const relativeIndex = i - startIdx;
            this.items[i].y = 200 - menuHeight/2 + 60 + (relativeIndex * 40);
        }
    }

    private calculateMenuHeight(): number {
        const headerHeight = 40;  // Space for title
        const itemHeight = 40;    // Height per menu item
        const itemSpacing = 10;   // Space between items
        const paginationHeight = this.totalPages > 1 ? 15 : 0;  // Space for pagination
        const padding = 20;       // Padding top and bottom
        
        const visibleItems = Math.min(this.itemsPerPage, this.items.length);
        const contentHeight = (visibleItems * itemHeight) + ((visibleItems - 1) * itemSpacing);
        
        return headerHeight + contentHeight + paginationHeight + (padding * 2);
    }

    private getBoundedMenuPosition(menuHeight: number): { x: number, y: number } {
        const SCREEN_HEIGHT = 448;
        
        let menuY = this.y;
        const halfHeight = menuHeight / 2;
        
        if (menuY - halfHeight < 0) {
            menuY = halfHeight + 10;
        } else if (menuY + halfHeight > SCREEN_HEIGHT) {
            menuY = SCREEN_HEIGHT - halfHeight;
        }
        
        return {
            x: this.x,
            y: menuY
        };
    }

    private drawCloseButton(pointerX: float, pointerY: float) {
        const menuHeight = this.calculateMenuHeight();
        const { x: menuX, y: menuY } = this.getBoundedMenuPosition(menuHeight);
        
        const closeX = menuX + (this.width / 2) - this.CLOSE_BUTTON_PADDING;
        const closeY = menuY - (menuHeight / 2) + this.CLOSE_BUTTON_PADDING;
        
        // Check for hover on the close button
        const isCloseHovered = this.isPointInRect(
            pointerX,
            pointerY,
            closeX + 5,
            closeY + 8,
            this.CLOSE_BUTTON_SIZE,
            this.CLOSE_BUTTON_SIZE

        );

        Txd.DrawTexturePlus(
            0,
            DrawEvent.BeforeHud,
            closeX + this.CLOSE_BUTTON_SIZE/2,
            closeY + this.CLOSE_BUTTON_SIZE/2,
            this.CLOSE_BUTTON_SIZE,
            this.CLOSE_BUTTON_SIZE,
            0,
            0,
            true,
            0,
            0,
            0,
            0,
            0,
            isCloseHovered ? 255 : 180
        );
        
        Txd.DrawTexturePlus(
            0,
            DrawEvent.BeforeHud,
            closeX + this.CLOSE_BUTTON_SIZE/2,
            closeY + this.CLOSE_BUTTON_SIZE/2,
            12,
            2,
            45,
            0,
            true,
            0,
            0,
            255,
            255,
            255,
            isCloseHovered ? 255 : 180
        );

        Txd.DrawTexturePlus(
            0,
            DrawEvent.BeforeHud,
            closeX + this.CLOSE_BUTTON_SIZE/2,
            closeY + this.CLOSE_BUTTON_SIZE/2,
            12,
            2,
            -45,
            0,
            true,
            0,
            0,
            255,
            255,
            255,
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

    draw(pointerX: float, pointerY: float) {
        const menuHeight = this.calculateMenuHeight();
        const menuWidth = 250;
        const { x: menuX, y: menuY } = this.getBoundedMenuPosition(menuHeight);
        
        // Draw menu background
        Txd.DrawTexturePlus(0, DrawEvent.BeforeDrawing, menuX, menuY, menuWidth, menuHeight, 0.0, 0.0, false, 0, 0, 100, 149, 237, 100);
        // Draw title
        Text.DrawString(this.title, DrawEvent.BeforeHud, menuX - 100, menuY - menuHeight / 2 + 20, 0.7, 1.6, true, Font.Subtitles);
        
        // Update item positions based on bounded menu position
        const startIdx = this.currentPage * this.itemsPerPage;
        const endIdx = Math.min(startIdx + this.itemsPerPage, this.items.length);
        
        for (let i = startIdx; i < endIdx; i++) {
            const relativeIndex = i - startIdx;
            this.items[i].y = menuY - menuHeight/2 + 60 + (relativeIndex * 40);
            this.items[i].draw(i === this.selectedIndex);
        }

        if (this.totalPages > 1) {
            this.drawPagination(menuY + menuHeight/2 - 30, pointerX, pointerY);
        }

        this.drawCloseButton(pointerX, pointerY);

    }

    private drawPagination(paginationY: number, pointerX: float, pointerY: float) {
        const prevX = this.x - 130;
        const nextX = this.x + 60;
        const centerX = this.x - 25;
        
        Text.DrawString(`Page ${this.currentPage + 1}/${this.totalPages}`, DrawEvent.BeforeHud, centerX, paginationY + 2, 0.4, 0.8, true, Font.Subtitles)
        
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

    private isPointInRect(x: number, y: number, rectX: number, rectY: number, width: number, height: number): boolean {
        return x >= rectX && 
               x <= rectX + width && 
               y >= rectY && 
               y <= rectY + height;
    }

    private handleMenuClick(index: number) {
        const item = this.items[index];
        const currentTime = Date.now();
        
        if (currentTime - this.lastClickTime < this.clickCooldown) {
            return;
        }
        
        this.lastClickTime = currentTime;

        if (item.hasSubmenu()) {
            // Store reference to the submenu
            const submenu = item.getSubmenu();
            
            this.navigateToSubmenu(submenu);
            return;
        } else {
            item.execute();
        }
    }

    display() {
        this.renderStack.push(this);
    }

    hide() {
        // Get the root menu (which may contain the onCloseCallback).
        // Note: do this before clearing the stack!
        const rootMenu = this.renderStack.getRoot();
        this.renderStack.clear();
        if (rootMenu && rootMenu.onCloseCallback) {
            wait(100);
            rootMenu.onCloseCallback();
        }
    }

    process(pointer: ReduxMenuPointer) {
        if (this.renderStack.isEmpty()) return;

        Text.UseCommands(true);
        const currentMenu = this.renderStack.peek() || this;
        const pointerPos = pointer.getPosition();
        pointer.update();
        currentMenu.update(pointerPos.x, pointerPos.y);
        pointer.draw();
        currentMenu.draw(pointerPos.x, pointerPos.y);
        Text.UseCommands(false);


    }

    getIsVisible(): boolean {
        return !this.renderStack.isEmpty();
    }

    onClose(callback: () => void) {
        this.onCloseCallback = callback;
    }

}