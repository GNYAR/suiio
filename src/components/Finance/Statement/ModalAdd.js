import React, { Component } from 'react'
import { Row, Col, Button, Modal, Form } from 'react-bootstrap'
import { StatementTable } from './StatementTable'

export class ModalAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            month: "",
            category: "",
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

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    // setOfficers = () => {
    //     fetch('http://localhost:4000/api/officers/fetch/all')
    //         .then((res) => res.json())
    //         .then((data) => this.setState({ officers: data }))
    // }

    // add = (event) => {
    //     event.preventDefault()
    //     fetch('http://localhost:4000/api/officers/add', {
    //         method: 'POST',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //         }),
    //         body: JSON.stringify(this.state.form),
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
                    <Modal.Header className="justify-content-start">
                        <Modal.Title>
                            <strong>建立報表</strong>
                        </Modal.Title>
                        <span className={`ml-5 px-2 rounded ${this.props.class === "每月報表" ? "bg-primary text-white" : "bg-warning"}`}>{this.props.class}</span>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="auto">
                                        報表名稱：
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
                                {this.props.class === "每月報表" ? (
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="auto">
                                            月份：
                                        </Form.Label>
                                        <Col>
                                            <Form.Control
                                                type="month"
                                                name="month"
                                                onChange={this.changeHandler}
                                            />
                                        </Col>
                                    </Form.Group>) : (
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="auto">
                                            活動類型：
                                        </Form.Label>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="category"
                                                onChange={this.changeHandler}
                                            >
                                                <option value="0" selected disabled>請選擇活動 ...</option>
                                                <option value="1">迎新茶會</option>
                                                <option value="2">大迎新</option>
                                                <option value="3">聖誕晚會</option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                )}
                            </Col>
                        </Row>
                        {(this.state.month || this.state.category ?
                            <StatementTable /> :
                            <h3 className="py-5 text-center">
                                <span className="px-5 py-2 rounded bg-secondary text-white">No Data</span>
                            </h3>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" type="submit">
                            新增
                        </Button>
                        <Button variant="light" onClick={() => {
                            this.setState({ month: "", category: "" })
                            this.props.onHide()
                        }}>
                            取消
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}
