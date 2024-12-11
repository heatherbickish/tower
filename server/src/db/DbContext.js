import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { TowerEventSchema } from "../models/TowerEvent";
import { TicketSchema } from "../models/Ticket";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema);

  Tickets = mongoose.model('Tickets', TicketSchema);
}

export const dbContext = new DbContext()
