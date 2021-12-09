/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Dino extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Dino Stand Right", "./Dino/costumes/Dino Stand Right.svg", {
        x: 59.269778207803654,
        y: 72.172464205475
      }),
      new Costume("Dino Stand Left", "./Dino/costumes/Dino Stand Left.svg", {
        x: 59.269778207803654,
        y: 72.172464205475
      }),
      new Costume("Dino Walk Right", "./Dino/costumes/Dino Walk Right.svg", {
        x: 74.24325162330848,
        y: 71.82622112948474
      }),
      new Costume("Dino Walk Left", "./Dino/costumes/Dino Walk Left.svg", {
        x: 76.18298448687847,
        y: 71.82622338845414
      }),
      new Costume("Dino Eat Right", "./Dino/costumes/Dino Eat Right.svg", {
        x: 76.85626736129419,
        y: 112.04936428454837
      }),
      new Costume("Dino Eat Left", "./Dino/costumes/Dino Eat Left.svg", {
        x: 76.85626736129413,
        y: 112.04936914718333
      })
    ];

    this.sounds = [new Sound("Meow", "./Dino/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.BROADCAST, { name: "Walk" }, this.whenIReceiveWalk),
      new Trigger(Trigger.BROADCAST, { name: "Eat" }, this.whenIReceiveEat)
    ];

    this.vars.dinosSpeed = 8;
    this.vars.dir = "Left";
    this.vars.colorEffect = 205;
  }

  *whenGreenFlagClicked() {
    yield* this.resetDino();
    while (true) {
      this.clearPen();
      yield* this.drawOutline();
      yield;
    }
  }

  *drawOutline() {
    this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
    this.effects.brightness = 0;
    this.direction = 90;
    for (let i = 0; i < 8; i++) {
      this.direction += 45;
      this.move(5);
      this.stamp();
      this.move(-5);
    }
    this.effects.brightness = 14;
    this.direction = 90;
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.keyPressed("right arrow")) {
        this.x += this.vars.dinosSpeed;
        this.vars.dir = "Right";
        this.stage.vars.movingRight = 1;
        this.clearPen();
        yield* this.drawOutline();
        this.broadcast("Walk");
      } else {
        this.stage.vars.movingRight = 0;
      }
      if (this.keyPressed("left arrow")) {
        this.x += this.vars.dinosSpeed * -1;
        this.vars.dir = "Left";
        this.stage.vars.movingLeft = 1;
        this.clearPen();
        yield* this.drawOutline();
        this.broadcast("Walk");
      } else {
        this.stage.vars.movingLeft = 0;
      }
      yield;
    }
  }

  *animateWalk() {
    this.stage.vars.h += 1;
    if (this.stage.vars.h > 4 && this.stage.vars.eat == 0) {
      this.stage.vars.h = 0;
      if (this.vars.dir == "Right") {
        if (this.keyPressed("right arrow")) {
          if (this.costume.name == "Dino Stand Right") {
            this.costume = "Dino Walk Right";
            yield* this.wait(0.2);
          } else {
            this.costume = "Dino Stand Right";
            yield* this.wait(0.1);
          }
        } else {
          this.costume = "Dino Stand Right";
          yield* this.wait(0.1);
        }
        this.costume = "Dino Stand Right";
      }
      if (this.vars.dir == "Left") {
        if (this.keyPressed("left arrow")) {
          if (this.costume.name == "Dino Stand Left") {
            this.costume = "Dino Walk Left";
            yield* this.wait(0.2);
          } else {
            this.costume = "Dino Stand Left";
            yield* this.wait(0.1);
          }
        } else {
          this.costume = "Dino Stand Left";
          yield* this.wait(0.1);
        }
        this.costume = "Dino Stand Left";
      }
    }
  }

  *whenIReceiveWalk() {
    yield* this.animateWalk();
  }

  *whenIReceiveEat() {
    this.effects.color = this.vars.colorEffect;
    this.stage.vars.eat = 1;
    if (this.vars.dir == "Right") {
      this.costume = "Dino Eat Right";
      yield* this.wait(0.2);
      this.costume = "Dino Stand Right";
    }
    if (this.vars.dir == "Left") {
      this.costume = "Dino Eat Left";
      yield* this.wait(0.2);
      this.costume = "Dino Stand Left";
    }
    this.stage.vars.eat = 0;
  }

  *resetDino() {
    this.goto(0, -100);
    this.vars.dinosSpeed = 8;
    this.vars.dir = "Right";
    this.stage.vars.h = 0;
    this.stage.vars.eat = 0;
    this.stage.vars.livesLeft = 3;
    this.stage.vars.movingRight = 0;
    this.stage.vars.movingLeft = 0;
    this.stage.vars.score = 0;
    this.costume = "Dino Stand Right";
    this.size = 80;
    this.effects.clear();
    this.effects.brightness = 14;
    this.effects.pixelate = 30;
    this.vars.colorEffect = this.random(0, 255);
    this.effects.color = this.vars.colorEffect;
    /* TODO: Implement looks_gotofrontback */ null;
  }
}
