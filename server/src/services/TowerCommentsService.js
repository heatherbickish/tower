import { dbContext } from "../db/DbContext"

class TowerCommentsService {
  async createComment(commmentData) {
    const comment = await dbContext.TowerComments.create(commmentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

}
export const towerCommentsService = new TowerCommentsService()