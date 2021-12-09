/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class FadeToWhite extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./FadeToWhite/costumes/costume1.svg", {
        x: 289.9999999999998,
        y: 231.5
      })
    ];

    this.sounds = [new Sound("pop", "./FadeToWhite/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "END GAME" },
        this.whenIReceiveEndGame
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.direction = 90;
    this.effects.clear();
    this.visible = false;
  }

  *whenIReceiveEndGame() {
    this.effects.ghost = 100;
    this.visible = true;
    /* TODO: Implement looks_gotofrontback */ null;
    this.costume = "Game Over";
    yield* this.startSound("Lose");
    yield* this.wait(0.1);
    while (true) {
      this.effects.ghost += -1;
      this.direction = 90 + Math.sin(this.scratchToRad(this.timer * 100)) * 5;
      this.size = 90 + Math.sin(this.scratchToRad(this.timer * 200)) * 2;
      yield;
    }
  }
}
