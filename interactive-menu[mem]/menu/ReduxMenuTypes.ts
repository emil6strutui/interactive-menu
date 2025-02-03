export type ReduxMenuAction = () => void;

export interface ReduxMenuItemConfig {
    text: string;
    action?: ReduxMenuAction;
    submenu?: ReduxMenuItemConfig[];
}

export interface ReduxMenuConfig {
    x?: number;
    y?: number;
    itemsPerPage?: number;
    scrollBar?: boolean;
    title?: string;
    width?: number;
    height?: number;
}