    import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterLink from '../containers/FilterLink'

export default class Camera extends Component {

    render() {
        return (
        <ul className="links">
            <FilterLink filter="SHOW_ALL">
                All
            </FilterLink>

            <FilterLink filter="SHOW_ALJEZUR">
                Aljezur
            </FilterLink>

            <FilterLink filter="SHOW_SOUTH">
                South Coast
            </FilterLink>
        </ul>
        )
    }
}
