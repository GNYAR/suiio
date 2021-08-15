import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Pen } from 'react-bootstrap-icons'
import { ModalContent } from './ModalContent'
import { ModalAdd } from './ModalAdd'
import { StatusPill } from '../StatusPill'

export class ConferenceList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            conferences: [],
            selected: {},
            content: {},
            ContentShow: false,
            AddShow: false,
            review: false,
        }
        this.update()
    }

    update = () => {
        fetch('http://localhost:4000/api/conference/fetch/all')
            .then((res) => res.json())
            .then((data) => this.setState({ conferences: data }))
    }

    fetchContent = async (id) => {
        await fetch(`http://localhost:4000/api/conference/fetch/content/${id}`)
            .then((res) => res.json())
            .then((data) => this.setState({ content: data[0] }))
    }

    render() {
        return (
            <>
                <Row>
                    <Col xs="12" className="py-3">
                        <Button
                            variant="info"
                            className="float-right"
                            onClick={() => this.setState({ AddShow: true })}
                        >
                            <Pen size="20" className="mr-2" />
                            撰寫紀錄
                        </Button>
                    </Col>
                    {this.state.conferences.map((x) => (
                        <Col className="py-1" md="6" lg="4">
                            <Card
                                bg="dark"
                                className="text-white"
                                onClick={async () => {
                                    await this.fetchContent(x.ID)
                                    this.setState({
                                        selected: x,
                                        ContentShow: true,
                                    })
                                }}
                            >
                                <Card.Header className="text-warning font-weight-bolder">
                                    <Row>
                                        <Col>{x.category}</Col>
                                        <Col xs="auto" className="text-muted">
                                            {x.date}
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <StatusPill
                                        status={x.status}
                                        onClick={() =>
                                            this.setState({ review: true })
                                        }
                                    />
                                    <Card.Title>{x.name}</Card.Title>
                                    <Card.Subtitle className="pb-2 text-info">
                                        主　席：{x.host}
                                    </Card.Subtitle>
                                    <Card.Subtitle className="text-info">
                                        記錄人：{x.recorder}
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <ModalContent
                    show={this.state.ContentShow}
                    conference={this.state.selected}
                    content={this.state.content}
                    review={this.state.review}
                    onHide={() =>
                        this.setState({ ContentShow: false, review: false })
                    }
                />
                <ModalAdd
                    show={this.state.AddShow}
                    onHide={() => this.setState({ AddShow: false })}
                />
            </>
        )
    }
}
