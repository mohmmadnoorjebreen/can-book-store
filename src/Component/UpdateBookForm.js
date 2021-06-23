import React from 'react'
import Button from 'react-bootstrap/Button'

import Form from 'react-bootstrap/Form'
export class UpdateBookForm extends React.Component {
    render() {
        return (
            <div>
                <Form onSubmit={(e) => this.props.UpdateBookForm(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Update name</Form.Label>
                        <Form.Control type="text" placeholder="name" onChange={(e) => this.props.UpdateNameBook(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Update description</Form.Label>
                        <Form.Control type="text" placeholder="description" onChange={(e) => this.props.UpdateDescriptionBook(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Update status</Form.Label>
                        <Form.Control type="text" placeholder="status" onChange={(e) => this.props.UpdateStatusBook(e.target.value)} /></Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    {<Button variant="secondary" onClick={this.props.closeUpdateForm}>Close</Button>}
                </Form>
            </div>
        )
    }
}

export default UpdateBookForm
