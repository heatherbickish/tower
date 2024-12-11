import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class TicketsService {
  async deleteTicket(ticketId, userId) {
    const ticketToDelete = await dbContext.Tickets.findById(ticketId)
    if (ticketToDelete == null) { throw new Error(`Invalid ticket id ${ticketId}`) }
    if (ticketToDelete.accountId != userId) { throw new Forbidden("Get outta here! You can't delete someone else's ticket brah") }
    await ticketToDelete.deleteOne()
    return 'Ticket gone'
  }
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