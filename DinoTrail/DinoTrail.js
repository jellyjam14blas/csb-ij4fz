/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class DinoTrail extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Trail", "./DinoTrail/costumes/Trail.svg", {
        x: 11.333333930732152,
        y: -48.499999470316624
      })
    ];

    this.sounds = [new Sound("Footstep", "./DinoTrail/sounds/Footstep.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.size = 75;
    this.effects.clear();
    this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
    while (true) {
      this.goto(this.sprites["Dino"].x, this.sprites["Dino"].y);
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    this.effects.brightness = this.random(2, -30);
    if (this.stage.vars.movingRight == 1) {
      this.direction = 90;
    }
    if (this.stage.vars.movingLeft == 1) {
      this.direction = -90;
    }
    this.direction += this.random(-30, 30);
    for (let i = 0; i < 20; i++) {
      this.move(2);
      this.effects.ghost += 5;
      yield;
    }
    this.deleteThisClone();
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.stage.vars.movingRight == 1 || this.stage.vars.movingLeft == 1) {
        if (this.random(1, 3) == 1) {
          for (let i = 0; i < this.random(1, 2); i++) {
            this.audioEffects.pitch = this.random(80, 120);
            yield* this.startSound("Footstep");
            this.createClone();
            yield;
          }
        }
      }
      yield;
    }
  }
}
