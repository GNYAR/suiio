import React, { Component } from 'react'
import { Permission } from './Permission'
import { OfficerList } from './OfficerList'

export class Officer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            officers: [],
        }
        fetch('http://localhost:4000/api/officers/fetch/all')
            .then((res) => res.json())
            .then((data) => this.setState({ officers: data }))
    }

    render() {
        return (
            <>
                <OfficerList officers={this.state.officers} />
                <Permission officers={this.state.officers} />
            </>
        )
    }
}
