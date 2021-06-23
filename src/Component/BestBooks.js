import React from 'react'

import axios from 'axios';
// import Carousel from 'react-bootstrap/Carousel'
import BookFormModal from './BookFormModal'
import Button from 'react-bootstrap/Button'
import UpdateBookForm from './UpdateBookForm'

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
            userEmail: 'mohammadnoormjk1998@gmail.com',
            UpdateNameBook: '',
            UpdateDescriptionBook: '',
            UpdateStatusBook: '',
            showUpdateModel: false,
            updateIndx: 0,
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
    }
    closeForm = () => {
        this.setState({
            showCreatModel: false
        })
    }



    openUpdateForm = (indx) => {
        this.setState({
            showUpdateModel: true,
            updateIndx: indx
        })
    }
    closeUpdateForm = () => {
        this.setState({
            showUpdateModel: false
        })
    }

    nameBook = (nameBook) => this.setState({ nameBook });
    descriptionBook = (descriptionBook) => this.setState({ descriptionBook });
    statusBook = (statusBook) => this.setState({ statusBook });

    UpdateNameBook = (UpdateNameBook) => this.setState({ UpdateNameBook });
    UpdateDescriptionBook = (UpdateDescriptionBook) => this.setState({ UpdateDescriptionBook });
    UpdateStatusBook = (UpdateStatusBook) => this.setState({ UpdateStatusBook });

    createBook = (e) => {
        e.preventDefault()
        const reqBody = {
            userEmail: this.state.userEmail,
            nameBook: this.state.nameBook,
            descriptionBook: this.state.descriptionBook,
            statusBook: this.state.statusBook
        }

        axios.post(`http://localhost:3200/books`, reqBody).then(response => {
            this.setState({
                DataOfBook: response.data
            })
        }).catch(error =>
            alert(error.message)
        )

    }
    UpdateBookForm = (e) => {

        e.preventDefault()
        const reqBody = {
            userEmail: this.state.userEmail,
            nameBook: this.state.UpdateNameBook,
            descriptionBook: this.state.UpdateDescriptionBook,
            statusBook: this.state.UpdateStatusBook
        }

        axios.put(`http://localhost:3200/book/${this.state.updateIndx}`, reqBody).then(response => {
            console.log('post data', response);
            this.setState({
                DataOfBook: response.data,
                showUpdateModel: false
            })
        }).catch(error =>
            alert(error.message)
        )

    }

    deleteBook = (indx) => {

        axios.delete(`http://localhost:3200/books/${this.state.DataOfBook[indx]._id}?email=mohammadnoormjk1998@gmail.com`).then((bookData) => {
            this.setState({
                DataOfBook: bookData.data,
                showUpdateModel: false
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
                            {<Button variant="secondary" onClick={() => this.openUpdateForm(indx)}>Update Book</Button>}

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
                {this.state.showUpdateModel &&
                    <UpdateBookForm closeUpdateForm={this.closeUpdateForm}
                        UpdateNameBook={this.UpdateNameBook}
                        UpdateDescriptionBook={this.UpdateDescriptionBook}
                        UpdateStatusBook={this.UpdateStatusBook}
                        UpdateBookForm={this.UpdateBookForm}
                    />
                }

                <Button variant="secondary" onClick={this.openForm}>Add Book</Button>
            </div>
        )
    }
}

export default BestBooks
