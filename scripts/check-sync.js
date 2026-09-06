const mongoose = require("mongoose");
require("dotenv").config();

const { VISHA_SERVICES } = require("../src/data/vishaServices.ts");
const { VISHA_TRAINING_PROGRAMS } = require("../src/data/vishaTraining.ts");
const { VISHA_PROJECTS } = require("../src/data/vishaProjects.ts");

// We will load them directly or import them via a script using ts-node or plain json
