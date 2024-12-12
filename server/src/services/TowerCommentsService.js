import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class TowerCommentsService {
  async deleteComment(commentId, userId) {
    const commentToDelete = await dbContext.TowerComments.findById(commentId)
    if (commentToDelete == null) { throw new Error(`Invalid comment id ${commentId}`) }
    if (commentToDelete.creatorId != userId) { throw new Forbidden("YOU ARE NOT ALLOWED TO DELETE SOMEONE ELSE'S COMMENT BRAH") }
    await commentToDelete.deleteOne()
    return 'Comment has been extinguished'
  }

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