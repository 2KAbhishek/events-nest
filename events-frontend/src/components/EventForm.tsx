import React, {useState, FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {Event} from '../types/event';
import {createEvent, updateEvent} from '../api/events';

interface EventFormProps {
    initialEvent?: Event;
    isEditing?: boolean;
}

export const EventForm: React.FC<EventFormProps> = ({
    initialEvent,
    isEditing
}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: initialEvent?.title || '',
        description: initialEvent?.description || '',
        date: initialEvent?.date || ''
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && initialEvent) {
                await updateEvent(initialEvent.id, formData);
            } else {
                await createEvent(formData);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label className='block text-sm font-medium text-gray-700'>
                    Title
                </label>
                <input
                    type='text'
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({...formData, title: e.target.value})
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                    required
                />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>
                    Description
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({...formData, description: e.target.value})
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                    required
                />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>
                    Date
                </label>
                <input
                    type='date'
                    value={formData.date}
                    onChange={(e) =>
                        setFormData({...formData, date: e.target.value})
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                    required
                />
            </div>
            <button
                type='submit'
                className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
                {isEditing ? 'Update Event' : 'Create Event'}
            </button>
        </form>
    );
};
