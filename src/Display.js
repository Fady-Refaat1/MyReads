import React from 'react';
import Book from './Book.js';
import PropTypes from 'prop-types';


const Display = (props)=>{ // display books 
    const {books} = props;
    return( 
            <div className="search-books-results">
            <ol className="books-grid">
                {books.map((book)=>(
                <Book key={book.id} book={book}  handelHomeDisplay={props.handelHomeDisplay}/>
                ))}
            </ol>
            </div>
    );
};

Display.propTypes = {
    Books: PropTypes.array,
    handelHomeDisplay: PropTypes.func.isRequired,
}

export default Display;