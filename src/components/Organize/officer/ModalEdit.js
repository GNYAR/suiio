import React, { Component } from 'react'
import { Row, Col, Button, Modal, Form } from 'react-bootstrap'

export class ModalEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sID: '',
    }
  }

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  edit = (event) => {
    event.preventDefault()
    fetch('http://suiio.nutc.edu.tw:2541/api/officers/update/officer', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        sID: this.state.sID,
        position: this.props.officer.position,
      }),
    }).then((resp) => {
      if (parseInt(resp.status / 100) === '2')
        return alert(`${resp.status}　${resp.statusText}`)
      window.location.reload()
    })
  }

  render() {
    return (
      <Modal {...this.props} size="md" centered>
        <Form onSubmit={this.edit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>編輯職位</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                職位名稱：
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={this.props.officer.position}
                  className="font-weight-bold"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                學　　號：
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  defaultValue={this.props.officer.sID}
                  name="sID"
                  onChange={this.changeHandler}
                />
              </Col>
              <Col sm={{ offset: 3 }}>
                <Form.Text className="text-danger">
                  請輸入學號10碼(不加s)
                </Form.Text>
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              修改
            </Button>
            <Button variant="light" onClick={this.props.onHide}>
              取消
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}
