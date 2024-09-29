import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Beeper, beepers } from '../models/beeper';

export const createBeeper = (req: Request, res: Response) => {
  const { name } = req.body;
  console.log(name);

  const newBeeper: Beeper = {
    id: uuidv4(),
    name: name,
    status: 'manufactured',
    latitude: 0.0,
    longitude: 0.0,
    created_at: new Date(),
  };

  beepers.push(newBeeper);
  res.status(201).json(newBeeper);
};
export const getAllBeepers = (req: Request, res: Response) => {
  res.json(beepers);
};

export const getBeeperById = (req: Request, res: Response) => {
  const beeper = beepers.find(b => b.id === req.params.id);
  if (beeper) {
    res.json(beeper);
  } else {
    res.status(404).json({ message: 'Beeper not found' });
  }
};

export const updateBeeper = (req: Request, res: Response) => {
  const index = beepers.findIndex(b => {
    // console.log(b.id + ' ; ' + req.params.id);
    return b.id === req.params.id
  });
  const { status, lat, lon } = req.body;

  if (index !== -1) {
      // Basic validation
    if (status === 'deployed') {
      if (typeof lat !== 'number' || typeof lon !== 'number') {
        return res.status(400).json({ message: 'Invalid latitude or longitude' });
      }
    
      // Check if coordinates are within Lebanon's boundaries
      if (lat < 33.05 || lat > 34.69 || lon < 35.10 || lon > 36.62) {
        return res.status(400).json({ message: 'Coordinates must be within Lebanon' });
      }
    } 

    beepers[index] = { ...beepers[index], ...req.body };

    if (status === 'detonated') {
      res.json({ message: 'Beeper activated', countdown: 10 });
    } else {
      res.json(beepers[index]);
    }
  } else {
    res.status(404).json({ message: 'Beeper not found' });
  }
};

export const deleteBeeper = (req: Request, res: Response) => {
  const index = beepers.findIndex(b => b.id === req.params.id);
  if (index !== -1) {
    beepers.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Beeper not found' });
  }
};

export const activateBeeper = (req: Request, res: Response) => {
  const beeper = beepers.find(b => b.id === req.params.id);
  if (beeper) {
    if (beeper.status !== 'deployed') {
      return res.status(400).json({ message: 'Beeper must be deployed before activation' });
    }
    
    // Start the detonation countdown
    setTimeout(() => {
      beeper.status = 'detonated';
      beeper.detonated_at = new Date();
    }, 10000);

    res.json({ message: 'Beeper activated', countdown: 10 });
  } else {
    res.status(404).json({ message: 'Beeper not found' });
  }
};