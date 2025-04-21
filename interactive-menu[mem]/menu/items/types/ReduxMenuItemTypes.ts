export interface ReduxMenuConfig {
    x?: number;
    y?: number;
    itemsPerPage?: number;
    scrollBar?: boolean;
    title?: string;
    width?: number;
    height?: number;
}

export type SliderReduxMenuItemAction = (value: number) => void;