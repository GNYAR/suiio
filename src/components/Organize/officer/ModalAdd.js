import React, { Component } from 'react'
import { Row, Col, Button, Modal, Form } from 'react-bootstrap'

export class ModalAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: '',
      sID: '',
    }
  }

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  add = (event) => {
    event.preventDefault()
    fetch(
      `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/api/officers/add`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(this.state),
      }
    ).then((resp) => {
      if (parseInt(resp.status / 100) === '2')
        return alert(`${resp.status}　${resp.statusText}`)
      window.location.reload()
    })
  }

  render() {
    return (
      <Modal {...this.props} size="md" centered>
        <Form onSubmit={this.add}>
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>新增幹部</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                職位名稱：
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="position"
                  onChange={this.changeHandler}
                  required
                />
              </Col>
              <Col sm={{ offset: 3 }}>
                <Form.Text className="text-muted">請勿輸入重複職位</Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                學　　號：
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  name="sID"
                  onChange={this.changeHandler}
                  required
                />
              </Col>
              <Col sm={{ offset: 3 }}>
                <Form.Text className="text-muted">
                  請輸入學號10碼(不加s)
                </Form.Text>
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" type="submit">
              新增
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
