import React from 'react'
import { Row, Col, Table } from 'react-bootstrap'

export const StatementTable = (props) => {
  let lastYear = '',
    income = 0,
    cost = 0
  return (
    <>
      {props.statement?.accounts?.length ? (
        <Table hover variant="primary">
          <thead>
            <tr>
              <th>
                <Row>
                  <Col xs="1">月　日</Col>
                  <Col xs="2" className="text-center">
                    活動類別
                  </Col>
                  <Col xs="auto">申請人</Col>
                  <Col>摘要</Col>
                  <Col xs="2" className="text-center">
                    收入
                  </Col>
                  <Col xs="2" className="text-center">
                    支出
                  </Col>
                </Row>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.statement.accounts.map((x) => {
              const date = new Date(x.date)
              const year = date.getFullYear()
              const month = date.getMonth() + 1
              const day = date.getDate()
              let newYear = false
              if (year !== lastYear) {
                newYear = true
                lastYear = year
              }
              x.amount > 0 ? (income += x.amount) : (cost += x.amount * -1)
              return (
                <>
                  {newYear ? (
                    <tr className="text-center bg-secondary text-light">
                      <th className="py-1">{year}年</th>
                    </tr>
                  ) : (
                    ''
                  )}
                  <tr>
                    <td className="py-2">
                      <Row>
                        <Col xs="1">
                          {(month > 9 ? '' : '0') + month}

                          {(day > 9 ? '' : '0') + day}
                        </Col>
                        <Col xs="2" className="text-center">
                          <span
                            className={`bg-${
                              x.amount > 0 ? 'success' : 'danger'
                            } px-2 py-1 rounded text-white`}
                          >
                            {x.category}
                          </span>
                        </Col>
                        <Col xs="auto">{x.uploadBy}</Col>
                        <Col>
                          <b>{x.name}</b>
                        </Col>
                        {x.amount > 0 ? (
                          <>
                            <Col xs={2} className="text-right text-success">
                              <b className="pr-2">{x.amount}</b>
                            </Col>
                            <Col xs={2} />
                          </>
                        ) : (
                          <Col
                            xs={{
                              span: 2,
                              offset: 2,
                            }}
                            className="text-right text-danger"
                          >
                            <b className="pr-2">{x.amount * -1}</b>
                          </Col>
                        )}
                      </Row>
                    </td>
                  </tr>
                </>
              )
            })}
            <tr>
              <th className="py-2 text-center bg-info">
                <Row>
                  <Col>合　　　計</Col>
                  <Col xs="2" className="text-right">
                    <span className="bg-light px-2 py-1 rounded text-success">
                      {income}
                    </span>
                  </Col>
                  <Col xs="2" className="text-right">
                    <span className="bg-light px-2 py-1 rounded text-danger">
                      {cost}
                    </span>
                  </Col>
                </Row>
              </th>
            </tr>
          </tbody>
        </Table>
      ) : (
        <h3 className="py-5 text-center">
          <span className="px-5 py-2 rounded bg-secondary text-white">
            No Data
          </span>
        </h3>
      )}
      <Row className="justify-content-center">
        <Col xs="auto">
          <div
            className={`border px-3 rounded bg-${
              income - cost < 0 ? 'danger' : 'success'
            } text-white`}
          >
            {props.statement.category === '其他項目' ? (
              <Row className="text-right my-2">
                <Col xs="auto">上期餘額：</Col>
                <Col>
                  <b>{props.statement.balance - income + cost}</b>
                </Col>
              </Row>
            ) : (
              ''
            )}
            <Row className="text-right my-2">
              <Col xs="auto">本期淨{income - cost < 0 ? '損' : '利'}：</Col>
              <Col>
                <b>{income - cost}</b>
              </Col>
            </Row>
            {props.statement.category === '其他項目' ? (
              <Row className="text-right my-2">
                <Col xs="auto">本期餘額：</Col>
                <Col>
                  <b>{props.statement.balance}</b>
                </Col>
              </Row>
            ) : (
              ''
            )}
          </div>
        </Col>
      </Row>
    </>
  )
}
