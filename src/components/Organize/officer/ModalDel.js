import React, { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export class ModalDel extends Component {
  delete = (event) => {
    event.preventDefault()
    fetch('http://suiio.nutc.edu.tw:2541/api/officers/delete', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(this.props.officer),
    }).then((resp) => {
      if (parseInt(resp.status / 100) === '2')
        return alert(`${resp.status}　${resp.statusText}`)
      window.location.reload()
    })
  }

  render() {
    return (
      <Modal {...this.props} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>移除職位</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          確定要移除{' '}
          <strong className="text-danger">
            {this.props.officer.position} {this.props.officer.sID}
          </strong>{' '}
          ?
        </Modal.Body>
        <Modal.Footer>
          <Form>
            <Button variant="danger" onClick={this.delete}>
              刪除
            </Button>
            <Button variant="light" onClick={this.props.onHide}>
              取消
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    )
  }
}
