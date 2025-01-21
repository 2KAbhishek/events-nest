import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Event} from '../types/event';
import {getEvents, deleteEvent} from '../api/events';
import {format} from 'date-fns';

export const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteEvent(id);
            await fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className='space-y-4'>
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold'>Events</h2>
                <Link
                    to='/events/new'
                    className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700'
                >
                    New Event
                </Link>
            </div>
            <div className='grid gap-4'>
                {events.map((event) => (
                    <div
                        key={event.id}
                        className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'
                    >
                        <div className='flex justify-between items-start'>
                            <div>
                                <h3 className='text-lg font-semibold'>
                                    {event.title}
                                </h3>
                                <p className='text-gray-600'>
                                    {event.description}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    {format(new Date(event.date), 'PPP')}
                                </p>
                            </div>
                            <div className='space-x-2'>
                                <Link
                                    to={`/events/${event.id}/edit`}
                                    className='text-indigo-600 hover:text-indigo-800'
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(event.id)}
                                    className='text-red-600 hover:text-red-800'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
