import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextInput = props => {
    const { id, type, block, disabled, autoFocus, placeholder, value, onChange, onKeyPress } = props;

    const classes = classNames(
        "text-input",
        classNames,
        {
            "text-input--block": block,
            "text-input--disabled": disabled
        }
    )

    return (
        <input id={id} className={classes} type={type} disabled={disabled} autoFocus={autoFocus}
        placeholder={placeholder} value={value} onChange={onChange} onKeyPress={onKeyPress} />
    );
}

TextInput.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func
}

TextInput.defaultProps = {
    id: null,
    type: "text",
    block: false,
    disabled: false,
    autoFocus: false,
    placeholder: "",
    value: "",
    onChange: null,
    onKeyPress: null
}

export default TextInput