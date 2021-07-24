import React from 'react'
import { Row, Col, Button, Modal, Form } from 'react-bootstrap'

export const OfficeModal = {
  ADD: (props) => {
    return (
      <Modal {...props} size="md" centered>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title><strong>新增幹部</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>職位名稱：</Form.Label>
              <Col sm={9}>
                <Form.Control type="text" />
              </Col>
              <Col sm={{ offset: 3 }}>
                <Form.Text className="text-muted">請勿輸入重複職位</Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>學　　號：</Form.Label>
              <Col sm={9}>
                <Form.Control type="number" />
              </Col>
              <Col sm={{ offset: 3 }}>
                <Form.Text className="text-muted">請輸入學號10碼(不加s)</Form.Text>
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" type="submit">新增</Button>
            <Button variant="light" onClick={props.onHide}>取消</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  },
  EDIT: (props) => {
    return (
      <Modal {...props} size="md" centered>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title><strong>編輯職位</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>職位名稱：</Form.Label>
              <Col sm={9}>
                <Form.Control plaintext readOnly defaultValue={props.position} className="font-weight-bold" />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>學　　號：</Form.Label>
              <Col sm={9}>
                <Form.Control type="number" defaultValue="1110634000" />
              </Col>
              <Col sm={{ offset: 3 }}>
                <Form.Text className="text-danger">請輸入學號10碼(不加s)</Form.Text>
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">修改</Button>
            <Button variant="light" onClick={props.onHide}>取消</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  },
  DELETE: (props) => {
    return (
      <Modal {...props} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title><strong>移除職位</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          確定要移除 <strong className="text-danger">{props.position} 1110634000</strong> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>刪除</Button>
          <Button variant="light" onClick={props.onHide}>取消</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

