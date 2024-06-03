import { useState, useEffect } from "react";
import axios from "axios";
import BookCreate from './Components/BookCreate';
import BookList from './Components/BookList';

function App() {
    //here useSate([]) array is empty bcoz right now we don't have any books
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');

        setBooks(response.data);
    };
    
    //DON'T DO THIS
    //why: when app first render, set useState then fetchBook fun, then call fetchbook(), it will goes to fetchbooks fun then run code setBooks(response.date) will rerender app comp, and this loop will endlessly continues, that's why
    //fetchBooks();

    useEffect(() => {
        fetchBooks();
    }, []);

    const editBookById = async (id, newTitle) => {
        //instead of ('http://localhost:3001/books'+id) we write following link
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        });

        console.log(response.data);

        const updatedBook = books.map((book) => {
            if (book.id === id) {
                //here we have write ...response.data bcoz response.data will take all the updated values and put then into new book object with data, which are not going to edit
                return {...book, ...response.data};
                //return {...book, title:newTitle}
            }
            return book;
        });

        setBooks(updatedBook);
    };

    const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title
        });
        //console.log(response);
        
        const updatedBook = [...books, response.data];
            //[...books, 
            // {
            //     id: Math.round(Math.random () * 9999), 
            //     title
            // },];
        
        setBooks(updatedBook);
    };

    const deleteBookById = async (id) => {
        
        await axios.delete(`http://localhost:3001/books/${id}`);

        const updatedBook = books.filter((book) => {
            return book.id !== id;
    });
        setBooks(updatedBook);
    };

    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList onEdit={editBookById} books={books} onDelete={deleteBookById} />
            <BookCreate onCreate = {createBook} />
        </div>
    );
}

export default App;