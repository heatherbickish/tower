import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { towerEventsService } from "../services/TowerEventsService";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
  }

  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */

  async createEvent(request, response, next) {
    try {
      const eventData = request.body
      eventData.creatorId = request.userInfo.id
      const event = await towerEventsService.createEvent(eventData)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getAllEvents(request, response, next) {
    try {
      const event = await towerEventsService.getAllEvents()
      response.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const event = await towerEventsService.getEventById(eventId)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }
}