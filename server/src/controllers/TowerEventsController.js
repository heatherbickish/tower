import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { towerEventsService } from "../services/TowerEventsService";
import { ticketsService } from "../services/TicketsService";
import { towerCommentsService } from "../services/TowerCommentsService";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getEventTickets)
      .get('/:eventId/comments', this.getCommentsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)
  }


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

  async editEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const updataData = request.body
      const userInfo = request.userInfo
      const updatedEvent = await towerEventsService.editEvent(eventId, updataData, userInfo.id)
      response.send(updatedEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const event = await towerEventsService.cancelEvent(eventId)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getEventTickets(request, response, next) {
    try {
      const eventId = request.params.eventId
      const tickets = await ticketsService.getEventTickets(eventId)
      response.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEventId(request, response, next) {
    try {
      const eventId = request.params.eventId
      const comments = await towerCommentsService.getCommentsByEventId(eventId)
      response.send(comments)
    } catch (error) {
      next(error)
    }
  }
}