import io from 'socket.io-client';
import { socketAPI } from '../config/';

export const socket = io(socketAPI.address);