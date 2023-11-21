import socketIOClient from 'socket.io-client';

const socket = socketIOClient('https://webwork.website'); // Replace with your server URL

export default socket;
