import { useState } from 'react';

function BookCreate({ onCreate }) {

    const [title, setTitle] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onCreate(title);
        //setTitle('') is empty bcoz when user press enter after type in input the input box will being empty, so that user doesn't need to erase previous input
        setTitle('');
    };
    
    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    return ( 
        <div className='book-create'>
            <h3>Add a Book</h3>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input className='input' value={title} onChange={handleChange} />
                <button className='button'>Create!</button>
            </form>
        </div>
    );
}

export default BookCreate;