import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = props => {
    const { primary, secondary, error, large, medium, small, disabled, onClick, children } = props;

    const classes = classNames(
        "button",
        classNames,
        {
            "button--primary": primary,
            "button--secondary": secondary,
            "button--error": error,
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
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    error: PropTypes.bool,
    large: PropTypes.bool,
    medium: PropTypes.bool,
    small: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func ,
    children: PropTypes.string
}

Button.defaultProps = {
    primary: false,
    secondary: false,
    error: false,
    large: false,
    medium: false,
    small: false,
    disabled: false,
    onClick: null,
    children: ""
}

export default Button