import React, { Component } from 'react'
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export class ModalContent extends Component {

    updateStatus = (id, status) => {
        fetch('http://localhost:4000/api/conference/update/status', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ id, status }),
        }).then((resp) => {
            if (resp.status !== 200)
                return alert(`${resp.status}　${resp.statusText}`)
            window.location.reload()
        })
    }

    render() {
        return (
            <Modal
                {...this.props}
                backdrop="static"
                size="xl"
                centered>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <strong>
                                <span className="text-success pr-3">{this.props.conference.category}</span>
                                {this.props.conference.name}
                            </strong>
                        </Modal.Title>
                        <span className="text-muted pl-5">{this.props.conference.date}</span>
                    </Modal.Header>
                    <Modal.Body as={Row}>
                        <Col xs="2">
                            <h6>主　　席：
                                <strong className="text-primary">
                                    {this.props.conference.host}
                                </strong>
                            </h6>
                        </Col>
                        <Col xs="5">
                            <h6>出席幹部：
                                <strong className="text-info">
                                    會長, 副會長, 活動長, 器材長
                                </strong>
                            </h6>
                        </Col>
                        <Col xs="5">
                            <h6>缺席幹部：
                                <strong className="text-danger">
                                    體育長, 資訊長
                                </strong>
                            </h6>
                        </Col>
                        <Col xs="12" className="pt-3">
                            <Form.Control as="textarea" rows={15} readOnly defaultValue={this.props.content.content} />
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
