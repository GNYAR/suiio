import React, { Component } from 'react'
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import { XCircle, PlusLg } from 'react-bootstrap-icons'
import { ModalDel } from './ModalDel'

export class CategoryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      category: { id: '', name: 'ew' },
      DeleteShow: false,
      newCate: '',
    }
    fetch('http://suiio.nutc.edu.tw:2541/api/category/fetch/all')
      .then((res) => res.json())
      .then((data) => this.setState({ categories: data }))
  }

  update = () => {
    fetch('http://suiio.nutc.edu.tw:2541/api/category/fetch/all')
      .then((res) => res.json())
      .then((data) => this.setState({ categories: data }))
    this.setState({ newCate: '' })
  }

  add = (event) => {
    event.preventDefault()
    fetch('http://suiio.nutc.edu.tw:2541/api/category/add', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ name: this.state.newCate }),
    }).then((resp) => {
      if (parseInt(resp.status / 100) === '2')
        return alert(`${resp.status}　${resp.statusText}`)
      this.update()
    })
  }

  switch = (cate) => {
    const data = {
      ID: cate.ID,
      status: cate.status ? 0 : 1,
    }
    fetch('http://suiio.nutc.edu.tw:2541/api/category/update/status', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data),
    }).then((resp) => {
      if (parseInt(resp.status / 100) === '2')
        return alert(`${resp.status}　${resp.statusText}`)
      this.update()
    })
  }

  render() {
    return (
      <>
        <Row>
          <Col
            sm={{ span: 8, offset: 4 }}
            lg={{ span: 4, offset: 8 }}
            className="py-1"
          >
            <InputGroup className="mb-3">
              <FormControl
                placeholder="活動名稱"
                value={this.state.newCate}
                onChange={(event) =>
                  this.setState({
                    newCate: event.target.value,
                  })
                }
              />
              <InputGroup.Append>
                <Button variant="info" onClick={this.add}>
                  <PlusLg size="14" className="mr-2" />
                  新增
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          {this.state.categories.map((x) => (
            <Col className="py-3" sm="6" lg="3">
              <Card body bg="dark" className="text-white">
                <Card.Title className="my-auto" as={Row}>
                  <Form.Check
                    type="switch"
                    id={x.ID}
                    label={x.name}
                    className="ml-3"
                    defaultChecked={x.status}
                    onChange={() => this.switch(x)}
                  />
                  <Button
                    variant="dark"
                    className="px-2 pt-0 pb-1 ml-auto"
                    onClick={() => {
                      this.setState({ category: x })
                      this.setState({ DeleteShow: true })
                    }}
                  >
                    <XCircle size="20" />
                  </Button>
                </Card.Title>
              </Card>
            </Col>
          ))}
        </Row>
        <ModalDel
          category={this.state.category}
          show={this.state.DeleteShow}
          onHide={() => {
            this.setState({ DeleteShow: false })
            this.update()
          }}
        />
      </>
    )
  }
}
