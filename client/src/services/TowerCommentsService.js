import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerCommentsService {
  async getCommentByEventId(eventId) {
    const response = await api.get(`api/events/${eventId}/comments`)
    logger.log('got comment by event id', response.data)
  }

}
export const towerCommentsService = new TowerCommentsService()