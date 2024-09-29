"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateBeeper = exports.deleteBeeper = exports.updateBeeper = exports.getBeeperById = exports.getAllBeepers = exports.createBeeper = void 0;
const uuid_1 = require("uuid");
const beeper_1 = require("../models/beeper");
const createBeeper = (req, res) => {
    const { status, lat, lon } = req.body;
    // Basic validation
    if (status === 'deployed' && typeof lat !== 'number' || typeof lon !== 'number') {
        return res.status(400).json({ message: 'Invalid latitude or longitude' });
    }
    // Check if coordinates are within Lebanon's boundaries
    if (lat < 33.05 || lat > 34.69 || lon < 35.10 || lon > 36.62) {
        return res.status(400).json({ message: 'Coordinates must be within Lebanon' });
    }
    const newBeeper = {
        id: (0, uuid_1.v4)(),
        status: status || 'produced',
        lat,
        lon,
        productionDate: new Date(),
    };
    beeper_1.beepers.push(newBeeper);
    res.status(201).json(newBeeper);
};
exports.createBeeper = createBeeper;
const getAllBeepers = (req, res) => {
    res.json(beeper_1.beepers);
};
exports.getAllBeepers = getAllBeepers;
const getBeeperById = (req, res) => {
    const beeper = beeper_1.beepers.find(b => b.id === req.params.id);
    if (beeper) {
        res.json(beeper);
    }
    else {
        res.status(404).json({ message: 'Beeper not found' });
    }
};
exports.getBeeperById = getBeeperById;
const updateBeeper = (req, res) => {
    const index = beeper_1.beepers.findIndex(b => b.id === req.params.id);
    if (index !== -1) {
        beeper_1.beepers[index] = Object.assign(Object.assign({}, beeper_1.beepers[index]), req.body);
        res.json(beeper_1.beepers[index]);
    }
    else {
        res.status(404).json({ message: 'Beeper not found' });
    }
};
exports.updateBeeper = updateBeeper;
const deleteBeeper = (req, res) => {
    const index = beeper_1.beepers.findIndex(b => b.id === req.params.id);
    if (index !== -1) {
        beeper_1.beepers.splice(index, 1);
        res.status(204).send();
    }
    else {
        res.status(404).json({ message: 'Beeper not found' });
    }
};
exports.deleteBeeper = deleteBeeper;
const activateBeeper = (req, res) => {
    const beeper = beeper_1.beepers.find(b => b.id === req.params.id);
    if (beeper) {
        if (beeper.status !== 'deployed') {
            return res.status(400).json({ message: 'Beeper must be deployed before activation' });
        }
        // Start the detonation countdown
        setTimeout(() => {
            beeper.status = 'detonated';
            beeper.deploymentDate = new Date();
        }, 10000);
        res.json({ message: 'Beeper activated', countdown: 10 });
    }
    else {
        res.status(404).json({ message: 'Beeper not found' });
    }
};
exports.activateBeeper = activateBeeper;
