import { AbstractReduxMenuItem } from "../../base/AbstractReduxMenuItem";

export abstract class BaseReduxMenuItemConfig<T extends AbstractReduxMenuItem> {
    constructor(
        public text: string,
        public x?: number,
        public y?: number,
        public width?: number,
        public height?: number,
    ) {}


    abstract create(): T;
}