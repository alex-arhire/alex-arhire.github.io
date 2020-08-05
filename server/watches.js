const Chance = require("chance");
const express = require("express");

const watchesRoutes = express.Router();
const chance = new Chance();

const generateColor = () =>
  chance.color({ format: "hex" }).replace("#", "").toUpperCase();

const watches = Array.from({ length: 25 }, (_, i) => {
  const name = chance.pickone([
    "Rolex",
    "Vacheron Constantin",
    "Patek Philippe",
    "Hublot",
    "Louis Moinet",
  ]);

  const startColor = generateColor();
  const endColor = generateColor();

  return {
    id: chance.guid(),
    price: chance.dollar(),
    name,
    description: chance.paragraph({ sentences: 3 }),
    image: `https://placeholder.pics/svg/300/${startColor}-${endColor}/000/${encodeURI(
      name
    )}`,
    info: {
      listingNumber: chance.bb_pin(),
      referenceNumber: chance.bb_pin(),
      model: chance.word({ capitalize: true }),
      brand: name,
      year: chance.year({ min: 1600, max: 2019 }),
      gender: chance.gender(),
    },
    calibre: {
      powerReserve: chance.natural({ min: 10, max: 50 }),
      movement: chance.pickone(["Automatic", "Manual"]),
      movementPerCalibre: chance.natural({ min: 1000, max: 5000 }),
    },
    case: {
      material: chance.pickone(["leather", "gold", "steel"]),
      diameter: chance.natural({ min: 30, max: 60 }),
      glass: chance.pickone([
        "red",
        "blue",
        "green",
        "salmon",
        "brown",
        "black",
      ]),
    },
    strap: {
      material: chance.pickone(["leather", "gold", "steel"]),
      braceletColor: chance.pickone([
        "red",
        "blue",
        "green",
        "salmon",
        "brown",
        "black",
      ]),
    },
  };
});

watchesRoutes.get("/", (req, res) => {
  res.json(watches);
});

watchesRoutes.get("/:watchId", (req, res) => {
  const watchId = req.params.watchId;

  res.json(watches.find(w => w.id == watchId));
});

watchesRoutes.post("/", (req, res) => {
  // added post
});

module.exports = watchesRoutes;
