import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class TowerEventsService {


  async createEvent(eventData) {
    const event = await dbContext.TowerEvents.create(eventData)
    await event.populate('creator')
    await event.populate('ticketCount')
    return event
  }

  async getAllEvents() {
    const event = await dbContext.TowerEvents.find().populate('creator').populate('ticketCount')
    return event
  }

  async getEventById(eventId) {
    const event = await dbContext.TowerEvents.findById(eventId).populate('creator').populate('ticketCount')
    return event
  }

  async editEvent(eventId, updataData, userInfo) {
    const originalEvent = await dbContext.TowerEvents.findById(eventId)
    if (originalEvent.isCanceled) { throw new Error("You can't edit an event that has been cancelled") }
    if (!originalEvent) { throw new Error(`Nope ${eventId}`) }
    if (userInfo != originalEvent.creatorId) { throw new Forbidden('That aint yours brah') }
    if (updataData.description)

      originalEvent.description = updataData.description
    originalEvent.name = updataData.name || originalEvent.name

    await originalEvent.save()
    return originalEvent
  }

  async cancelEvent(eventId, userId) {
    const eventToCancel = await this.getEventById(eventId)

    if (eventToCancel == null) { throw new Error(`Invalid event id ${eventId}`) }
    if (eventToCancel.creatorId != userId) { throw new Forbidden('CAUGHT YA BEING NAUGHTY') }
    eventToCancel.isCanceled = !eventToCancel.isCanceled

    await eventToCancel.save()
    return eventToCancel
  }
}
export const towerEventsService = new TowerEventsService()