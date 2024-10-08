import React, { useState } from "react";
import PropTypes from 'prop-types';
import { InputMask } from "@react-input/mask";
import { formatMaskedInput, formatNumberInput, unmaskValue } from "../../../libs/InputMasking";
import { MaskInputType } from "../../../libs/data/formControlTypes";

const MaskInput = ({
    name,
    value,
    onChange,
    onBlur = () => {}, // Default to a no-op function if not provided
    masking = {}, // Default to an empty object
    isDisable,
    fieldSetting,
    ...otherProps
}) => {
    const [selectValue, setSelectValue] = useState(value);

    const handleInputChange = (e) => {
        let value = unmaskValue(e.target.value,masking?.maskPlaceholder);
        setSelectValue(e.target.value);
        onChange(value);
    };

    const handleBlur = () => {
        const { maskType, maskFormat } = masking;

        const newValue = selectValue === ""
            ? selectValue
            : maskType === MaskInputType.NUMBER
                ? formatNumberInput(selectValue, maskFormat)
                : formatMaskedInput(selectValue, maskFormat);

        setSelectValue(newValue);
        onBlur(newValue);
    };

    const maskProps = masking.isMasking ? {
        mask: masking.maskFormat,
        showMask: masking.showMask,
        replacement: masking.maskReplacement || { _: /\d/ }
    } : {};

    return (
        <InputMask
            name={name}
            value={selectValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            disabled={isDisable}
            {...maskProps}
            {...fieldSetting}
        />
    );
};

MaskInput.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    masking: PropTypes.shape({
        isMasking: PropTypes.bool,
        maskType: PropTypes.oneOf(Object.values(MaskInputType)), // Corrected prop type
        maskFormat: PropTypes.string,
        maskReplacement: PropTypes.object,
        showMask: PropTypes.bool,
    }),
};

export default MaskInput;
