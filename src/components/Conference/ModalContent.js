import React, { Component } from 'react'
import { Row, Col, Modal, Form } from 'react-bootstrap'

export class ModalContent extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         position: '',
    //         sID: '',
    //     }
    // }

    // changeHandler = (event) => {
    //     this.setState({ [event.target.name]: event.target.value })
    // }

    // add = (event) => {
    //     event.preventDefault()
    //     fetch('http://localhost:4000/api/officers/add', {
    //         method: 'POST',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //         }),
    //         body: JSON.stringify(this.state),
    //     })
    //     window.location.reload()
    // }

    render() {
        return (
            <Modal
                {...this.props}
                backdrop="static"
                size="xl"
                centered>
                <Form onSubmit={this.add}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <strong>
                                <span className="text-success pr-3">大迎新</span>
                                第一次籌備會議
                            </strong>
                        </Modal.Title>
                        <span className="text-muted pl-5">2021-07-31</span>
                    </Modal.Header>
                    <Modal.Body as={Row}>
                        <Col xs="2">
                            <h6>主　　席：
                                <strong className="text-primary">
                                    會長
                                </strong>
                            </h6>
                        </Col>
                        <Col xs="5">
                            <h6>出席幹部：
                                <strong className="text-info">
                                    會長, 副會長, 活動長, 器材長
                                </strong>
                            </h6>
                        </Col>
                        <Col xs="5">
                            <h6>缺席幹部：
                                <strong className="text-danger">
                                    體育長, 資訊長
                                </strong>
                            </h6>
                        </Col>
                        <Col xs="12" className="pt-3">
                            <Form.Control as="textarea" rows={15} readOnly />
                        </Col>
                    </Modal.Body>
                </Form>
            </Modal >
        )
    }
}
