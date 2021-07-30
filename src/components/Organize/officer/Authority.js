/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react'
import { Jumbotron, Row, Col, Button, Form } from 'react-bootstrap'

const authorities = {
    組織負責人: 'organize',
    財務負責人: 'finance',
    會議負責人: 'conference',
}

export class Authority extends Component {
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
        fetch('http://localhost:4000/api/officers/update/authority', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(data),
        })
            .then((resp) => {
                console.log(data)
                if (resp.status !== 200)
                    return alert(`${resp.status}　${resp.statusText}`)
            })
            .then(window.location.reload())
    }

    render() {
        return (
            <Jumbotron className="mt-5 py-3">
                <h3 className="font-weight-bold">權限管理</h3>
                <Form onSubmit={this.update}>
                    {Object.keys(authorities).map((auth) => {
                        return (
                            <Form.Group as={Row}>
                                <Form.Label column="lg" lg={2}>
                                    {auth}
                                </Form.Label>
                                <Col lg={5} className="py-1">
                                    <Form.Control
                                        as="select"
                                        size="lg"
                                        onChange={(event) => {
                                            this.state[authorities[auth]][0] =
                                                event.target.value
                                        }}
                                    >
                                        {this.props.officers.map((x) => {
                                            if (
                                                !this.state[
                                                    authorities[auth]
                                                ][0] &&
                                                x.authority === auth
                                            ) {
                                                this.state[
                                                    authorities[auth]
                                                ][0] = x.position
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
                                            this.state[authorities[auth]][1] =
                                                event.target.value
                                        }}
                                    >
                                        <option value={null}>---------</option>
                                        {this.props.officers.map((x) => {
                                            if (
                                                x.position !==
                                                    this.state[
                                                        authorities[auth]
                                                    ][0] &&
                                                x.authority === auth
                                            ) {
                                                this.state[
                                                    authorities[auth]
                                                ][1] = x.position
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
