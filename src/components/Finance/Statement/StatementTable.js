import React from 'react'
import { Row, Col, Table } from 'react-bootstrap'

export const StatementTable = (props) => {
    return (
        <>
            <Table hover variant="primary">
                <thead>
                    <tr><th>
                        <Row>
                            <Col xs="1">月　日</Col>
                            <Col xs="2" className="text-center">活動類別</Col>
                            <Col xs="auto">申請人</Col>
                            <Col>摘要</Col>
                            <Col xs="2" className="text-center">收入</Col>
                            <Col xs="2" className="text-center">支出</Col>
                        </Row>
                    </th></tr>
                </thead>
                <tbody>
                    <tr className="text-center bg-secondary text-light">
                        <th className="py-1">2020年</th>
                    </tr>
                    <tr><td className="py-2">
                        <Row>
                            <Col xs="1">12　01</Col>
                            <Col xs="2" className="text-center"><span className="bg-success px-2 py-1 rounded text-white">大迎新</span></Col>
                            <Col xs="auto">公關長</Col>
                            <Col>夜遊用品</Col>
                            <Col xs={2} className="text-right text-success"><b className="pr-2">4,800</b></Col>
                            <Col xs={2} />
                        </Row>
                    </td></tr>
                    <tr><td className="py-2">
                        <Row>
                            <Col xs="1">12　01</Col>
                            <Col xs="2" className="text-center"><span className="bg-danger px-2 py-1 rounded text-white">大迎新</span></Col>
                            <Col xs="auto">公關長</Col>
                            <Col>夜遊用品(火把)</Col>
                            <Col xs={{ span: 2, offset: 2 }} className="text-right text-danger"><b className="pr-2">270</b></Col>
                        </Row>
                    </td></tr>
                    <tr><td className="py-2">
                        <Row>
                            <Col xs="1">12　01</Col>
                            <Col xs="2" className="text-center"><span className="bg-danger px-2 py-1 rounded text-white">大迎新</span></Col>
                            <Col xs="auto">公關長</Col>
                            <Col>夜遊用品</Col>
                            <Col xs={{ span: 2, offset: 2 }} className="text-right text-danger"><b className="pr-2">270</b></Col>
                        </Row>
                    </td></tr>
                    <tr className="text-center bg-secondary text-light">
                        <th className="py-1">2021年</th>
                    </tr>
                    <tr><td className="py-2">
                        <Row>
                            <Col xs="1">07　14</Col>
                            <Col xs="2" className="text-center"><span className="bg-danger px-2 py-1 rounded text-white">大迎新</span></Col>
                            <Col xs="auto">公關長</Col>
                            <Col>夜遊用品</Col>
                            <Col xs={{ span: 2, offset: 2 }} className="text-right text-danger"><b className="pr-2">270</b></Col>
                        </Row>
                    </td></tr>
                    <tr><td className="py-2">
                        <Row>
                            <Col xs="1">&ensp;&ensp;　18</Col>
                            <Col xs="2" className="text-center"><span className="bg-danger px-2 py-1 rounded text-white">大迎新</span></Col>
                            <Col xs="auto">公關長</Col>
                            <Col>夜遊用品</Col>
                            <Col xs={{ span: 2, offset: 2 }} className="text-right text-danger"><b className="pr-2">270</b></Col>
                        </Row>
                    </td></tr>
                    <tr><th className="py-2 text-center bg-info">
                        <Row>
                            <Col>合　　　計</Col>
                            <Col xs="2" className="text-right"><span className="bg-light px-2 py-1 rounded text-success">4800</span></Col>
                            <Col xs="2" className="text-right"><span className="bg-light px-2 py-1 rounded text-danger">{270 * 3}</span></Col>
                        </Row>
                    </th></tr>
                </tbody>
            </Table>
            <Row className="justify-content-center">
                <Col xs="auto">
                    <div className="border px-3 rounded bg-danger text-white">
                        <Row className="text-right my-2">
                            <Col xs="auto">本期淨損：</Col>
                            <Col><b>- 3,090</b></Col>
                        </Row>
                        <Row className="text-right my-2">
                            <Col xs="auto">上期餘額：</Col>
                            <Col><b>57,200</b></Col>
                        </Row>
                        <Row className="text-right my-2">
                            <Col xs="auto">本期餘額：</Col>
                            <Col><b>54,110</b></Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    )
}