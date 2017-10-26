import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ active, children, onClick }) => {
    if (active) {
        return <li className="link link--active"><a>{children}</a></li>
    }

    return (
        <li className="link">
            <a href="#" onClick={e => {
                e.preventDefault();
                onClick();
            }}>
                {children}
            </a>
        </li>
    )
};

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Link
