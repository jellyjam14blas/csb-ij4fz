/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Thumbnail extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Thumbnail", "./Thumbnail/costumes/Thumbnail.svg", {
        x: 562.3867187499995,
        y: 438.064453125
      }),
      new Costume("Thumbnail2", "./Thumbnail/costumes/Thumbnail2.svg", {
        x: 562.38672,
        y: 438.06444999999997
      })
    ];

    this.sounds = [new Sound("pop", "./Thumbnail/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }
}
