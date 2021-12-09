/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Donut extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Donut", "./Donut/costumes/Donut.svg", {
        x: 56.47025991747975,
        y: 32.444218073145635
      }),
      new Costume("Donut with Face", "./Donut/costumes/Donut with Face.svg", {
        x: 56.47025991747975,
        y: 32.444218073145635
      })
    ];

    this.sounds = [
      new Sound("Bite", "./Donut/sounds/Bite.wav"),
      new Sound("Chomp", "./Donut/sounds/Chomp.wav"),
      new Sound("Crunch", "./Donut/sounds/Crunch.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2)
    ];

    this.vars.speed = -2;
    this.vars.turnSpeed = 5;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.size = 50;
    yield* this.wait(1);
    while (true) {
      this.createClone();
      yield* this.wait(this.random(0.5, 2));
      yield;
    }
  }

  *startAsClone() {
    this.costume = "Donut";
    this.vars.speed = this.random(-2, -4);
    this.vars.turnSpeed = this.random(-12, 12);
    this.effects.brightness = -15 + this.vars.speed * -8;
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
      this.direction += this.vars.turnSpeed;
      this.y += this.vars.speed;
      this.stage.vars.donutX = this.x;
      this.stage.vars.donutY = this.y;
      this.stage.vars.donutRotation = this.direction;
      this.sprites["DonutsTrail"].createClone();
      if (this.touching(this.sprites["Dino"].andClones())) {
        this.broadcast("Eat");
        this.stage.vars.score += 1;
        this.audioEffects.pitch = this.random(80, 120);
        if (this.random(1, 2) == 1) {
          yield* this.startSound("Crunch");
        } else {
          yield* this.startSound("Chomp");
        }
        for (let i = 0; i < 10; i++) {
          this.size += -5;
          this.effects.ghost += 10;
          yield;
        }
        this.deleteThisClone();
      }
      yield;
    }
    yield* this.startSound("Crunch");
    this.deleteThisClone();
  }

  *startAsClone2() {
    while (true) {
      if (
        Math.hypot(
          this.sprites["Dino"].x - this.x,
          this.sprites["Dino"].y - this.y
        ) < 120
      ) {
        this.costume = "Donut with Face";
      }
      yield;
    }
  }
}
