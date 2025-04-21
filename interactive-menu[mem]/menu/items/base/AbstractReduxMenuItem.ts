export abstract class AbstractReduxMenuItem {

    constructor(
        public text: string,
        public x: number,
        public y: number,
        public width: number = 200,
        public height: number = 30,
    ) {}

    isHovered(pointerX: number, pointerY: number): boolean {
        return pointerX >= this.x && 
               pointerX <= this.x + this.width + 8 && 
               pointerY >= this.y && 
               pointerY <= this.y + this.height + 7;
    }

    abstract execute(): void;
    abstract draw(isHovered: boolean): void;
}
