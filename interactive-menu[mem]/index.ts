import { KeyCode, WeaponType } from "./.config/sa.enums.js";
import { MenuSystem } from "./menu/ReduxMenuSystem";
import { WeaponModel } from "./utils/enums";

const player = new Player(0);

const mainMenuSystem = new MenuSystem([
    { 
        text: "Give 50$ To Playerasdasdasdasdada",
        action: () => {
            player.addScore(50);
        }
    },
    { 
        text: "Weapons menu",
        submenu: [
            {
                text: "Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);
                }
            },
            {
                text: "Give M4",
                action: () => {
                    Streaming.RequestModel(WeaponModel.M4);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.M4, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);
                }
            },
            {
                text: "Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);
                }
            },
            {
                text: "Give M4",
                action: () => {
                    Streaming.RequestModel(WeaponModel.M4);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.M4, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);
                }
            },
            {
                text: "Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);
                }
            },
            {
                text: "Give M4",
                action: () => {
                    Streaming.RequestModel(WeaponModel.M4);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.M4, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);
                }
            },
            {
                text: "Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);
                }
            },
            {
                text: "Give M4",
                action: () => {
                    Streaming.RequestModel(WeaponModel.M4);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.M4, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);
                }
            },
            {
                text: "Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);
                }
            },
            {
                text: "Give M4",
                action: () => {
                    Streaming.RequestModel(WeaponModel.M4);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.M4, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);
                }
            },
        ]
    },
], {
    x: 300,
    y: 200,
    itemsPerPage: 5,
    title: "Main Menu",
});



// const mainMenuSystem2 = new MenuSystem(new ReduxMenu([
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

        // if(!mainMenuSystem2.getMenu().getIsVisible()) {
        //     mainMenuSystem2.getMenu().display();
        //     player.setControl(false);
        // } else {
        //     mainMenuSystem2.getMenu().hide();
        // }
    }

    mainMenuSystem.getMenu().process(MenuSystem.getPointer());
    // mainMenuSystem2.getMenu().process(MenuSystem.getPointer());

}

