import React from 'react'

import Button from 'react-bootstrap/Button'

import Form from 'react-bootstrap/Form'
export class BookFormModal extends React.Component {
    render() {
        return (
            <div>
                <Form onSubmit={(e) => this.props.createBook(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>name</Form.Label>
                        <Form.Control type="text" placeholder="name" onChange={(e) => this.props.nameBook(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>description</Form.Label>
                        <Form.Control type="text" placeholder="description" onChange={(e) => this.props.descriptionBook(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>status</Form.Label>
                        <Form.Control type="text" placeholder="status" onChange={(e) => this.props.statusBook(e.target.value)} /></Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    {<Button variant="secondary" onClick={this.props.closeForm}>Close</Button>}
                </Form>
            </div>
        )
    }
}

export default BookFormModal
