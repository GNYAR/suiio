import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { StatementTable } from './StatementTable'

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
                size="xl"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <strong>
                            【110】大迎新 財務報表
                        </strong>
                    </Modal.Title>
                    <span className="ml-5 bg-warning px-2 rounded">活動報表</span>
                    <strong className="text-info ml-3">製表人：財務長</strong>
                    <span className="text-muted ml-3">2021-10-25</span>
                </Modal.Header>
                <Modal.Body>
                    <StatementTable />
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
                    </Modal.Footer> : null
                }
            </Modal>
        )
    }
}
