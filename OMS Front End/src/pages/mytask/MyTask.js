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
  const [tabId, setTabId] = useState(0);
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
    setApprovedData(null);
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
        <>
          <PendingTask
            isApproval={isApproval}
            Pending={MyTaskStatus.Pending}
            onGetById={handleGetPendingId}
            onTabChange={handleSetTab}
            roleId={roleId}
            setIsApproval={setIsApproval}
          />
        </>
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
    <div className="mytask-section">
      <div className="row">
        <div className="col-xxl-5 col-xl-5 col-md-5 col-12 task-tab">
          <div className="task-title tab-section-desc">
            <RenderTabs tabs={mainTabs} onTabClick={handleSetTab} />
          </div>
        </div>
        <div className="col-xxl-7 col-xl-7 col-md-7 col-12 ">
          <div className="right-desc">
            <CardSection cardTitle="Description">
              <TaskDetail
                approvedData={approvedData}
                approvalRequest={approvalRequest}
                approvalRequestId={approvalRequestId}
                isFetching={isGetApprovalRequestsByApprovalRequestIdFetching}
                tabId={tabId}
              />
            </CardSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTask;
