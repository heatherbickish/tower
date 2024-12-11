import { dbContext } from "../db/DbContext"

class TicketsService {
  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('towerEvent')
    return ticket
  }

}
export const ticketsService = new TicketsService()