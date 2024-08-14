/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
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
            getApprovalRequestList();
        }
    }, [props.Pending, props.userId]);

    const getApprovalRequestList = () => {
        let req = {
            status: props.Pending,
            requestedByUserId: props.userId
        }
        getApprovalRequestsListByStatus(req)
    }

    useEffect(() => {
        if (props.isApproval) {
            getApprovalRequestList();
        }
    }, [props.isApproval]);

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
PendingTask.propTypes = {
    Pending: PropTypes.string,
    userId: PropTypes.number.isRequired,
    onGetById: PropTypes.func
};
export default PendingTask