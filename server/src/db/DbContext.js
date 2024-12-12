import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { TowerEventSchema } from "../models/TowerEvent";
import { TicketSchema } from "../models/Ticket";
import { TowerCommentSchema } from "../models/TowerComment";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema);

  Tickets = mongoose.model('Ticket', TicketSchema);

  TowerComments = mongoose.model('TowerComment', TowerCommentSchema)
}

export const dbContext = new DbContext()
