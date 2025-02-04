import { KeyCode, WeaponType } from "./.config/sa.enums.js";
import { MenuSystem } from "./menu/ReduxMenuSystem";
import { WeaponModel } from "./utils/enums";
import { SliderReduxMenuItemConfig } from "./menu/SliderReduxMenuItem";

const player = new Player(0);

// Create a slider configuration object.
const ammoSlider: SliderReduxMenuItemConfig = {
    text: "Give Ammo",
    min: 0,
    max: 200,
    step: 10,
    initial: 100,
    sliderAction: (value: float) => {
        Streaming.RequestModel(WeaponModel.AK47);
        Streaming.LoadAllModelsNow();
        player.getChar().giveWeapon(WeaponType.Ak47, value);
        Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);
    }
};

const regularItem = {
    text: "Add Score",
    action: () => {
        player.addScore(50);
    },
};

const mainMenuSystem = new MenuSystem([
    // ammoSlider,
    regularItem,
    { 
        text: "Weapons menu",
        submenu: [
            {
                text: "1. Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);
                }
            },
            {
                text: "2. Give M4",
                action: () => {
                    Streaming.RequestModel(WeaponModel.M4);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.M4, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);

                }
            },
            {
                text: "3. Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);

                }
            },
            {
                text: "4. Give M4",
                action: () => {
                    Streaming.RequestModel(WeaponModel.M4);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.M4, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);

                }
            },
            {
                text: "5. Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);
                }

            },
            {
                text: "6. Give M4",
                action: () => {
                    Streaming.RequestModel(WeaponModel.M4);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.M4, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);


                }
            },
            {
                text: "7. Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);

                }
            },
            {
                text: "8. Give M4",
                action: () => {
                    Streaming.RequestModel(WeaponModel.M4);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.M4, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);

                }
            },
            {
                text: "9. Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);

                }
            },
            {
                text: "10. Give M4",
                action: () => {
                    Streaming.RequestModel(WeaponModel.M4);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.M4, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);

                }
            },
            {
                text: "11. Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);

                }
            },
            {
                text: "12. Give M4",
                action: () => {
                    Streaming.RequestModel(WeaponModel.M4);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.M4, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);


                }
            },
            {
                text: "13. Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);


                }
            },
            {
                text: "14. Give M4",
                action: () => {
                    Streaming.RequestModel(WeaponModel.M4);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.M4, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);


                }
            },
            {
                text: "15. Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);

                }

            },
            {
                text: "16. Give M4",
                action: () => {
                    Streaming.RequestModel(WeaponModel.M4);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.M4, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);



                }
            },
            {
                text: "17. Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);


                }
            },
            {
                text: "18. Give M4",
                action: () => {
                    Streaming.RequestModel(WeaponModel.M4);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.M4, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.M4);


                }
            },
            {
                text: "19. Give AK47",
                action: () => {
                    Streaming.RequestModel(WeaponModel.AK47);
                    Streaming.LoadAllModelsNow();
                    player.getChar().giveWeapon(WeaponType.Ak47, 100);
                    Streaming.MarkModelAsNoLongerNeeded(WeaponModel.AK47);



                }
            },
            {
                text: "20. Give M4",
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
    itemsPerPage: 7,
    scrollBar: false,
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

