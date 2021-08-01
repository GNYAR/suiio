import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

export const StatusPill = (props) => {
    if (props.status === "0") {
        return (
            <Button
                variant="danger"
                className="px-2 py-0 rounded-pill overflow-hidden float-right"
                disabled
            >
                審核駁回
            </Button>
        )
    }
    if (props.status === "1") {
        return (
            <Button
                variant="success"
                className="px-2 py-0 rounded-pill overflow-hidden float-right"
                disabled
            >
                審核通過
            </Button>
        )
    }
    return (
        <Button
            variant="secondary"
            className="px-1 py-0 rounded-pill overflow-hidden float-right"
            disabled
        >
            <Row>
                <Col xs="auto" className={"pl-3 pr-1" + (props.status === "2" ? " bg-primary" : "")}>
                    組織
                </Col>
                <Col xs="auto" className={"pr-3 pl-1" + (props.status === "3" ? " bg-primary" : "")}>
                    財務
                </Col>
            </Row>
        </Button>
    )
}