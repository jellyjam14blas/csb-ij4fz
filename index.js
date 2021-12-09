import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Dino from "./Dino/Dino.js";
import Donut from "./Donut/Donut.js";
import DinoTrail from "./DinoTrail/DinoTrail.js";
import Balloon from "./Balloon/Balloon.js";
import MakesTheBackgroundDarker from "./MakesTheBackgroundDarker/MakesTheBackgroundDarker.js";
import GameOverScreen from "./GameOverScreen/GameOverScreen.js";
import Thumbnail from "./Thumbnail/Thumbnail.js";
import DonutsTrail from "./DonutsTrail/DonutsTrail.js";
import AtmosphereParticles from "./AtmosphereParticles/AtmosphereParticles.js";
import Bomb from "./Bomb/Bomb.js";
import Lazer from "./Lazer/Lazer.js";
import FadeToWhite from "./FadeToWhite/FadeToWhite.js";

const stage = new Stage({ costumeNumber: 2 });

const sprites = {
  Dino: new Dino({
    x: 0,
    y: -100,
    direction: 90,
    costumeNumber: 6,
    size: 80,
    visible: true
  }),
  Donut: new Donut({
    x: -91,
    y: -172,
    direction: 163,
    costumeNumber: 1,
    size: 50,
    visible: false
  }),
  DinoTrail: new DinoTrail({
    x: 0,
    y: -100,
    direction: 77,
    costumeNumber: 1,
    size: 75,
    visible: false
  }),
  Balloon: new Balloon({
    x: -180,
    y: 175,
    direction: 154,
    costumeNumber: 3,
    size: 56.64643676407696,
    visible: false
  }),
  MakesTheBackgroundDarker: new MakesTheBackgroundDarker({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  GameOverScreen: new GameOverScreen({
    x: 0,
    y: 0,
    direction: 85.083725462,
    costumeNumber: 2,
    size: 90.716735899,
    visible: true
  }),
  Thumbnail: new Thumbnail({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: false
  }),
  DonutsTrail: new DonutsTrail({
    x: -22.329633321669064,
    y: 9.32540356581394,
    direction: 90,
    costumeNumber: 2,
    size: 50,
    visible: false
  }),
  AtmosphereParticles: new AtmosphereParticles({
    x: -23,
    y: 105,
    direction: 77,
    costumeNumber: 1,
    size: 50,
    visible: false
  }),
  Bomb: new Bomb({
    x: 93,
    y: 170,
    direction: -154,
    costumeNumber: 1,
    size: 75,
    visible: false
  }),
  Lazer: new Lazer({
    x: -125,
    y: 20,
    direction: 90,
    costumeNumber: 1,
    size: 50,
    visible: true
  }),
  FadeToWhite: new FadeToWhite({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 88.0354254986,
    visible: false
  })
};

const project = new Project(stage, sprites);
export default project;
