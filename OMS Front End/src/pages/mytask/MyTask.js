import React, { useEffect, useState } from "react";
import "./MyTask.scss";
import RenderTabs from "../../components/ui/tabs/RenderTabs";
import CardSection from "../../components/ui/card/CardSection";
import TaskDetail from "./feature/TaskDetail";
import PendingTask from "./feature/PendingTask";
import ArchiveTask from "./feature/ArchiveTask";
import { MyTaskStatus } from "../../utils/Enums/commonEnums";
import { useLazyGetApprovalRequestsByApprovalRequestIdQuery } from "../../app/services/ApprovalAPI";
import { getAuthProps } from "../../lib/authenticationLibrary";


const MyTask = () => {

  const authData = getAuthProps();

  const userId = authData.user.userID

  const [approvedData, setApprovedData] = useState(null)

  const [getApprovalRequestsByApprovalRequestId, { isFetching: isGetApprovalRequestsByApprovalRequestIdFetching, isSuccess: isGetApprovalRequestsByApprovalRequestIdSuccess, data: isGetApprovalRequestsByApprovalRequestIdData }] = useLazyGetApprovalRequestsByApprovalRequestIdQuery();

  const handleGetPendingId = (data) => {
    getApprovalRequestsByApprovalRequestId(data)
  }

  const handleGetArchiveId = (data) => {
    getApprovalRequestsByApprovalRequestId(data)
  }

  useEffect(() => {
    if (!isGetApprovalRequestsByApprovalRequestIdFetching && isGetApprovalRequestsByApprovalRequestIdSuccess && isGetApprovalRequestsByApprovalRequestIdData) {
      setApprovedData(isGetApprovalRequestsByApprovalRequestIdData)
    }
  }, [isGetApprovalRequestsByApprovalRequestIdFetching, isGetApprovalRequestsByApprovalRequestIdSuccess, isGetApprovalRequestsByApprovalRequestIdData])

  const mainTabs = [
    {
      sMenuItemCaption: "Pending",
      icon: "fa fa-check-circle-o",
      component: <div className="mt-3"><PendingTask Pending={MyTaskStatus.Pending} onGetById={handleGetPendingId} userId={userId} /></div>,
    },
    {
      sMenuItemCaption: "Archive",
      icon: "fa fa-file-archive-o",
      component: <div className="mt-3"><ArchiveTask Accept={MyTaskStatus.Accept} onGetById={handleGetArchiveId} userId={userId} /></div>,
    },
  ];

  return (
    <CardSection>
      <div className="mytask-section">
        <div className="d-flex">
          <div className="col-4 task-tab">
            <div className="task-title">
              <RenderTabs tabs={mainTabs} />
            </div>
          </div>
          <div className="col-8">
            <TaskDetail approvedData={approvedData} />
          </div>
        </div>
      </div>
    </CardSection>
  );
};

export default MyTask;
