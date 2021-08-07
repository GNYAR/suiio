import React, { Component } from 'react'
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export class ModalContent extends Component {

    updateStatus = (id, status) => {
        // fetch('http://localhost:4000/api/conference/update/status', {
        //     method: 'POST',
        //     headers: new Headers({
        //         'Content-Type': 'application/json',
        //     }),
        //     body: JSON.stringify({ id, status }),
        // }).then((resp) => {
        //     if (resp.status !== 200)
        //         return alert(`${resp.status}　${resp.statusText}`)
        //     window.location.reload()
        // })
    }

    render() {
        return (
            <Modal
                {...this.props}
                backdrop="static"
                size="md"
                centered>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <strong>
                                <span className="text-success pr-3">大迎新</span>
                                夜遊用品(火把)
                            </strong>
                        </Modal.Title>
                        <span className="text-muted pl-5">2021-7-14</span>
                    </Modal.Header>
                    <Modal.Body as={Row}>
                        <Col xs="auto">
                            <h6>申請人：
                                <strong className="text-primary">
                                    公關長
                                </strong>
                            </h6>
                        </Col>
                        <Col xs="auto" className="ml-auto">
                            <h3 className="font-weight-bold text-danger">
                                -270
                            </h3>
                        </Col>
                        <Col xs="12">
                            <Form.Control
                                as="textarea"
                                rows={8}
                                readOnly
                                defaultValue="火把：90元 * 3支 = 270元"
                            />
                        </Col>
                    </Modal.Body>
                    {this.props.review ?
                        <Modal.Footer>
                            <Button variant="success" onClick={() => {
                                // eslint-disable-next-line default-case
                                switch (this.props.conference.status) {
                                    case "0":
                                        this.updateStatus(this.props.conference.ID, 2)
                                        break;
                                    case "2":
                                    case "3":
                                        this.updateStatus(this.props.conference.ID, 1)
                                        break;
                                }
                            }}>
                                通過
                            </Button>
                            <Button variant="danger" onClick={() => {
                                this.updateStatus(this.props.conference.ID, 4)
                            }}>
                                駁回
                            </Button>
                            <Button variant="light" onClick={this.props.onHide}>
                                取消
                            </Button>
                        </Modal.Footer> : null}
                </Form>
            </Modal >
        )
    }
}
