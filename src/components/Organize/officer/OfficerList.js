import React from 'react'
import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap'
import { XCircle, PencilSquare, PersonPlusFill } from 'react-bootstrap-icons'
import { ModalAdd } from './ModalAdd'
import { ModalDel } from './ModalDel'
import { ModalEdit } from './ModalEdit'

export const OfficerList = (props) => {
    const [officer, setOfficer] = React.useState({ position: '', sID: '' })
    const [AddShow, setAddShow] = React.useState(false)
    const [EditShow, setEditShow] = React.useState(false)
    const [DeleteShow, setDeleteShow] = React.useState(false)
    return (
        <>
            <Row>
                <Col xs={{ span: 4, offset: 8 }} className="py-1">
                    <Button
                        variant="info"
                        className="float-right"
                        onClick={() => setAddShow(true)}
                    >
                        <PersonPlusFill size="20" className="mr-2" />
                        新增
                    </Button>
                </Col>
                {props.officers.map((x) => (
                    <Col className="py-3" sm="6" lg="4">
                        <Card body bg="dark" className="text-white">
                            <ButtonGroup className="float-right">
                                <Button
                                    variant="dark"
                                    className="px-2 pt-0 pb-1"
                                    onClick={() => {
                                        setOfficer(x)
                                        setEditShow(true)
                                    }}
                                >
                                    <PencilSquare size="20" />
                                </Button>
                                <Button
                                    variant="dark"
                                    className="px-2 pt-0 pb-1"
                                    onClick={() => {
                                        setOfficer(x)
                                        setDeleteShow(true)
                                    }}
                                >
                                    <XCircle size="20" />
                                </Button>
                            </ButtonGroup>
                            <Card.Title>{x.position}</Card.Title>
                            <Card.Subtitle className="text-info">
                                {x.sID}
                            </Card.Subtitle>
                        </Card>
                    </Col>
                ))}
            </Row>
            <ModalAdd show={AddShow} onHide={() => setAddShow(false)} />
            <ModalEdit
                officer={officer}
                show={EditShow}
                onHide={() => setEditShow(false)}
            />
            <ModalDel
                officer={officer}
                show={DeleteShow}
                onHide={() => setDeleteShow(false)}
            />
        </>
    )
}
