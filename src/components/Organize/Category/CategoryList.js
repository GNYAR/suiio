import React from 'react'
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

export const CategoryList = (props) => {
    return (
        <>
            <Row>
                <Col
                    sm={{ span: 8, offset: 4 }}
                    lg={{ span: 4, offset: 8 }}
                    className="py-1"
                >
                    <InputGroup className="mb-3">
                        <FormControl placeholder="活動名稱" />
                        <InputGroup.Append>
                            <Button variant="info">
                                <PlusLg size="14" className="mr-2" />
                                新增
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
                <Col className="py-1" sm="6" lg="3">
                    <Card body bg="dark" className="text-white">
                        <Card.Title className="my-auto" as={Row}>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="大迎新"
                                className="ml-3"
                            />
                            <Button
                                variant="dark"
                                className="px-2 pt-0 pb-1 ml-auto"
                            >
                                <XCircle size="20" />
                            </Button>
                        </Card.Title>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
