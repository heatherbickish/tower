import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ticket } from "@/models/Ticket.js"
import { AppState } from "@/AppState.js"

class TicketsService {
  async getTicketProfileByEventId(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    logger.log('got ticket profiles', response.data)
    const ticket = response.data.map(ticketPojo => new Ticket(ticketPojo))
    AppState.ticketProfiles = ticket

  }

  async createTicket(eventData) {
    const response = await api.post('api/tickets', eventData)
    const ticket = new Ticket(response.data)
    AppState.ticketProfiles.push(ticket)
  }

}
export const ticketsService = new TicketsService()