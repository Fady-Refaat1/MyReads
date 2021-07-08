import React from 'react';
import { Link } from 'react-router-dom';
import Display from './Display.js';
import PropTypes from 'prop-types';

const shelfs =[
  {titel:'Currently Reading',searchId:'currentlyReading'},
  {titel:'Want to Read',searchId:'wantToRead'},
  {titel:'Read',searchId:'read'}
]

const Home = (props)=>{
  const {onShelfBooks} = props
    return(
        <div className="list-books">
        <div className="list-books-title">
        <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfs.map((shelf)=>( // map on each shelf to display the books inside it 
              <div className="bookshelf" key={shelf.searchId} >
              <h2 className="bookshelf-title">{shelf.titel}</h2>
              <div className="bookshelf-books" >
                <Display 
                handelHomeDisplay={props.handelHomeDisplay}
                books={onShelfBooks.filter((b)=>(b.shelf === shelf.searchId))}
                />
              </div>
            </div>
            ))}
          </div>
        </div>
        <div > 
        <Link   // the link between home page to search page 
            to='/search'
            className="open-search"
          >Add a book</Link>
        </div>
      </div>
    );

};
Home.propTypes = {
  onShelfBooks: PropTypes.array.isRequired,
  handelHomeDisplay: PropTypes.func.isRequired,
}

export default Home;