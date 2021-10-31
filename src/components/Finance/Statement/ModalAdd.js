import React, { Component } from 'react'
import { Row, Col, Button, Modal, Form } from 'react-bootstrap'
import { StatementTable } from './StatementTable'

export class ModalAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      categories: [],
      accounts: [],
    }
    this.getCategories()
  }

  getCategories = () => {
    fetch('http://suiio.nutc.edu.tw:2541/api/category/fetch/all')
      .then((res) => res.json())
      .then((data) => this.setState({ categories: data }))
  }

  setAccounts = (month) => {
    fetch(`http://suiio.nutc.edu.tw:2541/api/account/fetch/date/${month}`)
      .then((res) => res.json())
      .then((data) => this.setState({ accounts: data }))
  }

  changeHandler = (event) => {
    if (event.target.name === 'month') this.setAccounts(event.target.value)
    else this.setState({ [event.target.name]: event.target.value })
  }

  add = (event) => {
    event.preventDefault()
    fetch('http://suiio.nutc.edu.tw:2541/api/statement/add/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        name: this.state.name,
        category: 0,
        uploadBy: '財務長',
        content: this.state.accounts.reduce((arr, x) => [...arr, x.ID], []),
      }),
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
          <Modal.Header className="justify-content-start">
            <Modal.Title>
              <strong>建立報表</strong>
            </Modal.Title>
            <span
              className={`ml-5 px-2 rounded ${
                this.props.class === '每月報表'
                  ? 'bg-primary text-white'
                  : 'bg-warning'
              }`}
            >
              {this.props.class}
            </span>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg="6">
                <Form.Group as={Row}>
                  <Form.Label column sm="auto">
                    報表名稱：
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="text"
                      name="name"
                      onChange={this.changeHandler}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col lg="6">
                {this.props.class === '每月報表' ? (
                  <Form.Group as={Row}>
                    <Form.Label column sm="auto">
                      月份：
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="month"
                        name="month"
                        onChange={this.changeHandler}
                      />
                    </Col>
                  </Form.Group>
                ) : (
                  <Form.Group as={Row}>
                    <Form.Label column sm="auto">
                      活動類型：
                    </Form.Label>
                    <Col>
                      <Form.Control
                        as="select"
                        name="category"
                        onChange={this.changeHandler}
                      >
                        <option selected disabled>
                          請選擇活動 ...
                        </option>
                        {this.state.categories.map((x) => {
                          return <option value={x.ID}>{x.name}</option>
                        })}
                      </Form.Control>
                    </Col>
                  </Form.Group>
                )}
              </Col>
            </Row>
            {this.state.accounts.length ? (
              <StatementTable
                statement={{
                  accounts: this.state.accounts,
                  category: '其他項目',
                }}
              />
            ) : (
              <h3 className="py-5 text-center">
                <span className="px-5 py-2 rounded bg-secondary text-white">
                  No Data
                </span>
              </h3>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" type="submit">
              新增
            </Button>
            <Button
              variant="light"
              onClick={() => {
                this.setState({ type: '' })
                this.props.onHide()
              }}
            >
              取消
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}
