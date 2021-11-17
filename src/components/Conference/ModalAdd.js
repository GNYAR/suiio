import React, { Component } from 'react'
import { Row, Col, Button, Modal, Form } from 'react-bootstrap'

export class ModalAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        category: '0',
        name: '',
        date: '',
        content: '',
        host: '會長',
        recorder: '副會長',
        attendees: [],
      },
      officers: [],
      categories: [],
    }
    this.setOfficers()
    this.setCategories()
  }

  changeHandler = (event) => {
    this.state.form[event.target.name] = event.target.value
  }

  setOfficers = () => {
    fetch(
      `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/api/officers/fetch/all`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ officers: data })
        this.state.form.attendees = data.map((x) => x.position)
      })
  }

  setCategories = () => {
    fetch(
      `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/api/category/fetch/status/1`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ categories: data }))
  }

  add = (event) => {
    event.preventDefault()
    fetch(
      `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/api/conference/add`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(this.state.form),
      }
    ).then((resp) => {
      if (parseInt(resp.status / 100) === '2')
        return alert(`${resp.status}　${resp.statusText}`)
      window.location.reload()
    })
  }

  render() {
    return (
      <Modal {...this.props} backdrop="static" size="xl" centered>
        <Form onSubmit={this.add}>
          <Modal.Header>
            <Modal.Title>
              <strong>撰寫紀錄</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body as={Row}>
            <Col lg="6">
              <Form.Group as={Row}>
                <Form.Label column sm="auto">
                  會議名稱：
                </Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={this.changeHandler}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col lg="6">
              <Form.Group as={Row}>
                <Form.Label column sm="auto">
                  活動類別：
                </Form.Label>
                <Col>
                  <Form.Control
                    as="select"
                    name="category"
                    onChange={this.changeHandler}
                    required
                  >
                    <option value="0">例行會議</option>
                    {this.state.categories?.length
                      ? this.state.categories.map((x) => (
                          <option value={x.ID}>{x.name}</option>
                        ))
                      : null}
                  </Form.Control>
                </Col>
              </Form.Group>
            </Col>
            <Col lg="5">
              <Form.Group as={Row}>
                <Form.Label column sm="auto">
                  日　　期：
                </Form.Label>
                <Col>
                  <Form.Control
                    type="date"
                    name="date"
                    onChange={this.changeHandler}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col lg="7">
              <Form.Group as={Row}>
                <Form.Label column sm="auto">
                  主　　席：
                </Form.Label>
                <Col>
                  <Form.Control
                    as="select"
                    name="host"
                    onChange={this.changeHandler}
                    required
                  >
                    {this.state.officers.map((x) => {
                      if (x.position === '會長') {
                        return (
                          <option value={x.position} selected>
                            {x.position} ({x.sID})
                          </option>
                        )
                      }
                      return (
                        <option value={x.position}>
                          {x.position} ({x.sID})
                        </option>
                      )
                    })}
                  </Form.Control>
                </Col>
              </Form.Group>
            </Col>
            <Col xs="12">
              <Form.Group as={Row}>
                <Form.Label column sm="auto">
                  出席幹部：
                </Form.Label>
                <Col>
                  {this.state.officers.map((x) => (
                    <Form.Check
                      inline
                      label={x.position}
                      name="attendees"
                      className="pl-3"
                      checked={this.state.form.attendees.includes(x.position)}
                      onChange={(event) => {
                        const index = this.state.form.attendees.indexOf(
                          x.position
                        )
                        if (index > -1)
                          this.state.form.attendees.splice(index, 1)
                        else this.state.form.attendees.push(x.position)
                        this.forceUpdate()
                      }}
                    />
                  ))}
                </Col>
              </Form.Group>
            </Col>
            <Col xs="12">
              <Form.Group as={Row}>
                <Form.Label column sm="auto">
                  會議內容：
                </Form.Label>
                <Col>
                  <Form.Control
                    as="textarea"
                    name="content"
                    rows={10}
                    onChange={this.changeHandler}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>
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
