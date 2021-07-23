import React from 'react'
import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { XCircle, PencilSquare, PersonPlusFill } from 'react-bootstrap-icons';

const officers = {
    會長: "1110634001",
    副會長: "1110634002",
    活動長: "1110634005",
    公關長: "1110634006",
    財務長: "1110634003",
    器材長: "1110634004",
    生活長: "1110634008",
    資訊長: "1110634007"
}

const Style = styled.div`
    
`;

export const Officer = () => (
    <Style>
        <Row>
            <Col xs={{ span: 4, offset: 8 }} className="py-1">
                <Button variant="info" className="float-right"><PersonPlusFill size="20" className="mr-2" />新增</Button>
            </Col>
            {Object.keys(officers).map(x => (
                <Col className="py-1" sm="6" lg="4">
                    <Card body bg="dark" className="text-white">
                        <ButtonGroup className="float-right">
                            <Button variant="dark" className="px-2 pt-0 pb-1"><PencilSquare size="20" /></Button>
                            <Button variant="dark" className="px-2 pt-0 pb-1"><XCircle size="20" /></Button>
                        </ButtonGroup>
                        <Card.Title>{x}</Card.Title>
                        <Card.Subtitle className="text-info">{officers[x]}</Card.Subtitle>
                    </Card>
                </Col>
            ))}
        </Row>
    </Style>
)