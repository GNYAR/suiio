import React from 'react'
import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap'
import { XCircle, PencilSquare, PersonPlusFill } from 'react-bootstrap-icons';
import { OfficeModal } from './modal';

export const OfficerList = (props) => {
  const [AddShow, setAddShow] = React.useState(false);
  const [position, setPosition] = React.useState();
  const [EditShow, setEditShow] = React.useState(false);
  const [DeleteShow, setDeleteShow] = React.useState(false);
  return (
    <>
      <Row>
        <Col xs={{ span: 4, offset: 8 }} className="py-1">
          <Button
            variant="info"
            className="float-right"
            onClick={() => setAddShow(true)}
          >
            <PersonPlusFill size="20" className="mr-2" />新增
          </Button>
        </Col>
        {Object.keys(props.officers).map(x => (
          <Col className="py-1" sm="6" lg="4">
            <Card body bg="dark" className="text-white">
              <ButtonGroup className="float-right">
                <Button
                  variant="dark"
                  className="px-2 pt-0 pb-1"
                  onClick={() => {
                    setPosition(x);
                    setEditShow(true);
                  }}
                >
                  <PencilSquare size="20" />
                </Button>
                <Button
                  variant="dark"
                  className="px-2 pt-0 pb-1"
                  onClick={() => {
                    setPosition(x);
                    setDeleteShow(true);
                  }}
                >
                  <XCircle size="20" />
                </Button>
              </ButtonGroup>
              <Card.Title>{x}</Card.Title>
              <Card.Subtitle className="text-info">{props.officers[x]}</Card.Subtitle>
            </Card>
          </Col>
        ))}
      </Row>
      <OfficeModal.ADD show={AddShow} onHide={() => setAddShow(false)} />
      <OfficeModal.EDIT position={position} show={EditShow} onHide={() => setEditShow(false)} />
      <OfficeModal.DELETE position={position} show={DeleteShow} onHide={() => setDeleteShow(false)} />
    </>
  )
}

