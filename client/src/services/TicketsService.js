import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ticket } from "@/models/Ticket.js"
import { AppState } from "@/AppState.js"

class TicketsService {
  async deleteTicket(ticketId) {
    const response = await api.delete(`api/tickets/${ticketId}`)
    const ticketIndex = AppState.ticketEvents.findIndex(ticket => ticket.id == ticketId)
    AppState.ticketEvents.splice(ticketIndex, 1)
  }
  async getMyTicketEvents() {
    const response = await api.get('account/tickets')
    const tickets = response.data.map(ticketPojo => new Ticket(ticketPojo))
    AppState.ticketEvents = tickets
  }

  async getTicketProfileByEventId(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
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