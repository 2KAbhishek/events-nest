import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {EventList} from './components/EventList';
import {EventForm} from './components/EventForm';

function App() {
    return (
        <Router>
            <div className='container bg-gray-800 border rounded-lg border-gray-50'>
                <div className='container p-8'>
                    <Routes>
                        <Route path='/' element={<EventList />} />
                        <Route path='/events/new' element={<EventForm />} />
                        <Route
                            path='/events/:id/edit'
                            element={<EventForm isEditing />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
