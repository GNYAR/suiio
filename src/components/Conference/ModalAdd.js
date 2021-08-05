import React, { Component } from 'react'
import { Row, Col, Button, Modal, Form } from 'react-bootstrap'

export class ModalAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                category: '',
                name: '',
                date: '',
                content: '',
                host: '',
                recorder: '',
                absentees: '',
                attendees: ''
            },
            officers: []
        }
        this.setOfficers()
    }

    changeHandler = (event) => {
        this.setState({ form: { [event.target.name]: event.target.value } })
    }

    setOfficers = () => {
        fetch('http://localhost:4000/api/officers/fetch/all')
            .then((res) => res.json())
            .then((data) => this.setState({ officers: data }))
    }

    add = (event) => {
        event.preventDefault()
        fetch('http://localhost:4000/api/officers/add', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(this.state.form),
        })
        window.location.reload()
    }

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
                                        name="name"
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
                                        name="category"
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
                                        name="date"
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
                                        name="host"
                                        onChange={this.changeHandler}
                                    >
                                        {this.state.officers.map(x => {
                                            if (x.position === "會長")
                                                return (
                                                    <option value={x.position} selected>
                                                        {x.position} ({x.sID})
                                                    </option>
                                                )
                                            return (
                                                <option value={x.position}>
                                                    {x.position} ({x.sID})
                                                </option>
                                            )
                                        })}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col xs="12">
                            <Form.Group as={Row}>
                                <Form.Label column sm="auto">
                                    出席幹部：
                                </Form.Label>
                                <div className="mt-2">
                                    {this.state.officers.map(x => (
                                        <Form.Check
                                            inline label={x.position}
                                            name="attendees"
                                            className="pl-3" />
                                    ))}
                                </div>
                            </Form.Group>
                        </Col>
                        <Col xs="12">
                            <Form.Group as={Row}>
                                <Form.Label column sm="auto">
                                    會議內容：
                                </Form.Label>
                                <Col>
                                    <Form.Control as="textarea" name="content" rows={10} />
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
