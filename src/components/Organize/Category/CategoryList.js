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
import { ModalDel } from './ModalDel'

export const CategoryList = (props) => {
    const [category, setCategory] = React.useState({ name: '' })
    const [DeleteShow, setDeleteShow] = React.useState(false)
    return (
        <>
            <Form as={Row}>
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
                {props.categories.map(x => (
                    <Col className="py-1" sm="6" lg="3">
                        <Card body bg="dark" className="text-white">
                            <Card.Title className="my-auto" as={Row}>
                                <Form.Check
                                    type="switch"
                                    id={x.ID}
                                    label={x.name}
                                    className="ml-3"
                                    defaultChecked={x.status}
                                />
                                <Button
                                    variant="dark"
                                    className="px-2 pt-0 pb-1 ml-auto"
                                    onClick={() => {
                                        setCategory(x)
                                        setDeleteShow(true)
                                    }}
                                >
                                    <XCircle size="20" />
                                </Button>
                            </Card.Title>
                        </Card>
                    </Col>
                ))}
                <Col xs={12} as={Row} className="py-2 justify-content-md-center">
                    <Button type="submit" variant="success" className="mx-1">
                        儲存
                    </Button>
                    <Button variant="light" className="mx-1">
                        重製
                    </Button>
                </Col>
            </Form>
            <ModalDel
                category={category}
                show={DeleteShow}
                onHide={() => setDeleteShow(false)}
            />
        </>
    )
}
