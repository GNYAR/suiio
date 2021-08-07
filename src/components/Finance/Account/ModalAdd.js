import React, { Component } from 'react'
import { Row, Col, Button, Modal, Form, InputGroup } from 'react-bootstrap'

export class ModalAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: "尚未選擇檔案",
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
        // this.setOfficers()
    }

    // changeHandler = (event) => {
    //     this.setState({ form: { [event.target.name]: event.target.value } })
    // }

    // setOfficers = () => {
    //     fetch('http://localhost:4000/api/officers/fetch/all')
    //         .then((res) => res.json())
    //         .then((data) => this.setState({ officers: data }))
    // }

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
                            <strong>提交申請</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body as={Row}>
                        <Col lg="6">
                            <Form.Group as={Row}>
                                <Form.Label column sm="auto">
                                    收支名稱：
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        name="name"
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
                                        <option value="0">一般開銷</option>
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
                        <Col lg="auto" className="ml-auto">
                            <Form.Group className="my-2">
                                <Form.Check
                                    type="radio"
                                    inline label="收入"
                                    className="text-success font-weight-bold"
                                    name="type"
                                />
                                <Form.Check
                                    type="radio"
                                    inline label="支出"
                                    className="text-danger font-weight-bold"
                                    checked
                                    name="type"
                                />
                            </Form.Group>
                        </Col>
                        <Col lg="auto">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>NTD</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="number" name="amount" />
                            </InputGroup>
                        </Col>
                        <Col xs="12">
                            <Form.Group as={Row}>
                                <Form.Label column sm="auto">
                                    細部說明：
                                </Form.Label>
                                <Col>
                                    <Form.Control as="textarea" name="content" rows={8} />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Row}>
                                <Form.Label column sm="auto">
                                    發票收據：
                                </Form.Label>
                                <Col>
                                    <Form.File />
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
