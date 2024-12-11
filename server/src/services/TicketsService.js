import { dbContext } from "../db/DbContext"

class TicketsService {
  async getEventTickets(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'name picture')
    return tickets
  }
  async getMyTickets(userId) {
    const tickets = await dbContext.Tickets.find({ accountId: userId }).populate('event')
    return tickets
  }
  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')
    return ticket
  }

}
export const ticketsService = new TicketsService()