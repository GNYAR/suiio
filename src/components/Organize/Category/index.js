import React, { Component } from 'react'
import { CategoryList } from './CategoryList'

export class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
        }
        fetch('http://localhost:4000/api/category/list')
            .then((res) => res.json())
            .then((data) => this.setState({ categories: data }))
    }
    render() {
        return (
            <>
                <CategoryList categories={this.state.categories} />
            </>
        )
    }
}
