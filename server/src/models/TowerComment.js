import { Schema } from "mongoose";

export const TowerCommentSchema = new Schema({
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
  eventId: { type: Schema.ObjectId, ref: 'TowerEvent', required: true },
  body: { type: String, maxLength: 1000, required: true }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  })

TowerCommentSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})