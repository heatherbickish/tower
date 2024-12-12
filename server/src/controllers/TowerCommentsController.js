import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { towerCommentsService } from "../services/TowerCommentsService";

export class TowerCommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.deleteComment)
  }


  async createComment(request, response, next) {
    try {
      const commmentData = request.body
      commmentData.creatorId = request.userInfo.id
      const comment = await towerCommentsService.createComment(commmentData)
      response.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(request, response, next) {
    try {
      const commentId = request.params.commentId
      const userId = request.userInfo.id
      const message = await towerCommentsService.deleteComment(commentId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

}