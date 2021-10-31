import React, { Component } from 'react'
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export class ModalContent extends Component {
  updateStatus = (ID, status) => {
    fetch('http://suiio.nutc.edu.tw:2541/api/account/update/status', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ ID, status }),
    }).then((resp) => {
      if (parseInt(resp.status / 100) === '2')
        return alert(`${resp.status}　${resp.statusText}`)
      window.location.reload()
    })
  }

  render() {
    return (
      <Modal {...this.props} backdrop="static" size="md" centered>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>
                <span className="text-success pr-3">
                  {this.props.account.category}
                </span>
                {this.props.account.name}
              </strong>
            </Modal.Title>
            <span className="text-muted pl-5">{this.props.account.date}</span>
          </Modal.Header>
          <Modal.Body as={Row}>
            <Col xs="auto">
              <h6>
                申請人：
                <strong className="text-primary">
                  {this.props.account.uploadBy}
                </strong>
              </h6>
            </Col>
            <Col xs="auto" className="ml-auto">
              <h4
                className={`ml-auto ${
                  this.props.account.amount > 0 ? 'text-success' : 'text-danger'
                }`}
              >
                <b>{this.props.account.amount}</b>
              </h4>
            </Col>
            {this.props.account.content ? (
              <Col xs="12">
                <Form.Control
                  as="textarea"
                  rows={8}
                  readOnly
                  defaultValue={this.props.account.content}
                />
              </Col>
            ) : (
              ''
            )}
          </Modal.Body>
          {this.props.review ? (
            <Modal.Footer>
              <Button
                variant="success"
                onClick={() => {
                  // eslint-disable-next-line default-case
                  switch (this.props.account.status) {
                    case '0':
                      this.updateStatus(this.props.account.ID, 2)
                      break
                    case '2':
                    case '3':
                      this.updateStatus(this.props.account.ID, 1)
                      break
                  }
                }}
              >
                通過
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  this.updateStatus(this.props.account.ID, 4)
                }}
              >
                駁回
              </Button>
              <Button variant="light" onClick={this.props.onHide}>
                取消
              </Button>
            </Modal.Footer>
          ) : null}
        </Form>
      </Modal>
    )
  }
}
