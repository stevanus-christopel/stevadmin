import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = props => {
    const { large, medium, small, disabled, onClick, children } = props;

    const classes = classNames(
        "button",
        classNames,
        {
            "button--large": large,
            "button--medium": medium,
            "button--small": small,
            "button--disabled": disabled
        }
    )

    return (
        <button className={classes} disabled={disabled}
            onClick={onClick}>
            {children}
        </button>
    );
}

Button.propTypes = {
    large: PropTypes.bool,
    medium: PropTypes.bool,
    small: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func ,
    children: PropTypes.string
}

Button.defaultProps = {
    large: false,
    medium: false,
    small: false,
    disabled: false,
    onClick: null,
    children: ""
}

export default Button