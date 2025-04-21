import { KeyCode, WeaponType } from "./.config/sa.enums.js";
import { ReduxSimpleMenuItemConfig } from "./menu/items/configs/ReduxSimpleMenuItemConfig";
import { ReduxSliderMenuItemConfig } from "./menu/items/configs/ReduxSliderMenuItemConfig";
import { ReduxSubmenuItemConfig } from "./menu/items/configs/ReduxSubmenuItemConfig";
import { ReduxMenuSystem } from "./menu/ReduxMenuSystem";
import { WeaponModel } from "./utils/enums";

const player = new Player(0);

// Create a slider configuration object.
const ammoSlider: ReduxSliderMenuItemConfig = new ReduxSliderMenuItemConfig(
    "Give Ammo",
    0,
    100,
    10,
    10,
    (value: number) => {
        Streaming.RequestModel(WeaponModel.AK47);
        Streaming.LoadAllModelsNow();
        player.getChar().giveWeapon(WeaponType.Ak47, value);
        Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);
    }
);

const regularItem: ReduxSimpleMenuItemConfig = new ReduxSimpleMenuItemConfig(
    "Add Score",
    () => {
        player.addScore(50);
    }
);

const weaponsMenu: ReduxSubmenuItemConfig = new ReduxSubmenuItemConfig(
    "Weapons menu",
    [
        new ReduxSimpleMenuItemConfig(
            "1. Give AK47",
            () => {
                Streaming.RequestModel(WeaponModel.AK47);
                Streaming.LoadAllModelsNow();
                player.getChar().giveWeapon(WeaponType.Ak47, 100);
                Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);
            }
        ),
        new ReduxSimpleMenuItemConfig(
            "2. Give M4",
            () => {
                Streaming.RequestModel(WeaponModel.M4);
                Streaming.LoadAllModelsNow();
                player.getChar().giveWeapon(WeaponType.M4, 100);
                Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);
            }
        ),
    ],
);

weaponsMenu.submenuX = 300;
weaponsMenu.submenuY = 200;


const mainMenuSystem = new ReduxMenuSystem([
    ammoSlider,
    regularItem,
    weaponsMenu
], {
    x: 300,
    y: 200,
    itemsPerPage: 7,
    scrollBar: false,
    title: "Main Menu",
},
);
//     { 
//         text: "Give 50$ To Playerasdasdasdasdada",
//         action: () => {
//             player.addScore(50);
//         }
//     },
//     { 
//         text: "Weapons menu",
//         submenu: [
//             {
//                 text: "Give AK47",
//                 action: () => {
//                     Streaming.RequestModel(WeaponModel.AK47);
//                     Streaming.LoadAllModelsNow();
//                     player.getChar().giveWeapon(WeaponType.Ak47, 100);
//                     Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);

//                 }
//             },
//             {
//                 text: "Give M4",

//                 action: () => {
//                     Streaming.RequestModel(WeaponModel.M4);
//                     Streaming.LoadAllModelsNow();
//                     player.getChar().giveWeapon(WeaponType.M4, 100);
//                     Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);
//                 }
//             },
//             {
//                 text: "Give AK47",
//                 action: () => {
//                     Streaming.RequestModel(WeaponModel.AK47);
//                     Streaming.LoadAllModelsNow();
//                     player.getChar().giveWeapon(WeaponType.Ak47, 100);
//                     Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);

//                 }
//             },
//             {
//                 text: "Give M4",

//                 action: () => {
//                     Streaming.RequestModel(WeaponModel.M4);
//                     Streaming.LoadAllModelsNow();
//                     player.getChar().giveWeapon(WeaponType.M4, 100);
//                     Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);
//                 }
//             },
//             {
//                 text: "Give AK47",
//                 action: () => {
//                     Streaming.RequestModel(WeaponModel.AK47);
//                     Streaming.LoadAllModelsNow();
//                     player.getChar().giveWeapon(WeaponType.Ak47, 100);
//                     Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);

//                 }
//             },
//             {
//                 text: "Give M4",

//                 action: () => {
//                     Streaming.RequestModel(WeaponModel.M4);
//                     Streaming.LoadAllModelsNow();
//                     player.getChar().giveWeapon(WeaponType.M4, 100);
//                     Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);
//                 }
//             },
//             {
//                 text: "Give AK47",
//                 action: () => {
//                     Streaming.RequestModel(WeaponModel.AK47);
//                     Streaming.LoadAllModelsNow();
//                     player.getChar().giveWeapon(WeaponType.Ak47, 100);
//                     Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);

//                 }
//             },
//             {
//                 text: "Give M4",

//                 action: () => {
//                     Streaming.RequestModel(WeaponModel.M4);
//                     Streaming.LoadAllModelsNow();
//                     player.getChar().giveWeapon(WeaponType.M4, 100);
//                     Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);
//                 }
//             },
//             {
//                 text: "Give AK47",
//                 action: () => {
//                     Streaming.RequestModel(WeaponModel.AK47);
//                     Streaming.LoadAllModelsNow();
//                     player.getChar().giveWeapon(WeaponType.Ak47, 100);
//                     Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);

//                 }
//             },
//             {
//                 text: "Give M4",

//                 action: () => {
//                     Streaming.RequestModel(WeaponModel.M4);
//                     Streaming.LoadAllModelsNow();
//                     player.getChar().giveWeapon(WeaponType.M4, 100);
//                     Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);
//                 }
//             },
//         ]
//     },
// ], new MenuRenderStack(), {
//     x: 120,
//     y: 200,
//     itemsPerPage: 5,
//     title: "Main Menu2",
// }));


mainMenuSystem.getMenu().onClose(() => {
    player.setControl(true);
});

// Main loop
while (true) {
    wait(0);
    
    if (Pad.IsKeyJustPressed(KeyCode.M)) {
        if (!mainMenuSystem.getMenu().getIsVisible()) {
            mainMenuSystem.getMenu().display();
            player.setControl(false);
        } else {
            mainMenuSystem.getMenu().hide();
        }
    }

    mainMenuSystem.getMenu().process(ReduxMenuSystem.getPointer());


}

