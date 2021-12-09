/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class GameOverScreen extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Game Over", "./GameOverScreen/costumes/Game Over.svg", {
        x: 356.99999999999983,
        y: 221.87107500000005
      }),
      new Costume(
        "Don't Forget",
        "./GameOverScreen/costumes/Don't Forget.svg",
        { x: 356.88671999999997, y: 273.5 }
      ),
      new Costume("costume1", "./GameOverScreen/costumes/costume1.svg", {
        x: 90.41807257359582,
        y: 25.33033735485995
      })
    ];

    this.sounds = [
      new Sound("pop", "./GameOverScreen/sounds/pop.wav"),
      new Sound("Lose", "./GameOverScreen/sounds/Lose.wav"),
      new Sound(
        "Dance Chill Out",
        "./GameOverScreen/sounds/Dance Chill Out.wav"
      )
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "END GAME" },
        this.whenIReceiveEndGame
      ),
      new Trigger(Trigger.BROADCAST, { name: "END" }, this.whenIReceiveEnd)
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
    this.costume = "Game Over";
    yield* this.startSound("Lose");
    yield* this.wait(2);
    /* TODO: Implement looks_gotofrontback */ null;
    while (true) {
      this.effects.ghost += -10;
      this.direction = 90 + Math.sin(this.scratchToRad(this.timer * 100)) * 5;
      this.size = 90 + Math.sin(this.scratchToRad(this.timer * 200)) * 2;
      yield;
    }
  }

  *whenIReceiveEnd() {
    this.visible = true;
    /* TODO: Implement looks_gotofrontback */ null;
    this.costume = "Don't Forget";
    yield* this.startSound("Dance Chill Out");
    while (true) {
      this.direction = 90 + Math.sin(this.scratchToRad(this.timer * 100)) * 5;
      this.size = 90 + Math.sin(this.scratchToRad(this.timer * 200)) * 2;
      yield;
    }
  }
}
