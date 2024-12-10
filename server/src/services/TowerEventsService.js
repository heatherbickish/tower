import { dbContext } from "../db/DbContext"

class TowerEventsService {
  async createEvent(eventData) {
    const event = await dbContext.TowerEvents.create(eventData)
    await event.populate('creator')
    return event
  }

  async getAllEvents() {
    const event = await dbContext.TowerEvents.find().populate('creator')
    return event
  }

  async getEventById(eventId) {
    const event = await dbContext.TowerEvents.findById(eventId).populate('creator')
    return event
  }
}
export const towerEventsService = new TowerEventsService()