import React, { Component } from 'react'
import { Row, Col, Button, Modal, Form } from 'react-bootstrap'

export class ModalAdd extends Component {
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
                    <Modal.Header>
                        <Modal.Title>
                            <strong>撰寫紀錄</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body as={Row}>
                        <Col lg="6">
                            <Form.Group as={Row}>
                                <Form.Label column sm="auto">
                                    會議名稱：
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        name="position"
                                        onChange={this.changeHandler}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col lg="6">
                            <Form.Group as={Row}>
                                <Form.Label column sm="auto">
                                    活動類別：
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        as="select"
                                    >
                                        <option value="0">例行會議</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col lg="5">
                            <Form.Group as={Row}>
                                <Form.Label column sm="auto">
                                    日　　期：
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        type="date"
                                        name="position"
                                        onChange={this.changeHandler}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col lg="7">
                            <Form.Group as={Row}>
                                <Form.Label column sm="auto">
                                    主　　席：
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        as="select"
                                    >
                                        <option value="0">會長</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col xs="12">
                            <Form.Group as={Row}>
                                <Form.Label column sm="auto">
                                    出席幹部：
                                </Form.Label>
                                <Form.Check inline label="會長" name="group1" className="pl-3" />
                                <Form.Check inline label="副會長" name="group1" className="pl-3" />
                                <Form.Check inline label="活動長" name="group1" className="pl-3" />
                                <Form.Check inline label="器材長" name="group1" className="pl-3" />
                            </Form.Group>
                        </Col>
                        <Col xs="12">
                            <Form.Group as={Row}>
                                <Form.Label column sm="auto">
                                    會議內容：
                                </Form.Label>
                                <Col>
                                    <Form.Control as="textarea" rows={5} />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" type="submit">
                            新增
                        </Button>
                        <Button variant="light" onClick={this.props.onHide}>
                            取消
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}
