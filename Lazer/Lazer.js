/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Lazer extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Warning Black", "./Lazer/costumes/Warning Black.svg", {
        x: 93.28612412121626,
        y: 73.84442606982253
      }),
      new Costume("Warning White", "./Lazer/costumes/Warning White.svg", {
        x: 93.28613045318062,
        y: 73.84442384362089
      }),
      new Costume("Beam 1", "./Lazer/costumes/Beam 1.svg", {
        x: 51.86247634172338,
        y: 744.3950456606608
      }),
      new Costume("Beam 2", "./Lazer/costumes/Beam 2.svg", {
        x: 93.86247129614966,
        y: 1038.701361966964
      }),
      new Costume("Beam 3", "./Lazer/costumes/Beam 3.svg", {
        x: 96.82042122002554,
        y: 996.1157663813756
      }),
      new Costume("Beam 4", "./Lazer/costumes/Beam 4.svg", {
        x: 114.34593918279663,
        y: 755.9175681831804
      })
    ];

    this.sounds = [new Sound("pop", "./Lazer/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.size = 75;
    this.stage.vars.lane = 0;
    while (true) {
      yield* this.wait(this.random(4, 7));
      this.stage.vars.lane = this.random(1, 3);
      if (this.stage.vars.lane == 1) {
        yield* this.animateIn(-125, -172);
        yield* this.wait(0.1);
        yield* this.animateOut();
        this.goto(-125, -172);
      }
      if (this.stage.vars.lane == 2) {
        yield* this.animateIn(0, -172);
        yield* this.wait(0.1);
        yield* this.animateOut();
      }
      if (this.stage.vars.lane == 3) {
        yield* this.animateIn(125, -172);
        yield* this.wait(0.1);
        yield* this.animateOut();
      }
      yield;
    }
  }

  *animateIn(x, y) {
    this.visible = true;
    this.goto(x, 20);
    this.size = 50;
    this.costume = "Warning Black";
    yield* this.wait(0.2);
    this.costume = "Warning White";
    yield* this.wait(0.2);
    this.costume = "Warning Black";
    yield* this.wait(0.2);
    this.costume = "Warning White";
    yield* this.wait(0.2);
    this.costume = "Warning Black";
    yield* this.wait(0.2);
    this.costume = "Warning White";
    yield* this.wait(0.2);
    this.costume = "Warning Black";
    yield* this.wait(0.1);
    this.costume = "Warning White";
    yield* this.wait(0.1);
    this.costume = "Warning Black";
    yield* this.wait(0.1);
    this.costume = "Warning White";
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      yield;
    }
    this.goto(x, y + 200);
    this.size = 50;
    this.costume = "Beam 1";
    for (let i = 0; i < 40; i++) {
      this.effects.ghost += -2.5;
      this.y += -5;
      yield;
    }
    yield* this.wait(0.1);
    this.costume = "Beam 2";
    yield* this.wait(0.1);
    this.costume = "Beam 3";
    yield* this.wait(0.1);
    this.costume = "Beam 4";
    yield* this.wait(0.1);
    this.costume = "Beam 3";
    yield* this.wait(0.1);
    this.costume = "Beam 4";
    yield* this.wait(0.1);
    this.costume = "Beam 3";
  }

  *animateOut() {
    this.costume = "Beam 3";
    yield* this.wait(0.1);
    this.costume = "Beam 2";
    yield* this.wait(0.1);
    this.costume = "Beam 1";
    yield* this.wait(0.1);
    this.visible = false;
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.touching(this.sprites["Dino"].andClones())) {
        yield* this.wait(0.3);
        if (this.touching(this.sprites["Dino"].andClones())) {
          this.stage.vars.livesLeft += -2;
          this.broadcast("Eat");
          this.visible = false;
        }
      }
      yield;
    }
  }
}
