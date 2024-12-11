import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {
  async getEvents() {
    const response = await api.get('api/events')
    logger.log('Got events', response.data)
  }

}
export const towerEventsService = new TowerEventsService()