/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Balloon extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("balloon1-a", "./Balloon/costumes/balloon1-a.svg", {
        x: 32,
        y: 94
      }),
      new Costume("balloon1-b", "./Balloon/costumes/balloon1-b.svg", {
        x: 31,
        y: 94
      }),
      new Costume("balloon1-c", "./Balloon/costumes/balloon1-c.svg", {
        x: 31,
        y: 94
      })
    ];

    this.sounds = [
      new Sound("Triumph", "./Balloon/sounds/Triumph.wav"),
      new Sound("Win", "./Balloon/sounds/Win.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.speed2 = 5;
    this.vars.turnSpeed2 = 3;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    while (true) {
      if (this.stage.vars.score > 30 && this.stage.vars.score < 35) {
        yield* this.startSound("Win");
        for (let i = 0; i < 10; i++) {
          for (let i = 0; i < this.random(3, 5); i++) {
            this.createClone();
            yield;
          }
          yield* this.wait(0.2);
          yield;
        }
      }
      yield;
    }
  }

  *startAsClone() {
    this.costume = "balloon1-a";
    this.vars.speed2 = this.random(4, 6);
    this.goto(this.random(-220, 220), -180);
    this.direction = this.random(80, 100);
    this.effects.ghost = 100;
    this.size = this.random(-30, 30);
    this.effects.color = this.random(0, 255);
    this.effects.brightness = this.random(-20, 20);
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      this.size += 5;
      this.effects.ghost += -9;
      yield;
    }
    while (!(this.y > 155)) {
      this.y += this.vars.speed2;
      this.x += this.random(-3, 3);
      yield;
    }
    for (let i = 0; i < 10; i++) {
      this.size += -5;
      this.effects.ghost += 9;
      yield;
    }
    this.deleteThisClone();
  }
}
