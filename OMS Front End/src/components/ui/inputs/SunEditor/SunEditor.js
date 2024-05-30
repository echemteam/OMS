import React from 'react';
import SunEditor from 'suneditor-react';
import PropTypes from 'prop-types';
import "suneditor/dist/css/suneditor.min.css";

const SunTextEditor = ({
    onBlur,
    onChange,
    placeholder,
    value,
    isDisable,
    configOptions
}) => {

    const handleInputChange = (content) => {
        if (onChange) {
            const plainText = new DOMParser().parseFromString(content, 'text/html').body.textContent;
            onChange(plainText);
        }
    };

    // const handleBlur = () => {
    //     if (onBlur) {
    //         onBlur()
    //     }
    // }

    return (
        <>
            <SunEditor
                placeholder={placeholder}
                setContents={value}
                disable={isDisable}
                onChange={handleInputChange}
                onBlur={onBlur}
                // setOptions= {...configOptions} idk if its gonna work but let's try
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
        </>
    )
}

SunTextEditor.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    allowSpace: PropTypes.bool,
    isDisable: PropTypes.bool,
}

export default SunTextEditor