import mongoose from 'mongoose';

const workSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'WorkSpace name is required']
  },
  description: {
    type: String
  },
  members: [
    {
      memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Member ID is required']
      },
      role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
      }
    }
  ],
  joinCode: {
    type: String,
    unique: [true, 'Join code must be unique']
  },
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel'
    }
  ]
});

const WorkSpace = mongoose.model('WorkSpace', workSpaceSchema);

export default WorkSpace;
