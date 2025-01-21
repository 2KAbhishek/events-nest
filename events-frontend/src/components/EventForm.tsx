import React, {useState, FormEvent, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {createEvent, updateEvent, getEvent} from '../api/events';

interface EventFormProps {
    isEditing?: boolean;
}

export const EventForm: React.FC<EventFormProps> = ({isEditing}) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: ''
    });

    useEffect(() => {
        if (isEditing && id) {
            const fetchEvent = async () => {
                try {
                    const eventData = await getEvent(parseInt(id));
                    setFormData({
                        title: eventData.title,
                        description: eventData.description,
                        date: eventData.date
                    });
                } catch (error) {
                    console.error('Error fetching event:', error);
                    navigate('/');
                }
            };
            fetchEvent();
        }
    }, [id, isEditing, navigate]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && id) {
                await updateEvent(parseInt(id), formData);
            } else {
                await createEvent(formData);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    return (
        <div className='max-w-2xl m-8'>
            <h2 className='text-2xl font-bold mb-6'>
                {isEditing ? 'Edit Event' : 'Create New Event'}
            </h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                    <label className='block text-sm font-medium text-gray-100'>
                        Title
                    </label>
                    <input
                        type='text'
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({...formData, title: e.target.value})
                        }
                        className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500'
                        required
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-100'>
                        Description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value
                            })
                        }
                        className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500'
                        rows={4}
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-100'>
                        Date
                    </label>
                    <input
                        type='date'
                        value={formData.date}
                        onChange={(e) =>
                            setFormData({...formData, date: e.target.value})
                        }
                        className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500'
                        required
                    />
                </div>
                <div className='flex gap-4'>
                    <button
                        type='submit'
                        className='flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700'
                    >
                        {isEditing ? 'Update' : 'Create'}
                    </button>
                    <button
                        type='button'
                        onClick={() => navigate('/')}
                        className='flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};
