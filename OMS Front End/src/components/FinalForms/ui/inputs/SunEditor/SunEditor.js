import React from 'react';
import SunEditor from 'suneditor-react';
import PropTypes from 'prop-types';
import "suneditor/dist/css/suneditor.min.css";
import "./SunEditor.scss"

const SunTextEditor = ({
    onBlur,
    onChange,
    placeholder,
    value,
    isDisable,
}) => {

    const handleInputChange = (content) => {
        if (onChange) {
            const plainText = new DOMParser().parseFromString(content, 'text/html').body.textContent;
            onChange(plainText);
        }
    };

    return (
            <SunEditor
                placeholder={placeholder}
                setContents={value}
                disable={isDisable}
                // onChange={handleInputChange}
                onChange={onChange}
                onBlur={onBlur}
                setOptions={{
                    buttonList: [
                        ["undo", "redo"],
                        ["outdent", "indent"],
                        ["font", "fontSize", "formatBlock"],
                        ["bold", "underline", "italic", "strike",],
                        ["align", "list", "lineHeight"],
                    ],
                    minHeight: "250px",
                    showPathLabel: false,
                }}
            />
    )
}

SunTextEditor.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    isDisable: PropTypes.bool,
}

export default SunTextEditor