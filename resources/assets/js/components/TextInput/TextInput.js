import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextInput = props => {
    const { type, disabled, placeholder } = props;

    const classes = classNames(
        "text-input",
        classNames,
        {
            "text-input--disabled": disabled
        }
    )

    return (
        <input className={classes} type={type} disabled={disabled}
        placeholder={placeholder} />
    );
}

TextInput.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string
}

TextInput.defaultProps = {
    type: "text",
    disabled: false,
    placeholder: ""
}

export default TextInput