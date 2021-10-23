import React, { Component } from 'react'
import { Row, Col, Card, Dropdown } from 'react-bootstrap'
import { ModalContent } from './ModalContent'
import { ModalAdd } from './ModalAdd'
import { StatusPill } from '../../StatusPill'

export class StatementList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statements: [],
            selected: {},
            accounts: [],
            ContentShow: false,
            class: "",
            AddShow: false,
            review: false
        }
        this.update()
    }

    update = () => {
        fetch('http://suiio.nutc.edu.tw:2541/api/statement/fetch/all')
            .then((res) => res.json())
            .then((data) => this.setState({ statements: data }))
    }

    fetchContent = async (id) => {
        await fetch(`http://suiio.nutc.edu.tw:2541/api/statement/fetch/content/${id}`)
            .then((res) => res.json())
            .then((data) => this.setState({ accounts: data }))
    }

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
                    {this.state.statements.map(x => (
                        <Col className="py-1" md="6" lg="4">
                            <Card
                                bg="dark"
                                className="text-white"
                                onClick={async () => {
                                    this.setState({ selected: x, ContentShow: true })
                                    await this.fetchContent(x.ID)
                                }}
                            >
                                <Card.Header className="font-weight-bolder">
                                    <Row>
                                        <Col>{x.category === '其他項目' ?
                                            <span className="px-2 rounded bg-primary">{new Date(x.date).getMonth() + 1} 月財報</span>
                                            :
                                            <span className="px-2 rounded bg-warning text-dark">{x.category}</span>
                                        }</Col>
                                        <Col xs="auto" className="text-muted">{x.date}</Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <StatusPill status={x.status} onClick={() => this.setState({ review: true })} />
                                    <Card.Title>{x.name}</Card.Title>
                                    <Card.Subtitle className="pb-2 text-info">
                                        <div>製表人：{x.uploadBy}</div>
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <ModalContent
                    show={this.state.ContentShow}
                    statement={this.state.selected}
                    accounts={this.state.accounts}
                    review={this.state.review}
                    onHide={() => this.setState({ ContentShow: false, review: false })}
                />
                <ModalAdd class={this.state.class} show={this.state.AddShow} onHide={() => this.setState({ AddShow: false })} />
            </>
        )
    }
}