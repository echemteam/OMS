import React, { useEffect, useRef, useState } from 'react'
import MolGrid from '../../../../../components/Grid/MolGrid';
import { useNavigate } from 'react-router-dom';
import { thirdPartyListConfigurationData } from './config/ThirdPartyApiConfigurationList.data';

const ThirdPartyApiConfigurationList = () => {
    const molGridRef = useRef();
    const navigate = useNavigate();
    const [listData, setListData] = useState([]);

    // Static data to be displayed in the grid
    const staticData = [
        { providerName: 'Provider 1', authKey: 'Auth1', clientId: 'Client1', clientSecret: 'Secret1', tokenEndpoint: 'Endpoint1', tokenExpires: '01/01/2025' },
        { providerName: 'Provider 2', authKey: 'Auth2', clientId: 'Client2', clientSecret: 'Secret2', tokenEndpoint: 'Endpoint2', tokenExpires: '01/02/2025' },
        { providerName: 'Provider 3', authKey: 'Auth3', clientId: 'Client3', clientSecret: 'Secret3', tokenEndpoint: 'Endpoint3', tokenExpires: '01/03/2025' },
        { providerName: 'Provider 4', authKey: 'Auth4', clientId: 'Client4', clientSecret: 'Secret4', tokenEndpoint: 'Endpoint4', tokenExpires: '01/04/2025' },
        { providerName: 'Provider 5', authKey: 'Auth5', clientId: 'Client5', clientSecret: 'Secret5', tokenEndpoint: 'Endpoint5', tokenExpires: '01/05/2025' },
    ];

    useEffect(() => {
        setListData(staticData);
    }, []);

    // const handleEditClick = () => {
    //     navigate("/ThirdPartyApiConfigurationViewDetails");
    // }

    const handleViewClick = () => {
        navigate("/ThirdPartyApiConfigurationViewDetails");
    }

    const actionHandler = {
        // EDIT: handleEditClick,
        VIEW: handleViewClick,
    };

    return (
        <div className="row">
            <div className="col-md-12 table-striped api-provider">
                <MolGrid
                    ref={molGridRef}
                    configuration={thirdPartyListConfigurationData}
                    dataSource={listData}
                    allowPagination={true}
                    pagination={{
                        totalCount: staticData.length, // Ensure this value is correct
                        pageSize: 20,
                        currentPage: 1,
                    }}
                    // onPageChange={handlePageChange}
                    // onSorting={handleSorting}
                    // isLoading={isApiAuthenticationLoading}
                    onActionChange={actionHandler}
                />
            </div>
        </div>
    )
}

export default ThirdPartyApiConfigurationList