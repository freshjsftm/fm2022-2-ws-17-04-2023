import axios from 'axios';
import io from 'socket.io-client';
import store from '../store';
import CONSTANTS from '../constants';
import { createMessage, errorMessage } from '../store/chatSlice';
const {
  SOCKET_EVENTS: { NEW_MESSAGE, ERROR_MESSAGE },
} = CONSTANTS;
const mainURL = 'localhost:3000';
const httpClient = axios.create({
  baseURL: `http://${mainURL}`,
});
const socket = io(`ws://${mainURL}`);

export const getMessages = (params = {}) => httpClient.get('/');

export const addMessage = (values) => socket.emit(NEW_MESSAGE, values);

socket.on(NEW_MESSAGE, (saveMessage) => {
  store.dispatch(createMessage(saveMessage))
});

socket.on(ERROR_MESSAGE, (error) => {
  store.dispatch(errorMessage(error))
});