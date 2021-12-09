/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MakesTheBackgroundDarker extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "costume1",
        "./MakesTheBackgroundDarker/costumes/costume1.svg",
        { x: 256.2265625, y: 204.87109374999997 }
      ),
      new Costume(
        "costume2",
        "./MakesTheBackgroundDarker/costumes/costume2.svg",
        { x: 0, y: 0 }
      )
    ];

    this.sounds = [
      new Sound("pop", "./MakesTheBackgroundDarker/sounds/pop.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.effects.clear();
    this.effects.ghost = 70;
    /* TODO: Implement looks_gotofrontback */ null;
  }
}
