import React, { Component } from 'react'
import { Row, Col, Card, Dropdown } from 'react-bootstrap'
import { ModalContent } from './ModalContent'
import { ModalAdd } from './ModalAdd'
import { StatusPill } from '../../StatusPill'

export class StatementList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            conferences: [],
            selected: {},
            content: {},
            ContentShow: false,
            class: "",
            AddShow: false,
            review: false
        }
        // this.update()
    }

    // update = () => {
    //     fetch('http://localhost:4000/api/conference/fetch/all')
    //         .then((res) => res.json())
    //         .then((data) => this.setState({ conferences: data }))
    // }

    // fetchContent = (id) => {
    //     fetch(`http://localhost:4000/api/conference/fetch/content/${id}`)
    //         .then((res) => res.json())
    //         .then((data) => this.setState({ content: data[0] }))
    // }

    render() {
        return (
            <>
                <Row>
                    <Col xs="12" className="py-3">
                        <Dropdown className="float-right" alignRight>
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                建立報表
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => this.setState({ class: "每月報表", AddShow: true })}
                                >
                                    每月報表
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => this.setState({ class: "活動報表", AddShow: true })}
                                >
                                    活動報表
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col className="py-1" md="6" lg="4">
                        <Card
                            bg="dark"
                            className="text-white"
                            onClick={() => {
                                this.setState({ selected: "s", ContentShow: true })
                                // this.fetchContent(x.ID)
                            }}
                        >
                            <Card.Header className="font-weight-bolder">
                                <Row>
                                    <Col><span className="px-2 rounded bg-warning text-dark">活動報表</span></Col>
                                    <Col xs="auto" className="text-muted">2021-10-25</Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <StatusPill status={0} onClick={() => this.setState({ review: true })} />
                                <Card.Title>【110】大迎新 財務報表</Card.Title>
                                <Card.Subtitle className="pb-2 text-info">
                                    <div>製表人：財務長</div>
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="py-1" md="6" lg="4">
                        <Card
                            bg="dark"
                            className="text-white"
                            onClick={() => {
                                this.setState({ selected: "s", ContentShow: true })
                                // this.fetchContent(x.ID)
                            }}
                        >
                            <Card.Header className="font-weight-bolder">
                                <Row>
                                    <Col><span className="px-2 rounded bg-primary">每月報表</span></Col>
                                    <Col xs="auto" className="text-muted">2021-10-5</Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <StatusPill status={0} onClick={() => this.setState({ review: true })} />
                                <Card.Title>【110】9 月份 財務報表</Card.Title>
                                <Card.Subtitle className="pb-2 text-info">
                                    <div>製表人：財務長</div>
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <ModalContent
                    show={this.state.ContentShow}
                    conference={this.state.selected}
                    content={this.state.content}
                    review={this.state.review}
                    onHide={() => this.setState({ ContentShow: false, review: false })}
                />
                <ModalAdd class={this.state.class} show={this.state.AddShow} onHide={() => this.setState({ AddShow: false })} />
            </>
        )
    }
}