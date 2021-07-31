import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Pen } from 'react-bootstrap-icons'
import { ModalContent } from './ModalContent'
import { ModalAdd } from './ModalAdd'

export const ConferenceList = (props) => {
    const [ContentShow, setContentShow] = React.useState(false)
    const [AddShow, setAddShow] = React.useState(false)
    return (
        <>
            <Row>
                <Col xs="12" className="py-3">
                    <Button
                        variant="info"
                        className="float-right"
                        onClick={() => setAddShow(true)}
                    >
                        <Pen size="20" className="mr-2" />
                        撰寫紀錄
                    </Button>
                </Col>
                <Col className="py-1" md="6" lg="4">
                    <Card bg="dark" className="text-white" onClick={() => setContentShow(true)}>
                        <Card.Header className="text-success font-weight-bolder">
                            <Row>
                                <Col>大迎新</Col>
                                <Col xs="auto">2021-07-31</Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Button
                                variant="secondary"
                                className="px-1 py-0 rounded-pill overflow-hidden float-right"
                                disabled
                            >
                                <Row>
                                    <Col xs="auto" className="bg-primary pl-3 pr-1">
                                        組織
                                    </Col>
                                    <Col xs="auto" className="pr-3 pl-1">
                                        財務
                                    </Col>
                                </Row>
                            </Button>
                            <Card.Title>第一次籌備會議</Card.Title>
                            <Card.Subtitle className="text-info">
                                記錄人：資訊長
                            </Card.Subtitle>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ModalContent show={ContentShow} onHide={() => setContentShow(false)} />
            <ModalAdd show={AddShow} onHide={() => setAddShow(false)} />
        </>
    )
}
