import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = props => {
    const { large, medium, small, disabled, children } = props;

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
        <button className={classes} disabled={disabled}>{children}</button>
    );
}

Button.propTypes = {
    large: PropTypes.bool,
    medium: PropTypes.bool,
    small: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.string
}

Button.defaultProps = {
    large: false,
    medium: false,
    small: false,
    disabled: false,
    children: ""
}

export default Button