import { ReduxMenu } from "./ReduxMenu";

export class MenuRenderStack {
    private menuStack: ReduxMenu[] = [];

    public constructor() {}

    push(menu: ReduxMenu) {
        this.menuStack.push(menu);
    }

    pop(): ReduxMenu | undefined {
        return this.menuStack.pop();
    }

    peek(): ReduxMenu | undefined {
        return this.menuStack[this.menuStack.length - 1];
    }

    clear() {
        this.menuStack = [];
    }

    isEmpty(): boolean {
        return this.menuStack.length === 0;
    }

    getRoot(): ReduxMenu | undefined {
        return this.menuStack.length > 0 ? this.menuStack[0] : undefined;
    }
} 