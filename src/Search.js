import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Display from './Display.js';
import PropTypes from 'prop-types';

class Search extends React.Component{
  state={
    query:'',
    books:[],
    error:false,
  };
  
  handelQueryChange= (query)=>{ // handel change of input field and make sure before search the query not empty 
    this.setState(()=>({
      query : query
    }))
    if(!(query ==='')){
      this.searchBooks(query)
    }
    else{ 
      this.setState(() => ({
      books : [],
  }))}
  };

  searchBooks = (query) => { //search for books and validate the result 
    BooksAPI.search(query)
    .then((books)=>{
      if(Array.prototype.isPrototypeOf(books)){
        books.map(b => (this.props.onShelfBooks.forEach(onshelfBook => (  // make the search result sync with on shelf books 
                  b.id === onshelfBook.id  ? b.shelf = onshelfBook.shelf :null
        ))))
        this.setState(() => ({
        books: 
        books.filter((b)=>(b.imageLinks !== undefined && b.authors !== undefined)),
        error:false
    }))
  }
    else{ 
      this.setState(() => ({
      books : [],
      error : true ,
    }))

  }
    })
  };

render(){
  const {query,books,error} = this.state
    return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link
            to='/'
            className="close-search"
            >Close</Link>
            <div className="search-books-input-wrapper">
            <input 
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event)=>{
            this.handelQueryChange(event.target.value)
            }}
            />
          </div>
      </div>
        {error && 
        <div className='bar error'>Please enter a valid book category</div>}
        {(books !== [] && error === false && query !=='') &&
        <Display
            books={books}
            handelHomeDisplay={this.props.handelHomeDisplay} />}
    </div>
    );
}
};
Search.propTypes = {
  onShelfBooks: PropTypes.array.isRequired,
  handelHomeDisplay: PropTypes.func.isRequired,
}

export default Search;