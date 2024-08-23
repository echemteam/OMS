/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useLazyGetApprovalRequestsListByStatusAndRoleIdQuery } from '../../../app/services/ApprovalAPI';
import "../../mytask/MyTask.scss";
import NoRecordFound from '../../../components/ui/noRecordFound/NoRecordFound';
import DataLoader from '../../../components/ui/dataLoader/DataLoader';
import { FirstSecondLetter } from '../../../utils/FirstSecLetter/FirstSecondLetter';
import formatDate from '../../../lib/formatDate';

const ArchiveTask = (props) => {

    const [archiveData, setArchiveData] = useState([])
    const [activeTab, setActiveTab] = useState(null);
    const [getApprovalRequestsListByStatus, { isFetching: isGetApprovalRequestsListByStatusFetching, isSuccess: isGetApprovalRequestsListByStatusSuccess, data: isGetApprovalRequestsListByStatusData }] = useLazyGetApprovalRequestsListByStatusAndRoleIdQuery();

    useEffect(() => {
        if (props.Accept) {
            let req = {
                status: props.Accept.join(','),
                roleId: props.roleId
            }
            getApprovalRequestsListByStatus(req)
        }
    }, [props.Accept , props.roleId])

    useEffect(() => {
        if (!isGetApprovalRequestsListByStatusFetching && isGetApprovalRequestsListByStatusSuccess && isGetApprovalRequestsListByStatusData) {
            setArchiveData(isGetApprovalRequestsListByStatusData);
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
                    {archiveData.length > 0 ? (
                        archiveData.map((tab) => (
                            <button
                                key={tab.approvalRequestId} // Use a unique key
                                className={`tab-button ${activeTab === tab.approvalRequestId ? "active" : ""}`}
                                onClick={() => handleTabClick(tab.approvalRequestId)}
                            >
                                <div className="d-flex align-items-start">
                                    <span className="profile-icon"> {FirstSecondLetter(tab.functionalityName)} </span>
                                    {/* <div className="title">
                                        {tab.functionalityName}
                                        <span className="sub-title">{tab.moduleName}</span>
                                    </div> */}
                                    <div className="title">
                                        {tab.functionalityName}
                                        <div className='bage-fix'>
                                            <span className="sub-title">{tab.moduleName}</span>
                                            <div
                                                className={`mytask-type-badge ${tab.status === "Accept" ? "badge-accept" : tab.status === "Reject" ? "badge-reject" : ""
                                                    }`}
                                            >
                                                {tab.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    <div className="date">
                                        {tab.requestedDate
                                            ? formatDate(tab.requestedDate, "MM/DD/YYYY hh:mm A")
                                            : "No Date"}
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
ArchiveTask.propTypes = {
    Accept: PropTypes.string,
    roleId: PropTypes.number.isRequired,
    onGetById: PropTypes.func
};
export default ArchiveTask