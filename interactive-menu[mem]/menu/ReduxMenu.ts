import { KeyCode } from "../.config/sa.enums.js";
import { ReduxMenuItem } from "./ReduxMenuItem";
import { ReduxMenuConfig, ReduxMenuItemConfig } from "./ReduxMenuTypes.js";
import { ReduxMenuPointer } from "./ReduxMenuPointer";


export class ReduxMenu {
    private items: ReduxMenuItem[] = [];
    private selectedIndex: number = -1;
    private currentPage: number = 0;
    private itemsPerPage: number = 3;
    private totalPages: number = 0;
    private lastClickTime: number = 0;
    private clickCooldown: number = 50;
    private activeSubmenu: ReduxMenu | null = null;
    private parentMenu: ReduxMenu | null = null;
    private title: string;
    private x: number;
    private y: number;
    private width: number = 200;
    private height: number = 30;
    private pointerX: number;
    private pointerY: number;
    private pointer: ReduxMenuPointer;
    private isVisible: boolean = false;


    constructor(menuItems: ReduxMenuItemConfig[], config?: ReduxMenuConfig, parentMenu: ReduxMenu | null = null) {
        this.x = config?.x ?? 220;
        this.y = config?.y ?? 150;
        this.itemsPerPage = config?.itemsPerPage ?? 3;
        this.title = config?.title ?? "Main Menu";
        this.width = config?.width ?? 200;
        this.height = config?.height ?? 30;
        this.parentMenu = parentMenu;
    
        let configItems = menuItems;
        
        if (parentMenu) {
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
                menuItem.submenu = new ReduxMenu(item.submenu, {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height,
                    itemsPerPage: this.itemsPerPage,
                    title: item.text
                }, this);
            }
            
            this.items.push(menuItem);
        });

        this.pointer = new ReduxMenuPointer();
    }

    private navigateBack() {
        wait(10);
        if (this.parentMenu) {
            this.parentMenu.activeSubmenu = null;
        }
    }

    update(pointerX: number, pointerY: number) {
        if (this.activeSubmenu) {
            this.activeSubmenu.update(pointerX, pointerY);
            return;
        }

        this.pointerX = pointerX;
        this.pointerY = pointerY;

        
        this.selectedIndex = -1;
        const startIdx = this.currentPage * this.itemsPerPage;
        const endIdx = Math.min(startIdx + this.itemsPerPage, this.items.length);

        if (!this.activeSubmenu) {
            if (Pad.IsKeyJustPressed(KeyCode.Left) && this.currentPage > 0) {
                this.currentPage--;
                this.updateItemPositions();
            }
            if (Pad.IsKeyJustPressed(KeyCode.Right) && this.currentPage < this.totalPages - 1) {
                this.currentPage++;
                this.updateItemPositions();
            }
        }

        // Check hover states only for visible items
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

    draw() {
        if (this.activeSubmenu) {
            this.activeSubmenu.draw();
            return;
        }
        
        const menuHeight = this.calculateMenuHeight();
        const menuWidth = 250;
        const { x: menuX, y: menuY } = this.getBoundedMenuPosition(menuHeight);
        
        // Draw menu background
        Hud.DrawRect(menuX, menuY, menuWidth, menuHeight, 100, 149, 237, 100);
        
        // Draw title at the top of the menu
        Text.SetColor(255, 255, 255, 255);
        Text.SetScale(0.7, 2.4);
        Text.SetWrapX(500.0);
        Text.DisplayFormatted(
            menuX - 100, 
            menuY - menuHeight/2 + 20,
            this.title
        );
        
        // Update item positions based on bounded menu position
        const startIdx = this.currentPage * this.itemsPerPage;
        const endIdx = Math.min(startIdx + this.itemsPerPage, this.items.length);
        
        for (let i = startIdx; i < endIdx; i++) {
            const relativeIndex = i - startIdx;
            this.items[i].y = menuY - menuHeight/2 + 60 + (relativeIndex * 40);
            this.items[i].draw(i === this.selectedIndex);
        }

        if (this.totalPages > 1) {
            this.drawPagination(menuY + menuHeight/2 - 30);
        }
    }

    private drawPagination(paginationY: number) {
        if (this.activeSubmenu) {
            return;
        }

        const prevX = this.x - 120;
        const nextX = this.x + 60;
        const centerX = this.x;
        
        Text.SetColor(255, 255, 255, 255);
        Text.SetScale(0.3, 0.8);
        Text.DisplayFormatted(centerX, paginationY, `Page ${this.currentPage + 1}/${this.totalPages}`);
        
        const currentTime = Date.now();
        const canClick = currentTime - this.lastClickTime >= this.clickCooldown;

        if (this.currentPage > 0) {
            const isPrevHovered = this.isPointInRect(this.pointerX, this.pointerY, prevX, paginationY - 5, 60, 20);
            Text.SetColor(255, 255, 255, isPrevHovered ? 255 : 180);
            Text.SetWrapX(500.0);
            Text.DisplayFormatted(prevX, paginationY, "< Prev");
            

            if (isPrevHovered && Pad.IsKeyJustPressed(KeyCode.LeftButton) && canClick) {
                this.currentPage--;
                this.updateItemPositions();
                this.lastClickTime = currentTime;
            }
        }

        if (this.currentPage < this.totalPages - 1) {
            const isNextHovered = this.isPointInRect(this.pointerX, this.pointerY, nextX, paginationY - 5, 60, 20);
            Text.SetColor(255, 255, 255, isNextHovered ? 255 : 180);
            Text.SetWrapX(500.0);
            Text.DisplayFormatted(nextX, paginationY, "Next >");
            
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
            const submenu = item.submenu;
            
            if (this.activeSubmenu) {
                this.activeSubmenu = null;
            }
            
            this.activeSubmenu = submenu;
            return;
        } else {
            item.execute();
        }
    }

    display() {
        if (!this.isVisible) {
            Txd.LoadDictionary("utils");
            Txd.LoadSprite(1, "mouse");
            this.isVisible = true;
        }
    }

    hide() {
        if (this.isVisible) {
            Txd.Remove();
            this.isVisible = false;
        }
    }

    process() {
        if (!this.isVisible) return;

        Text.UseCommands(true);
        const pointerPos = this.pointer.getPosition();
        this.pointer.update();
        this.update(pointerPos.x, pointerPos.y);
        this.draw();
        this.pointer.draw();
        Text.UseCommands(false);
    }

    getIsVisible() {
        return this.isVisible;
    }
}