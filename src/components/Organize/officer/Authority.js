import React from 'react';
import { Jumbotron, Row, Col, Button, Form } from 'react-bootstrap';

const authorities = ["組織負責人", "財務負責人", "會議負責人"];
export const Authority = (props) => (
  <Jumbotron className="mt-5 py-3">
    <h3 className="font-weight-bold">權限管理</h3>
    <Form>
      {authorities.map(auth => {
        let first = "";
        return (
          <Form.Group as={Row}>
            <Form.Label column="lg" lg={2}>{auth}</Form.Label>
            <Col lg={5} className="py-1">
              <Form.Control as="select" size="lg" >
                {
                  props.officers.map(x => {
                    if (first === "" && x.authority === auth) {
                      first = x.position;
                      return <option selected>{x.position} ({x.sID})</option>
                    }
                    return <option>{x.position} ({x.sID})</option>
                  })
                }
              </Form.Control>
            </Col>
            <Col lg={5} className="py-1">
              <Form.Control as="select" size="lg" >
                <option>---------</option>
                {
                  props.officers.map(x => {
                    if (x.position !== first && x.authority === auth)
                      return <option selected>{x.position} ({x.sID})</option>
                    return <option>{x.position} ({x.sID})</option>
                  })
                }
              </Form.Control>
            </Col>
          </Form.Group>
        )
      })}
      <Form.Group className="d-flex">
        <div className="ml-auto">
          <Button variant="success" type="submit" className="mx-1">修改</Button>
          <Button variant="light" className="mx-1" onClick={(event) => window.location.reload()}>重製</Button>
        </div>
      </Form.Group>
    </Form>
  </Jumbotron>
)

