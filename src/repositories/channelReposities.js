import Channel from '../Schema/Channel.js';
import crudRepositories from './crudRepositories.js';

let channelRepositories = {};

async function initChannelRepositories() {
  channelRepositories = await crudRepositories(Channel);

  

  return channelRepositories;
}

await initChannelRepositories();

export default channelRepositories;
