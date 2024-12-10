import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { TowerEventSchema } from "../models/TowerEvent";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema)
}

export const dbContext = new DbContext()
