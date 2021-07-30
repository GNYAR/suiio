import React, { Component } from 'react'
import {
    Row,
    Col,
    Card,
    Button,
    InputGroup,
    FormControl,
} from 'react-bootstrap'
import { XCircle, PlusLg } from 'react-bootstrap-icons'
import { ModalDel } from './ModalDel'

export class MemberList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            members: [],
            sID: '',
            DeleteShow: false,
            newSID: ''
        }
        fetch('http://localhost:4000/api/user/list')
            .then((res) => res.json())
            .then((data) => this.setState({ members: data }))
    }

    update = () => {
        fetch('http://localhost:4000/api/user/list')
            .then((res) => res.json())
            .then((data) => this.setState({ members: data }))
        this.setState({ newSID: '' })
    }

    add = (event) => {
        event.preventDefault()
        fetch('http://localhost:4000/api/user/add', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ sID: this.state.newSID }),
        }).then(resp => {
            if (resp.status !== 200)
                return alert(`${resp.status}　${resp.statusText}`)
            this.update()
        })
    }

    render() {
        return (
            <>
                <Row>
                    <Col
                        sm={{ span: 8, offset: 4 }}
                        lg={{ span: 4, offset: 8 }}
                        className="py-1"
                    >
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="成員學號"
                                value={this.state.newSID}
                                onChange={(event) => this.setState({ newSID: event.target.value })}
                            />
                            <InputGroup.Append>
                                <Button variant="info" onClick={this.add}>
                                    <PlusLg size="14" className="mr-2" />
                                    新增
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    {this.state.members.map(x => (
                        <Col className="py-1" sm="6" lg="3">
                            <Card body bg="dark" className="text-white">
                                <Card.Title className="my-auto" as={Row}>
                                    <h5 className="pl-3">{x.sID}</h5>
                                    <Button
                                        variant="dark"
                                        className="px-2 pt-0 pb-1 ml-auto"
                                        onClick={() => {
                                            this.setState({ sID: x.sID })
                                            this.setState({ DeleteShow: true })
                                        }}
                                    >
                                        <XCircle size="20" />
                                    </Button>
                                </Card.Title>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <ModalDel
                    sID={this.state.sID}
                    show={this.state.DeleteShow}
                    onHide={() => {
                        this.setState({ DeleteShow: false })
                        this.update()
                    }}
                />
            </>
        )
    }
}