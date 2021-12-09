/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Bomb extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Bomb", "./Bomb/costumes/Bomb.svg", { x: 102.5, y: 102.5 }),
      new Costume("Donut2", "./Bomb/costumes/Donut2.svg", {
        x: 182.8624686944658,
        y: 124.3066775095225
      })
    ];

    this.sounds = [
      new Sound("Bite", "./Bomb/sounds/Bite.wav"),
      new Sound("Chomp", "./Bomb/sounds/Chomp.wav"),
      new Sound("Crunch", "./Bomb/sounds/Crunch.wav"),
      new Sound("Boom Cloud", "./Bomb/sounds/Boom Cloud.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.speed4 = -2;
    this.vars.turnSpeed4 = 0;
    this.vars.dir2 = 1;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.size = 75;
    while (true) {
      yield* this.wait(this.random(4, 6));
      this.createClone();
      yield;
    }
  }

  *startAsClone() {
    this.costume = "Bomb";
    this.vars.speed4 = this.random(-2, -4);
    this.vars.turnSpeed4 = (this.random(-5, 4) + 1) * 3;
    this.vars.dir2 = this.random(1, 0);
    this.effects.brightness = -15 + this.vars.speed4 * -6;
    this.goto(this.random(-220, 220), 170);
    this.direction = this.random(1, 360);
    this.effects.ghost = 100;
    this.size = 0;
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      this.size += 5;
      this.effects.ghost += -10;
      yield;
    }
    while (!(this.y < -170)) {
      this.direction += this.vars.turnSpeed4;
      this.y += this.vars.speed4;
      if (
        this.touching(this.sprites[undefined].andClones()) ||
        this.touching(this.sprites["Donut"].andClones()) ||
        this.touching(this.sprites["Lazer"].andClones())
      ) {
        if (this.vars.dir2 == 1) {
          this.vars.dir2 = 0;
          this.x += -4;
        } else {
          this.vars.dir2 = 1;
          this.x += 4;
        }
      }
      if (this.vars.dir2 == 1) {
        this.x += this.random(0.1, 3);
      } else {
        this.x += this.random(-0.1, -3);
      }
      if (this.touching(this.sprites["Dino"].andClones())) {
        this.stage.vars.livesLeft += -1;
        this.stage.vars.score += -5;
        this.audioEffects.pitch = this.random(80, 120);
        yield* this.startSound("Boom Cloud");
        this.broadcast("Eat");
        for (let i = 0; i < 10; i++) {
          this.size += -5;
          this.effects.ghost += 10;
          yield;
        }
        this.deleteThisClone();
      }
      yield;
    }
    this.stage.vars.livesLeft += 0.5;
    this.deleteThisClone();
  }
}
