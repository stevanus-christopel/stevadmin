import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Select = props => {
    const { disabled, items, onChange } = props;

    const classes = classNames(
        "select",
        classNames,
        {
            "select--disabled": disabled
        }
    )

    return (
        <select className={classes} disabled={disabled}>
            {
                items.map(function(item, index) {
                    return (<option key={index} selected={item.selected} value={item.value}>{item.name}</option>)
                }, this)
            }
        </select>
    );
}

Select.propTypes = {
    disabled: PropTypes.bool,
    items: PropTypes.array,
    onChange: PropTypes.func,
}

Select.defaultProps = {
    disabled: false,
    propTypes: [],
    onChange: null,
}

export default Select