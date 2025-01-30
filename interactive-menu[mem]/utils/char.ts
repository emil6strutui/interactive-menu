export class ReduxChar {
    private char: Char;
    
    constructor(pedType: number, model: number, x: number, y: number, z: number) {
        Streaming.RequestModel(model);
        Streaming.LoadAllModelsNow();

        const char = Char.Create(pedType, model, x, y, z);

        Streaming.MarkModelAsNoLongerNeeded(model);

        this.char = char;
    }

    public getChar() {
        return this.char;
    }
}

