/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class DonutsTrail extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Donut", "./DonutsTrail/costumes/Donut.svg", {
        x: 56.47025991747975,
        y: 32.444218073145635
      }),
      new Costume(
        "Donut with Face",
        "./DonutsTrail/costumes/Donut with Face.svg",
        { x: 56.47025991747975, y: 32.444218073145635 }
      )
    ];

    this.sounds = [
      new Sound("Bite", "./DonutsTrail/sounds/Bite.wav"),
      new Sound("Chomp", "./DonutsTrail/sounds/Chomp.wav"),
      new Sound("Crunch", "./DonutsTrail/sounds/Crunch.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2)
    ];

    this.vars.speed3 = 0;
    this.vars.turnSpeed3 = 0;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.size = 50;
    this.effects.clear();
  }

  *startAsClone() {
    this.visible = true;
    this.goto(this.stage.vars.donutX, this.stage.vars.donutY);
    this.direction = this.stage.vars.donutRotation;
    for (let i = 0; i < 10; i++) {
      this.size += -1;
      this.effects.ghost += 10;
      this.effects.brightness = -1;
      yield;
    }
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
