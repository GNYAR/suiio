import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Pen } from 'react-bootstrap-icons'
import { ModalContent } from './ModalContent'
import { ModalAdd } from './ModalAdd'
import { StatusPill } from './StatusPill'

export class AccountList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            conferences: [],
            selected: {},
            content: {},
            ContentShow: false,
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
                        <Button
                            variant="info"
                            className="float-right"
                            onClick={() => this.setState({ AddShow: true })}
                        >
                            <Pen size="20" className="mr-2" />
                            提交申請
                        </Button>
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
                            <Card.Header className="text-primary font-weight-bolder">
                                <Row>
                                    <Col>大迎新</Col>
                                    <Col xs="auto" className="text-muted">2021-7-14</Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <StatusPill status={0} onClick={() => this.setState({ review: true })} />
                                <Card.Title>夜遊用品(火把)</Card.Title>
                                <div className="d-flex">
                                    <Card.Subtitle className="pb-2 text-info">
                                        <div>申請人：公關長</div>
                                    </Card.Subtitle>
                                    <h4 className="ml-auto text-danger"><b>-270</b></h4>
                                </div>
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
                <ModalAdd show={this.state.AddShow} onHide={() => this.setState({ AddShow: false })} />
            </>
        )
    }
}