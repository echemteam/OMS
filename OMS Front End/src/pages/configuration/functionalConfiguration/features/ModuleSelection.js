import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DropDown from '../../../../components/ui/dropdown/DropDrown';
import { useLazyGetAllModulesQuery } from '../../../../app/services/configurationAPI';

const ModuleSelection = (props) => {
    const [moduleData, setModuleData] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [getAllModules, { isSuccess: isgetAllModulesSucess, data: allGetAllModulesData }] = useLazyGetAllModulesQuery();

    // Trigger the API call on component mount
    useEffect(() => {
        getAllModules();
    }, [getAllModules]);

    // Update moduleData once the API call succeeds
    useEffect(() => {
        if (isgetAllModulesSucess && allGetAllModulesData?.length) {
            const transformedData = allGetAllModulesData.map(module => ({
                value: module.moduleId,
                label: module.moduleName
            }));
            setModuleData(transformedData);
        }
    }, [isgetAllModulesSucess, allGetAllModulesData]);

    // Once moduleData is set, select the first module by default
    useEffect(() => {
        if (moduleData.length > 0 && !selectedModule) {
            handleModuleNameChange(moduleData[0]);
        }
    }, [moduleData]);

    const handleModuleNameChange = (selectedOption) => {
        if (selectedOption) {
            setSelectedModule(selectedOption?.value);
            props.handleModuleID(selectedOption?.value);
        }
    };

    return (
        <div className='row'>
            <div className="col-md-4">
                <DropDown
                    placeholder="Select Module Name"
                    options={moduleData}
                    value={selectedModule} // Ensure selectedModule is set properly
                    onChange={handleModuleNameChange} // Handles when dropdown selection changes
                    isMultiSelect={false}
                    closeMenuOnSelect={false}
                />
            </div>
        </div>
    );
};

ModuleSelection.propTypes = {
    handleModuleID: PropTypes.func.isRequired,
};

export default ModuleSelection;
