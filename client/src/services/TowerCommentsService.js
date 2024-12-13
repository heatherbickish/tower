import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerComment } from "@/models/TowerComment.js"
import { AppState } from "@/AppState.js"

class TowerCommentsService {
  async deleteComment(commentId) {
    const response = await api.delete(`api/comments/${commentId}`)
    const commentIndex = AppState.towerComments.findIndex(comment => comment.id == commentId)
    AppState.towerComments.splice(commentIndex, 1)
  }
  async createComment(commentData) {
    const response = await api.post('api/comments', commentData)
    const comment = new TowerComment(response.data)
    AppState.towerComments.unshift(comment)
  }
  async getCommentByEventId(eventId) {
    const response = await api.get(`api/events/${eventId}/comments`)
    const comments = response.data.map(commentPojo => new TowerComment(commentPojo))
    AppState.towerComments = comments
  }

}
export const towerCommentsService = new TowerCommentsService()