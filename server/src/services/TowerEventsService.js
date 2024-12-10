import { dbContext } from "../db/DbContext"

class TowerEventsService {
  async createEvent(eventData) {
    const event = await dbContext.TowerEvents.create(eventData)
    await event.populate('creator')
    return event
  }

}
export const towerEventsService = new TowerEventsService()