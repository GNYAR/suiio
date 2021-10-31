import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { StatementTable } from './StatementTable'

export class ModalContent extends Component {
  updateStatus = (id, status) => {
    console.log(JSON.stringify({ id, status }))
    fetch('http://suiio.nutc.edu.tw:2541/api/statement/update/status', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ ID: id, status }),
    }).then((resp) => {
      if (parseInt(resp.status / 100) === '2')
        return alert(`${resp.status}　${resp.statusText}`)
      // this.props.onHide()
    })
  }

  render() {
    return (
      <Modal {...this.props} backdrop="static" size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>{this.props.statement.name}</strong>
          </Modal.Title>
          {this.props.statement.category === '其他項目' ? (
            <span className="ml-5 bg-primary text-white px-2 rounded">
              每月財報
            </span>
          ) : (
            <span className="ml-5 bg-warning px-2 rounded">
              {this.props.statement.category}
            </span>
          )}
          <strong className="text-info ml-3">
            製表人：{this.props.statement.uploadBy}
          </strong>
          <span className="text-muted ml-3">{this.props.statement.date}</span>
        </Modal.Header>
        <Modal.Body>
          <StatementTable
            accounts={this.props.statement.accounts}
            statement={this.props.statement}
          />
        </Modal.Body>
        {this.props.review ? (
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                // eslint-disable-next-line default-case
                switch (this.props.statement.status) {
                  case '0':
                    this.updateStatus(this.props.statement.ID, 2)
                    break
                  case '2':
                  case '3':
                    this.updateStatus(this.props.statement.ID, 1)
                    break
                }
              }}
            >
              通過
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                this.updateStatus(this.props.statement.ID, 4)
              }}
            >
              駁回
            </Button>
            <Button variant="light" onClick={this.props.onHide}>
              取消
            </Button>
          </Modal.Footer>
        ) : null}
      </Modal>
    )
  }
}
