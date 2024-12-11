import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"

class TowerEventsService {
  async getEvents() {
    const response = await api.get('api/events')
    const events = response.data.map(eventPojo => new TowerEvent(eventPojo))
    AppState.towerEvents = events
    logger.log(events)
  }

}
export const towerEventsService = new TowerEventsService()