import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"

class TowerEventsService {

  async createEvent(eventData) {
    const response = await api.post('api/events', eventData)
    logger.log('created event!', response.data)
    const towerEvent = new TowerEvent(response.data)
    AppState.towerEvents.push(towerEvent)
    return towerEvent
  }
  async getEventById(eventId) {
    AppState.activeEvent = null
    const response = await api.get(`api/events/${eventId}`)
    const events = new TowerEvent(response.data)
    AppState.activeEvent = events
  }
  async getEvents() {
    const response = await api.get('api/events')
    const events = response.data.map(eventPojo => new TowerEvent(eventPojo))
    AppState.towerEvents = events
  }

  async cancelEvent(eventId) {
    const response = await api.delete(`api/events/${eventId}`)
    logger.log('canceled event', response.data)
  }
}
export const towerEventsService = new TowerEventsService()