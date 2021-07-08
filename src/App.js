import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Home from './Home'
import Search from './Search'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state={
    onShelfBooks:[]
  };
  
  componentDidMount() { // get all books on shelfs and set the state with on shelf books 
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          onShelfBooks : books
        }))
      })
  };
  
  handelHomeDisplay = (id,value)=>{ // handel the books that will appear in the home page after any update on it 
                                    //(set shelf of new book or modify allready book on any shelf )
    BooksAPI.get(id)
    .then((book)=>{
        BooksAPI.update(book,value)
        console.log(book)
        console.log(value)
        if (value === 'none') {
          this.setState(prevState => ({
            onShelfBooks: prevState.onShelfBooks.filter(b => b.id !== id)
          }));
        } 
        else {
          book.shelf = value
          this.setState(prevState => ({
            onShelfBooks: prevState.onShelfBooks.filter(b => b.id !== id)
          }));
          this.setState(prevState => ({
            onShelfBooks: prevState.onShelfBooks.concat(book)
          }));
        }
        })
    };
  render() {
    return (
      <div className="app">
       {/*Route which page will render right now */}
        <Route exact path='/' render={()=>(
            <Home 
            onShelfBooks={this.state.onShelfBooks}
            handelHomeDisplay={this.handelHomeDisplay}
            />
          )} />

          <Route path='/search' render={()=>(
          <Search 
          onShelfBooks={this.state.onShelfBooks}
          handelHomeDisplay={this.handelHomeDisplay}
          />
          )} />

      </div>
    )
  }
}

export default BooksApp;


