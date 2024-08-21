/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import DropDown from '../../../../components/ui/dropdown/DropDrown'
import { useLazyGetAllModulesQuery } from '../../../../app/services/configurationAPI';

const ModuleSelection = (props) => {
    const [moduleData, setModuleData] = useState([])
    const [selectedModule, setSelectedModule] = useState(null);
    const [getAllModules, { isSuccess: isgetAllModulesSucess, data: allGetAllModulesData, }] = useLazyGetAllModulesQuery();

    useEffect(() => {
        getAllModules();
    }, []);

    useEffect(() => {
        if (isgetAllModulesSucess && allGetAllModulesData) {
            const transformedData = allGetAllModulesData.map(module => ({
                value: module.moduleId,
                label: module.moduleName
            }));
            setModuleData(transformedData);
        }
    }, [isgetAllModulesSucess, allGetAllModulesData]);

    const handleModuleNameChange = (selectedOption) => {
        setSelectedModule(selectedOption);
        props.handleModuleID(selectedOption.value)
    };

    return (
        <div className='row'>
            <div className="col-md-4">
                <DropDown
                    placeholder="Select Module Name"
                    options={moduleData}
                    value={selectedModule}
                    onChange={handleModuleNameChange}
                    isMultiSelect={false}
                    closeMenuOnSelect={false}
                />
            </div>
            {/* <div className="col-md-8">
                <div className=''>
                    <Buttons buttonTypeClassName="theme-button"
                        buttonText="Save"
                    // onClick={handleAddEdit}
                    />
                </div>
            </div> */}
        </div>
    )
}
ModuleSelection.propTypes = {
    handleModuleID: PropTypes.func.isRequired,  
};

export default ModuleSelection