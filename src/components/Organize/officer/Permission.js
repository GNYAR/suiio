/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react'
import { Jumbotron, Row, Col, Button, Form } from 'react-bootstrap'

const mapping = {
    組織負責人: 'organize',
    財務負責人: 'finance',
    會議負責人: 'conference',
}

export class Permission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            organize: [],
            finance: [],
            conference: [],
        }
    }

    update = (event) => {
        event.preventDefault()
        const data = Object.keys(this.state).reduce((x, key) => {
            x[key] = Array.from(this.state[key])
            return x
        }, {})
        fetch('http://suiio.nutc.edu.tw:2541/api/officers/update/permission', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(data),
        }).then((resp) => {
            if (parseInt(resp.status / 100) === '2')
                return alert(`${resp.status}　${resp.statusText}`)
            window.location.reload()
        })
    }

    render() {
        return (
            <Jumbotron className="mt-5 py-3">
                <h3 className="font-weight-bold">權限管理</h3>
                <Form onSubmit={this.update}>
                    {Object.keys(mapping).map((perm) => {
                        return (
                            <Form.Group as={Row}>
                                <Form.Label column="lg" lg={2}>
                                    {perm}
                                </Form.Label>
                                <Col lg={5} className="py-1">
                                    <Form.Control
                                        as="select"
                                        size="lg"
                                        onChange={(event) => {
                                            this.state[mapping[perm]][0] =
                                                event.target.value
                                        }}
                                    >
                                        {this.props.officers.map((x) => {
                                            if (
                                                !this.state[mapping[perm]][0] &&
                                                x.permission === perm
                                            ) {
                                                this.state[mapping[perm]][0] =
                                                    x.position
                                                return (
                                                    <option
                                                        value={x.position}
                                                        selected
                                                    >
                                                        {x.position} ({x.sID})
                                                    </option>
                                                )
                                            }
                                            return (
                                                <option value={x.position}>
                                                    {x.position} ({x.sID})
                                                </option>
                                            )
                                        })}
                                    </Form.Control>
                                </Col>
                                <Col lg={5} className="py-1">
                                    <Form.Control
                                        as="select"
                                        size="lg"
                                        onChange={(event) => {
                                            this.state[mapping[perm]][1] =
                                                event.target.value
                                        }}
                                    >
                                        <option value="">---------</option>
                                        {this.props.officers.map((x) => {
                                            if (
                                                x.position !==
                                                    this.state[
                                                        mapping[perm]
                                                    ][0] &&
                                                x.permission === perm
                                            ) {
                                                this.state[mapping[perm]][1] =
                                                    x.position
                                                return (
                                                    <option
                                                        value={x.position}
                                                        selected
                                                    >
                                                        {x.position} ({x.sID})
                                                    </option>
                                                )
                                            }
                                            return (
                                                <option value={x.position}>
                                                    {x.position} ({x.sID})
                                                </option>
                                            )
                                        })}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        )
                    })}
                    <Form.Group className="d-flex">
                        <div className="ml-auto">
                            <Button
                                variant="success"
                                type="submit"
                                className="mx-1"
                            >
                                修改
                            </Button>
                            <Button
                                variant="light"
                                className="mx-1"
                                onClick={(event) => window.location.reload()}
                            >
                                重製
                            </Button>
                        </div>
                    </Form.Group>
                </Form>
            </Jumbotron>
        )
    }
}
