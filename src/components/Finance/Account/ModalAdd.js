import React, { Component } from 'react'
import { Row, Col, Button, Modal, Form, InputGroup } from 'react-bootstrap'

export class ModalAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        category: '0',
        name: '',
        date: '',
        content: '',
        amount: '',
        uploadBy: '財務長',
      },
      type: -1,
      categories: [],
    }
    this.setCategories()
  }

  changeHandler = (event) => {
    this.state.form[event.target.name] = event.target.value
  }

  setCategories = () => {
    fetch('http://suiio.nutc.edu.tw:2541/api/category/fetch/status/1')
      .then((res) => res.json())
      .then((data) => this.setState({ categories: data }))
  }

  add = (event) => {
    event.preventDefault()
    this.state.form.amount *= this.state.type
    fetch('http://suiio.nutc.edu.tw:2541/api/account/add', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(this.state.form),
    }).then((resp) => {
      if (parseInt(resp.status / 100) === '2')
        return alert(`${resp.status}　${resp.statusText}`)
      this.props.onHide()
    })
  }

  render() {
    return (
      <Modal {...this.props} backdrop="static" size="xl" centered>
        <Form onSubmit={this.add}>
          <Modal.Header>
            <Modal.Title>
              <strong>提交申請</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body as={Row}>
            <Col lg="6">
              <Form.Group as={Row}>
                <Form.Label column sm="auto">
                  收支名稱：
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
                    <option value="1">一般開銷</option>
                    {this.state.categories.map((x) => (
                      <option value={x.ID}>{x.name}</option>
                    ))}
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
            <Col lg="auto" className="ml-auto">
              <Form.Group className="my-2">
                <Form.Check
                  type="radio"
                  inline
                  label="收入"
                  className="text-success font-weight-bold"
                  name="type"
                  onChange={(event) => this.setState({ type: 1 })}
                />
                <Form.Check
                  type="radio"
                  inline
                  label="支出"
                  className="text-danger font-weight-bold"
                  name="type"
                  onChange={(event) => this.setState({ type: -1 })}
                  checked
                />
              </Form.Group>
            </Col>
            <Col lg="auto">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>NTD</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  name="amount"
                  onChange={this.changeHandler}
                  required
                />
              </InputGroup>
            </Col>
            <Col xs="12">
              <Form.Group as={Row}>
                <Form.Label column sm="auto">
                  細部說明：
                </Form.Label>
                <Col>
                  <Form.Control
                    as="textarea"
                    name="content"
                    rows={8}
                    onChange={this.changeHandler}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row}>
                <Form.Label column sm="auto">
                  發票收據：
                </Form.Label>
                <Col>
                  <Form.File />
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
