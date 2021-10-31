import React, { Component } from 'react'
import {
  Row,
  Col,
  Card,
  Button,
  ButtonToolbar,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap'
import { ModalContent } from './ModalContent'
import { ModalAdd } from './ModalAdd'
import { StatusPill } from '../../StatusPill'

export class StatementList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statement: {},
      selected: '',
      ContentShow: false,
      class: '',
      AddShow: false,
      review: false,
      pages: [],
      pagenumber: 0,
    }
    this.update()
  }

  update = () => {
    fetch('http://suiio.nutc.edu.tw:2541/api/statement/fetch/all')
      .then((res) => res.json())
      .then((data) => {
        let cnt = 0
        const pages = data.reduce(
          (arr, v, k) => {
            const n = k % 12
            if (n) {
              arr[cnt][n] = v
            } else {
              cnt++
              arr = [...arr, [v]]
            }
            return arr
          },
          [[]]
        )
        pages.shift()
        this.setState({ pages })
      })
  }

  setStatement(id) {
    fetch(`http://suiio.nutc.edu.tw:2541/api/statement/fetch/id/${id}`)
      .then((res) => res.json())
      .then((statement) => this.setState({ statement }))
  }

  onHide = (show) => {
    this.setState({ [show]: false, review: false })
    this.update()
  }

  render() {
    return (
      <>
        <Row noGutters>
          <Col xs="12" className="py-2">
            <ButtonToolbar className="justify-content-between">
              <ButtonGroup className="mr-2" aria-label="First group">
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (this.state.pagenumber)
                      this.setState({
                        pagenumber: this.state.pagenumber - 1,
                      })
                  }}
                >
                  &lt;
                </Button>
                <DropdownButton
                  as={ButtonGroup}
                  title={`${this.state.pagenumber + 1} `}
                  variant="secondary"
                >
                  {this.state.pages.map((v, i) => {
                    return (
                      <Dropdown.Item
                        active={this.state.pagenumber === i}
                        onClick={() =>
                          this.setState({
                            pagenumber: i,
                          })
                        }
                      >
                        {i + 1}
                      </Dropdown.Item>
                    )
                  })}
                </DropdownButton>
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (this.state.pagenumber < this.state.pages.length - 1)
                      this.setState({
                        pagenumber: this.state.pagenumber + 1,
                      })
                  }}
                >
                  &gt;
                </Button>
              </ButtonGroup>
              <Dropdown className="float-right" alignRight>
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                  建立報表
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      this.setState({
                        class: '每月報表',
                        AddShow: true,
                      })
                    }
                  >
                    每月報表
                  </Dropdown.Item>
                  <Dropdown.Item
                    disabled
                    onClick={() =>
                      this.setState({
                        class: '活動報表',
                        AddShow: true,
                      })
                    }
                  >
                    活動報表
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ButtonToolbar>
          </Col>
          {this.state.pages.length
            ? this.state.pages[this.state.pagenumber].map((x) =>
                x.ID ? (
                  <Col className="px-1 py-2" md="6" lg="4">
                    <Card
                      bg="dark"
                      className="text-white"
                      onClick={async () => {
                        this.setStatement(x.ID)
                        this.setState({
                          ContentShow: true,
                        })
                      }}
                    >
                      <Card.Header className="font-weight-bolder">
                        <Row>
                          <Col>
                            {x.category === '其他項目' ? (
                              <span className="px-2 rounded bg-primary">
                                每月財報
                              </span>
                            ) : (
                              <span className="px-2 rounded bg-warning text-dark">
                                {x.category}
                              </span>
                            )}
                          </Col>
                          <Col xs="auto" className="text-muted">
                            {x.date}
                          </Col>
                        </Row>
                      </Card.Header>
                      <Card.Body>
                        <StatusPill
                          status={x.status}
                          onClick={() =>
                            this.setState({
                              review: true,
                            })
                          }
                        />
                        <Card.Title>{x.name}</Card.Title>
                        <Card.Subtitle className="pb-2 text-info">
                          <div>製表人：{x.uploadBy}</div>
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </Col>
                ) : (
                  ''
                )
              )
            : 'No Data'}
        </Row>
        <ModalContent
          show={this.state.ContentShow}
          statement={this.state.statement}
          review={this.state.review}
          onHide={() => this.onHide('ContentShow')}
        />
        <ModalAdd
          class={this.state.class}
          show={this.state.AddShow}
          onHide={() => this.onHide('AddShow')}
        />
      </>
    )
  }
}
