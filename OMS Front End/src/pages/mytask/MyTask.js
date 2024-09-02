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
  const roleId = authData.roles.roleId;
  const [isApproval, setIsApproval] = useState(false);
  const [approvedData, setApprovedData] = useState(null);
  const [tabId, setTabId] = useState(0)
  const [approvalRequestId, setApprovalRequestId] = useState(0);

  const [
    getApprovalRequestsByApprovalRequestId,
    {
      isFetching: isGetApprovalRequestsByApprovalRequestIdFetching,
      isSuccess: isGetApprovalRequestsByApprovalRequestIdSuccess,
      data: isGetApprovalRequestsByApprovalRequestIdData,
    },
  ] = useLazyGetApprovalRequestsByApprovalRequestIdQuery();

  const handleGetPendingId = (data) => {
    getApprovalRequestsByApprovalRequestId(data);
    setApprovalRequestId(data);
  };

  const handleGetArchiveId = (data) => {
    getApprovalRequestsByApprovalRequestId(data);
    setApprovalRequestId(data);
  };

  const handleSetTab = (data) => {
    setTabId(data);
    setApprovedData(null);
  };

  const approvalRequest = (data) => {
    getApprovalRequestsByApprovalRequestId(data);
    setIsApproval(true);
  };

  useEffect(() => {
    if (
      !isGetApprovalRequestsByApprovalRequestIdFetching &&
      isGetApprovalRequestsByApprovalRequestIdSuccess &&
      isGetApprovalRequestsByApprovalRequestIdData
    ) {
      setApprovedData(isGetApprovalRequestsByApprovalRequestIdData);
    }
  }, [
    isGetApprovalRequestsByApprovalRequestIdFetching,
    isGetApprovalRequestsByApprovalRequestIdSuccess,
    isGetApprovalRequestsByApprovalRequestIdData,
  ]);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        console.log("Scrolling down");
      } else if (currentScrollTop < lastScrollTop) {
        console.log("Scrolling up");
      }

      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const mainTabs = [
    {
      sMenuItemCaption: "Pending",
      icon: "fa fa-check-circle-o",
      component: (
        <div className="">
          <PendingTask
            isApproval={isApproval}
            Pending={MyTaskStatus.Pending}
            onGetById={handleGetPendingId}
            onTabChange={handleSetTab}
            roleId={roleId}
          />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Archive",
      icon: "fa fa-file-archive-o",
      component: (
        <div className="">
          <ArchiveTask
            Accept={[MyTaskStatus.Accept, MyTaskStatus.Reject]}
            onGetById={handleGetArchiveId}
            roleId={roleId}
          />
        </div>
      ),
    },
  ];

  return (
    <CardSection>
      <div className="mytask-section">
        <div className="row">
          <div className="col-xxl-4 col-xl-4 col-md-4 col-12 task-tab">
            <div className="task-title">
              <RenderTabs tabs={mainTabs} onTabClick={handleSetTab} />
            </div>
          </div>
          <div className="col-xxl-8 col-xl-8 col-md-8 col-12 ">
            <TaskDetail approvedData={approvedData} approvalRequest={approvalRequest} approvalRequestId={approvalRequestId} isFetching={isGetApprovalRequestsByApprovalRequestIdFetching} tabId={tabId} />
          </div>
        </div>
      </div>
    </CardSection>
  );
};

export default MyTask;
