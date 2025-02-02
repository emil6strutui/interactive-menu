import { KeyCode, WeaponType } from "./.config/sa.enums.js";
import { ReduxMenu } from "./menu/ReduxMenu";
import { WeaponModel } from "./utils/enums";


const player = new Player(0);

// Create the main menu
const mainMenu = new ReduxMenu([
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
        ]
    },
], {
    x: 320,
    y: 150,
    itemsPerPage: 5,
    title: "Main Menu",
});

while(true) {
    wait(0);

    if(Pad.IsKeyJustPressed(KeyCode.M)) {
        if(!mainMenu.getIsVisible()) {
            mainMenu.display();
            player.setControl(false);
        } else {
            mainMenu.hide();
            player.setControl(true);
        }
    }

    mainMenu.process();
}

