import React from 'react'

import axios from 'axios';
// import Carousel from 'react-bootstrap/Carousel'
import BookFormModal from './BookFormModal'
import Button from 'react-bootstrap/Button'

export class BestBooks extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            NumberBook: 0,
            DataOfBook: '',
            showCreatModel: false,
            nameBook: '',
            descriptionBook: '',
            statusBook: '',
            userEmail: 'mohammadnoormjk1998@gmail.com'

        }
    }
    componentDidMount = () => {
        axios.get(`http://localhost:3200/book?email=mohammadnoormjk1998@gmail.com`).then((bookData) => {
            console.log(bookData);
            this.setState({
                NumberBook: bookData.data.length,
                DataOfBook: bookData.data
            })
        })
    }

    openForm = () => {
        this.setState({
            showCreatModel: true
        })
        console.log(this.state.nameBook);
    }
    closeForm = () => {
        this.setState({
            showCreatModel: false
        })
        console.log(this.state.nameBook);
    }

    nameBook = (nameBook) => this.setState({ nameBook });
    descriptionBook = (descriptionBook) => this.setState({ descriptionBook });
    statusBook = (statusBook) => this.setState({ statusBook });


    createBook = (e) => {
        e.preventDefault()
        const reqBody = {
            userEmail: this.state.userEmail,
            nameBook: this.state.nameBook,
            descriptionBook: this.state.descriptionBook,
            statusBook: this.state.statusBook
        }

        axios.post(`http://localhost:3200/books`, reqBody).then(response => {
            console.log('post data', response);
            this.setState({
                DataOfBook: response.data
            })
        }).catch(error =>
            alert(error.message)
        )

    }

    deleteBook = (indx) => {

        axios.delete(`http://localhost:3200/books/${this.state.DataOfBook[indx]._id}?email=mohammadnoormjk1998@gmail.com`).then((bookData) => {
            this.setState({
                DataOfBook: bookData.data
            })
        }).catch(error =>
            alert(error.message)
        )
    }





    render() {
        return (
            <div>
                {this.state.NumberBook > 0 &&
                    this.state.DataOfBook.map((value, indx) =>
                        <>
                            <>
                                <p>{value.name}</p>

                                <p>{value.description}</p>

                                <p>{value.status}</p>
                            </>
                            {<Button variant="secondary" onClick={() => this.deleteBook(indx)}>delete</Button>}

                        </>
                    )}
                {this.state.showCreatModel &&
                    <>
                        <BookFormModal closeForm={this.closeForm}
                            nameBook={this.nameBook}
                            descriptionBook={this.descriptionBook}
                            statusBook={this.statusBook}
                            createBook={this.createBook}
                        />
                    </>
                }

                <Button variant="secondary" onClick={this.openForm}>Add Book</Button>
            </div>
        )
    }
}

export default BestBooks
