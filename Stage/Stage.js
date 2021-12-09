/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180
      }),
      new Costume("Jurassic", "./Stage/costumes/Jurassic.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("Eggs", "./Stage/sounds/Eggs.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3)
    ];

    this.vars.h = 3;
    this.vars.eat = 0;
    this.vars.livesLeft = 3;
    this.vars.movingRight = 0;
    this.vars.movingLeft = 0;
    this.vars.score = 2;
    this.vars.HighScore = 69;
    this.vars.donutX = 114;
    this.vars.donutY = 132;
    this.vars.donutRotation = 37;
    this.vars.dead = 0;
    this.vars.lane = 1;
  }

  *whengreaterthan() {
    if (this.vars.dead == 0) {
      this.broadcast("END");
      if (this.vars.score > this.vars.HighScore) {
        this.vars.HighScore = this.vars.score;
      }
    } else {
      this.broadcast("END GAME");
    }
  }

  *whenGreenFlagClicked() {
    this.vars.dead = 0;
    while (true) {
      if (this.vars.livesLeft < 1 || this.vars.score < 0) {
        if (this.vars.score > this.vars.HighScore) {
          this.vars.HighScore = this.vars.score;
        }
        this.vars.dead = 1;
        this.broadcast("Eat");
        /* TODO: Implement stop all */ null;
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      this.restartTimer();
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    while (true) {
      yield* this.playSoundUntilDone("Eggs");
      this.audioEffects.pitch = this.random(60, 100);
      yield;
    }
  }
}
