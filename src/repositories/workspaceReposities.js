import User from '../Schema/User.js';
import WorkSpace from '../Schema/WorkSpace.js';
import channelRepositories from './channelReposities.js';
import crudRepositories from './crudRepositories.js';

let workspaceRepositories = {};

async function initWorkspaceRepositories() {
  workspaceRepositories = await crudRepositories(WorkSpace);

  workspaceRepositories.getWorkSpaceByName = async (name) => {
    const workSpace = await WorkSpace.findOne({ name });

    if (!workSpace) {
      throw new Error('WorkSpace not found');
    }
    return workSpace;
  };

  workspaceRepositories.getWorkSpaceByJoinCode = async (joinCode) => {
    const workSpace = await WorkSpace.findOne({ joinCode });

    if (!workSpace) {
      throw new Error('WorkSpace not found');
    }

    return workSpace;
  };

  workspaceRepositories.addMemberToWorkSpace = async (
    workSpaceId,
    memberId,
    role
  ) => {
    const workSpace = await WorkSpace.findById(workSpaceId);

    if (!workSpace) {
      throw new Error('WorkSpace not found');
    }

    const isValidUser = await User.findById(memberId);
    if (!isValidUser) {
      throw new Error('User not found');
    }

    const memberExists = workSpace.members.find(
      (member) => member.memberId == memberId
    );

    if (memberExists) {
      throw new Error('User is already a member of the WorkSpace');
    }

    workSpace.members.push({ memberId, role });
    await workSpace.save();
    return workSpace;
  };

  workspaceRepositories.addChannelToWorkSpace = async (
    workSpaceId,
    channelName
  ) => {
    const workSpace =
      await WorkSpace.findById(workSpaceId).populate('channels');

    if (!workSpace) {
      throw new Error('WorkSpace not found');
    }

    const channelExists = workSpace.channels.find(
      (channel) => channel.name === channelName
    );

    if (channelExists) {
      throw new Error('Channel with this name already exists in the WorkSpace');
    }

    const channel = await channelRepositories.create({ name: channelName });
    workSpace.channels.push(channel);
    await workSpace.save();
    return workSpace;
  };

  workspaceRepositories.fetchAllWorkSpacesByMemberId = async (memberId) => {
    const workSpaces = await WorkSpace.find({
      'members.memberId': memberId
    }).populate('members.memberId', 'username email avatar');

    return workSpaces;
  };
}

await initWorkspaceRepositories();
export default workspaceRepositories;
