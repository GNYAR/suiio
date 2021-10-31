import React, { Component } from 'react'
import { Row, Col, Card, Button, ButtonToolbar, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap'
import { Pen } from 'react-bootstrap-icons'
import { ModalContent } from './ModalContent'
import { ModalAdd } from './ModalAdd'
import { StatusPill } from '../../StatusPill'

export class AccountList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: {},
            ContentShow: false,
            AddShow: false,
            review: false,
            pages: [],
            pagenumber: 0,
        }
        this.update()
    }

    update = () => {
        fetch('http://suiio.nutc.edu.tw:2541/api/account/fetch/all')
            .then((res) => res.json())
            .then((data) => {
                let cnt = 0
                const pages = data.reduce((arr, v, k) => {
                    const n = k % 12
                    if(n) {
                        arr[cnt][n] = v
                    } else {
                        cnt++
                        arr = [...arr, [v]]
                    }
                    return arr
                }, [[]])
                pages.shift()
                this.setState({pages})
            })
    }

    onHide = (show) => {
        this.setState({ [show]: false, review: false })
        this.update()
    }

    fetchContent = async (id) => {
        await fetch(`http://suiio.nutc.edu.tw:2541/api/account/fetch/id/${id}`)
            .then((res) => res.json())
            .then((data) => this.setState({ selected: data[0] }))
    }

    render() {
        return (
            <>
                <Row noGutters>
                    <Col xs="12" className="py-2">
                        <ButtonToolbar className="justify-content-between">
                            <ButtonGroup className="mr-2" aria-label="First group">
                                <Button variant="secondary" onClick={() => {
                                    if(this.state.pagenumber)
                                        this.setState({ pagenumber: this.state.pagenumber-1})
                                }}>&lt;</Button>
                                <DropdownButton as={ButtonGroup} title={this.state.pagenumber+1} variant="secondary">
                                        {this.state.pages.map((v, i) => {
                                            return (
                                                <Dropdown.Item
                                                    active = { this.state.pagenumber === i }
                                                    onClick={() => this.setState({ pagenumber: i })}
                                                >{i+1}</Dropdown.Item>
                                            )
                                        })}
                                </DropdownButton>
                                <Button variant="secondary" onClick={() => {
                                    if(this.state.pagenumber < this.state.pages.length-1)
                                        this.setState({ pagenumber: this.state.pagenumber+1})
                                }}>&gt;</Button>
                            </ButtonGroup>
                            <Button
                                variant="info"
                                onClick={() => this.setState({ AddShow: true })}
                            >
                                <Pen size="20" className="mr-2" />
                                提交申請
                            </Button>
                        </ButtonToolbar>
                    </Col>
                    {this.state.pages.length ?
                    this.state.pages[this.state.pagenumber].map(x => (
                        <Col className="px-1 py-2" md="6" lg="4">
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
                    )) : "No Data"}
                </Row>
                <ModalContent
                    show={this.state.ContentShow}
                    account={this.state.selected}
                    review={this.state.review}
                    onHide={() => this.onHide("ContentShow")}
                />
                <ModalAdd
                    show={this.state.AddShow}
                    onHide={() => this.onHide("AddShow")}
                />
            </>
        )
    }
}