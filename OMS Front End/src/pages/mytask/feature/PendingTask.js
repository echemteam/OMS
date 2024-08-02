import React, { useEffect, useState } from 'react'
import { useLazyGetApprovalRequestsListByStatusAndRequestedByUserIdQuery } from '../../../app/services/ApprovalAPI';
import "../../mytask/MyTask.scss";
import NoRecordFound from '../../../components/ui/noRecordFound/NoRecordFound';
import DataLoader from '../../../components/ui/dataLoader/DataLoader';
import { FirstSecondLetter } from '../../../utils/FirstSecLetter/FirstSecondLetter';

const PendingTask = (props) => {

    const [pendingData, setPendingData] = useState([])
    const [activeTab, setActiveTab] = useState(null);
    const [getApprovalRequestsListByStatus, { isFetching: isGetApprovalRequestsListByStatusFetching, isSuccess: isGetApprovalRequestsListByStatusSuccess, data: isGetApprovalRequestsListByStatusData }] = useLazyGetApprovalRequestsListByStatusAndRequestedByUserIdQuery();

    useEffect(() => {
        if (props.Pending) {
            let req = {
                status : props.Pending,
                requestedByUserId : props.userId
            }
            getApprovalRequestsListByStatus(req)
        }
    }, [props.Pending])

    useEffect(() => {
        if (!isGetApprovalRequestsListByStatusFetching && isGetApprovalRequestsListByStatusSuccess && isGetApprovalRequestsListByStatusData) {
            setPendingData(isGetApprovalRequestsListByStatusData);
        }
    }, [isGetApprovalRequestsListByStatusFetching, isGetApprovalRequestsListByStatusSuccess, isGetApprovalRequestsListByStatusData]);

    const handleTabClick = (id) => {
        setActiveTab(id);
        if (props.onGetById) {
            props.onGetById(id);
        }
    };

    return (
        <div className="customer-info">
            {isGetApprovalRequestsListByStatusFetching ? (
                <DataLoader />
            ) : (
                <div className="tabs">
                    {pendingData.length > 0 ? (
                        pendingData.map((tab) => (
                            <button
                                key={tab.approvalRequestId} // Use a unique key
                                className={`tab-button ${activeTab === tab.approvalRequestId ? "active" : ""}`}
                                onClick={() => handleTabClick(tab.approvalRequestId)}
                            >
                                <div className="d-flex align-items-center">
                                    <span className="profile-icon">  {FirstSecondLetter(tab.functionalityName)}</span>
                                    <div className="title">
                                        {tab.functionalityName}
                                        <span className="sub-title">{tab.moduleName}</span>
                                    </div>
                                </div>
                            </button>
                        ))
                    ) : (
                        <NoRecordFound />
                    )}
                </div>
            )}
        </div>
    )
}

export default PendingTask