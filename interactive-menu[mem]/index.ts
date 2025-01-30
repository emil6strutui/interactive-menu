import { KeyCode } from "./.config/sa.enums.js";
import { ReduxMenu } from "./menu/ReduxMenu";
import { ReduxMenuPointer } from "./menu/ReduxMenuPointer";


const player = new Player(0);
let playerControl = true;
let visibleMenu = false;

// Create the main menu
const mainMenu = new ReduxMenu([
    { 
        text: "Start Game",
        action: () => {
            Text.PrintStringNow("Starting game...", 1000);
            player.setControl(true);
        }
    },
    { 
        text: "Options",
        submenu: [
            {
                text: "Graphics",
                submenu: [
                    { text: "Resolution", action: () => Text.PrintStringNow("Changing resolution...", 1000) },
                    { text: "Quality", action: () => Text.PrintStringNow("Adjusting quality...", 1000) },
                ]
            },
            {
                text: "Audio",
                submenu: [
                    { text: "Music Volume", action: () => Text.PrintStringNow("Adjusting music...", 1000) },
                    { text: "SFX Volume", action: () => Text.PrintStringNow("Adjusting SFX...", 1000) },
                ]
            },
            {
                text: "Audio",
                submenu: [
                    { text: "Music Volume", action: () => Text.PrintStringNow("Adjusting music...", 1000) },
                    { text: "SFX Volume", action: () => Text.PrintStringNow("Adjusting SFX...", 1000) },
                ]
            },
            {
                text: "Audio",
                submenu: [
                    { text: "Music Volume", action: () => Text.PrintStringNow("Adjusting music...", 1000) },
                    { text: "SFX Volume", action: () => Text.PrintStringNow("Adjusting SFX...", 1000) },
                ]
            },
            {
                text: "Audio",
                submenu: [
                    { text: "Music Volume", action: () => Text.PrintStringNow("Adjusting music...", 1000) },
                    { text: "SFX Volume", action: () => Text.PrintStringNow("Adjusting SFX...", 1000) },
                ]
            },
            {
                text: "Audio",
                submenu: [
                    { text: "Music Volume", action: () => Text.PrintStringNow("Adjusting music...", 1000) },
                    { text: "SFX Volume", action: () => Text.PrintStringNow("Adjusting SFX...", 1000) },
                ]
            },
            { 
                text: "Controls",
                action: () => Text.PrintStringNow("Opening control settings...", 1000)
            }
        ]
    },
    { 
        text: "Credits",
        action: () => Text.PrintStringNow("Showing credits...", 1000)
    },
    { 
        text: "Exit",
        action: () => Text.PrintStringNow("Exiting game...", 1000)
    }
], {
    x: 320,
    y: 150,
    itemsPerPage: 5,
    title: "Main Menu",
});

const menuPointer = new ReduxMenuPointer();

while(true) {
    wait(0);

    if(Pad.IsKeyJustPressed(KeyCode.LeftShift)) {
        playerControl = !playerControl;
        player.setControl(playerControl);
    }

    if(Pad.IsKeyJustPressed(KeyCode.M)) {
        visibleMenu = !visibleMenu;
    }

    if(visibleMenu) {
        const pointerPos = menuPointer.getPosition();
        menuPointer.update();
        mainMenu.update(pointerPos.x, pointerPos.y);
        mainMenu.draw();
        menuPointer.draw();

    }
}

