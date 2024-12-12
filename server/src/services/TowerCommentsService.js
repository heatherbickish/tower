import { dbContext } from "../db/DbContext"

class TowerCommentsService {
  async getCommentsByEventId(eventId) {
    const comments = await dbContext.TowerComments.find({ eventId: eventId }).populate('creator', 'name picture')
    return comments
  }
  async createComment(commmentData) {
    const comment = await dbContext.TowerComments.create(commmentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

}
export const towerCommentsService = new TowerCommentsService()