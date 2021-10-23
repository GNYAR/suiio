import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Pen } from 'react-bootstrap-icons'
import { ModalContent } from './ModalContent'
import { ModalAdd } from './ModalAdd'
import { StatusPill } from '../../StatusPill'

export class AccountList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accounts: [],
            selected: {},
            ContentShow: false,
            AddShow: false,
            review: false
        }
        this.update()
    }

    update = () => {
        fetch('http://suiio.nutc.edu.tw:2541/api/account/fetch/all')
            .then((res) => res.json())
            .then((data) => this.setState({ accounts: data }))
    }

    fetchContent = async (id) => {
        await fetch(`http://suiio.nutc.edu.tw:2541/api/account/fetch/id/${id}`)
            .then((res) => res.json())
            .then((data) => this.setState({ selected: data[0] }))
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
                            提交申請
                        </Button>
                    </Col>
                    {this.state.accounts?.result ??
                    this.state.accounts?.map(x => (
                        <Col className="py-1" md="6" lg="4">
                            <Card
                                bg="dark"
                                className="text-white"
                                onClick={async () => {
                                    await this.fetchContent(x.ID)
                                    this.setState({ ContentShow: true })
                                }}
                            >
                                <Card.Header className="text-warning font-weight-bolder">
                                    <Row>
                                        <Col>{x.category}</Col>
                                        <Col xs="auto" className="text-muted">{x.date}</Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <StatusPill status={x.status} onClick={() => this.setState({ review: true })} />
                                    <Card.Title>{x.name}</Card.Title>
                                    <div className="d-flex">
                                        <Card.Subtitle className="pb-2 text-info">
                                            <div>申請人：{x.uploadBy}</div>
                                        </Card.Subtitle>
                                        <h4 className={`ml-auto ${x.amount > 0 ? "text-success" : "text-danger"}`}><b>{x.amount}</b></h4>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <ModalContent
                    show={this.state.ContentShow}
                    account={this.state.selected}
                    review={this.state.review}
                    onHide={() => {
                        this.setState({ ContentShow: false, review: false })
                        this.update()
                    }}
                />
                <ModalAdd show={this.state.AddShow} onHide={() => this.setState({ AddShow: false })} />
            </>
        )
    }
}