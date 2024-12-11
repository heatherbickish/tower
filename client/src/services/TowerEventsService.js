import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"

class TowerEventsService {
  async createEvent(eventData) {
    const response = await api.post('api/events', eventData)
    logger.lof('created event!', response.data)
  }
  async getEventById(eventId) {
    AppState.activeEvent = null
    const response = await api.get(`api/events/${eventId}`)
    const events = new TowerEvent(response.data)
    AppState.activeEvent = events
    logger.log(events)
  }
  async getEvents() {
    const response = await api.get('api/events')
    const events = response.data.map(eventPojo => new TowerEvent(eventPojo))
    AppState.towerEvents = events
    logger.log(events)
  }

}
export const towerEventsService = new TowerEventsService()