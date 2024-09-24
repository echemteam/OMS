/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CardSection from "../../../components/ui/card/CardSection";

const ModuleList = ({ moduleList, onModuleChange }) => {
    const [activeModule, setActiveModule] = useState(null);

    // Set the first module as active by default when the component mounts
    useEffect(() => {
        if (moduleList && moduleList.length > 0) {
            setActiveModule(moduleList[0].moduleId);
        }
    }, [moduleList]);

    const handleModuleClick = (moduleData) => {
        setActiveModule(moduleData.moduleId);
        if (onModuleChange) {
            onModuleChange(moduleData.moduleId);
        }
    };

    return (
        <CardSection cardTitle="Modules">
            <div className="module-listing">
                <ul>
                    {moduleList && moduleList.map((data, index) => (
                        <li className={activeModule === data.moduleId ? "active" : ""}
                            onClick={() => handleModuleClick(data)} key={index}>
                            <span>{data.moduleName}<div className="module-count">{data.pendingRequestCount}</div></span>
                            
                        </li>
                    ))}
                </ul>
            </div>
        </CardSection>
    );
};

ModuleList.propTypes = {
    moduleList: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    onModuleChange: PropTypes.func,
};

export default ModuleList;
