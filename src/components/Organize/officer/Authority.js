import React from 'react'
import { Jumbotron, Row, Col, Button, Form } from 'react-bootstrap'

export const Authority = (props) => (
  <Jumbotron className="mt-5 py-3">
    <h3 className="font-weight-bold">權限管理</h3>
    <Form>
      {Object.keys(props.authorities).map(auth => (
        <Form.Group as={Row}>
          <Form.Label column="lg" lg={2}>{auth}</Form.Label>
          <Col lg={5} className="py-1">
            <Form.Control as="select" size="lg" >
              {Object.keys(props.officers).map(x => (
                <option>{x}</option>
              ))}
            </Form.Control>
          </Col>
          <Col lg={5} className="py-1">
            <Form.Control as="select" size="lg" >
              {Object.keys(props.officers).map(x => (
                <option>{x}</option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
      ))}
      <Form.Group className="d-flex">
        <div className="ml-auto">
          <Button variant="success" type="submit" className="mx-1">修改</Button>
          <Button variant="light" type="reset" className="mx-1">重製</Button>
        </div>
      </Form.Group>
    </Form>
  </Jumbotron>
)

