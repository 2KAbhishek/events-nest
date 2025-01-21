import axios from 'axios';
import {Event} from '../types/event';

const API_URL = 'http://localhost:3000';

export const getEvents = async (): Promise<Event[]> => {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
};

export const getEvent = async (id: number): Promise<Event> => {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
};

export const createEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
    const response = await axios.post(`${API_URL}/events`, event);
    return response.data;
};

export const updateEvent = async (
    id: number,
    event: Omit<Event, 'id'>
): Promise<Event> => {
    const response = await axios.put(`${API_URL}/events/${id}`, event);
    return response.data;
};

export const deleteEvent = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/events/${id}`);
};
