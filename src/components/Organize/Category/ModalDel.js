import React, { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export class ModalDel extends Component {
    delete = (event) => {
        event.preventDefault()
        fetch('http://localhost:4000/api/officers/delete', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(),
        })
        window.location.reload()
    }

    render() {
        return (
            <Modal {...this.props} size="sm" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <strong>移除類別</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    確定要移除{' '}
                    <strong className="text-danger">
                        {this.props.category.name}
                    </strong>{' '}
                    ?
                </Modal.Body>
                <Modal.Footer>
                    <Form>
                        <Button variant="danger" onClick={this.delete}>
                            刪除
                        </Button>
                        <Button variant="light" onClick={this.props.onHide}>
                            取消
                        </Button>
                    </Form>
                </Modal.Footer>
            </Modal>
        )
    }
}
