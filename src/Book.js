import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component{

    constructor(props){
        super(props);
        this.state={
            shelf: this.props.book.shelf ? this.props.book.shelf:'none',
        }
    };
    
    handelChange=(e)=>{ // handel book change state  like ("Read" to "want to read" )
        this.props.handelHomeDisplay(e.target.id,e.target.value)
        this.setState({shelf : e.target.value})
    };

    render(){
        const {book} = this.props
        return(
                <li key={book.id}> 
                <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 190, backgroundImage:`url(${book.imageLinks.thumbnail})`}}></div>
                    <div className="book-shelf-changer">
                    <select value={this.state.shelf} id={book.id} onChange={this.handelChange}>
                        <option  value='' disabled>Move to...</option>
                        <option  value="currentlyReading">Currently Reading</option>
                        <option  value="wantToRead">Want to Read</option>
                        <option  value="read">Read</option>
                        <option  value="none">None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        );
}
};
Book.propTypes = {
    Book: PropTypes.object,
    handelHomeDisplay: PropTypes.func.isRequired,
};

export default Book;