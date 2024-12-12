import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerComment } from "@/models/TowerComment.js"
import { AppState } from "@/AppState.js"

class TowerCommentsService {
  async createComment(commentData) {
    const response = await api.post('api/comments', commentData)
    logger.log('created comment', response.data)
    const comment = new TowerComment(response.data)
    AppState.towerComments.push(comment)
  }
  async getCommentByEventId(eventId) {
    const response = await api.get(`api/events/${eventId}/comments`)
    const comments = response.data.map(commentPojo => new TowerComment(commentPojo))
    AppState.towerComments = comments
    logger.log(comments)
  }

}
export const towerCommentsService = new TowerCommentsService()