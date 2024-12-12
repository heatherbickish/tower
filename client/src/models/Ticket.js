import { Account } from "./Account.js"
import { TowerEvent } from "./TowerEvent.js"

export class Ticket {
  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.eventId = data.eventId
    this.towerEvent = data.event ? new TowerEvent(data.event) : null
    this.profile = data.profile ? new Account(data.profile) : null

  }
}