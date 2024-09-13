/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
//** Lib's */
import "./MyTask.scss";
import RenderTabs from "../../components/ui/tabs/RenderTabs";
import CardSection from "../../components/ui/card/CardSection";
import { MyTaskStatus } from "../../utils/Enums/commonEnums";
import CardSection from "../../components/ui/card/CardSection";
import { getAuthProps } from "../../lib/authenticationLibrary";
//** Service's */
import { useLazyGetApprovalRequestsByApprovalRequestIdQuery } from "../../app/services/ApprovalAPI";
import { useLazyGetAllFunctionalityEventByModuleIdQuery, useLazyGetAllModulesQuery } from "../../app/services/configurationAPI";

//** Compoent's */
const PendingTask = React.lazy(() => import("./feature/PendingTask"));
const ArchiveTask = React.lazy(() => import("./feature/ArchiveTask"));
const TaskDetail = React.lazy(() => import('./feature/TaskDetail'));

const MyTask = () => {
  const authData = getAuthProps();
  const roleId = authData.roles.roleId;
  const [tabId, setTabId] = useState(0);
  const [moduleList, setModuleList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [isApproval, setIsApproval] = useState(false);
  const [approvedData, setApprovedData] = useState(null);
  const [approvalRequestId, setApprovalRequestId] = useState(0);

  const [
    getApprovalRequestsByApprovalRequestId,
    {
      isFetching: isGetApprovalRequestsByApprovalRequestIdFetching,
      isSuccess: isGetApprovalRequestsByApprovalRequestIdSuccess,
      data: isGetApprovalRequestsByApprovalRequestIdData,
    },
  ] = useLazyGetApprovalRequestsByApprovalRequestIdQuery();

  const [
    getAllModules,
    { isSuccess: isgetAllModulesSucess, data: allGetAllModulesData },
  ] = useLazyGetAllModulesQuery();

  const [getEventsByModuleId, { isSuccess: isGetAllEventsSucess, data: isGetAllEventsData }] = useLazyGetAllFunctionalityEventByModuleIdQuery();

  const handleGetPendingId = (data) => {
    getApprovalRequestsByApprovalRequestId(data);
    setApprovalRequestId(data);
  };

  const handleRestEventDetail = () => {
    setApprovalRequestId(0);
    setApprovedData(null);
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
    getAllModules();
  }, [getAllModules]);

  useEffect(() => {
    moduleList.length > 0 && getEventsByModuleId(moduleList[0].moduleId);
  }, [moduleList]);

  useEffect(() => {
    if (isgetAllModulesSucess && allGetAllModulesData) {
      setModuleList(allGetAllModulesData);
    }
  }, [isgetAllModulesSucess, allGetAllModulesData]);

  useEffect(() => {
    if (isGetAllEventsSucess && isGetAllEventsData) {
      const modifyEventList = [
        {
          value: 0,  // Special value for select all
          label: 'Select All',
          isChecked: false
        },
        ...isGetAllEventsData.map(data => ({
          value: data.functionalityEventId,
          label: data.eventName,
          isChecked: false
        }))
      ]
      setEventList(modifyEventList);
    }
  }, [isGetAllEventsSucess, isGetAllEventsData]);

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
            moduleList={moduleList}
            eventList={eventList}
            setIsApproval={setIsApproval}
            handleRestEventDetail={handleRestEventDetail}
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
            Accept={MyTaskStatus.Accept}
            onGetById={handleGetArchiveId}
            roleId={roleId}
            moduleList={moduleList}
            eventList={eventList}
            handleRestEventDetail={handleRestEventDetail}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mytask-section">
        <div className="row">
          <div className="col-xxl-5 col-xl-5 col-md-5 col-12 task-tab">
            <div className="task-title tab-section-desc">
              <div className="filter-model-sec">
                <RenderTabs tabs={mainTabs} onTabClick={handleSetTab} />
              </div>
            </div>
          </div>
          <div className="col-xxl-7 col-xl-7 col-md-7 col-12 ">
            <div className="right-desc">
              <CardSection>
                <TaskDetail
                  approvedData={approvedData}
                  approvalRequest={approvalRequest}
                  approvalRequestId={approvalRequestId}
                  isEventByIdLoading={
                    isGetApprovalRequestsByApprovalRequestIdFetching
                  }
                  tabId={tabId}
                />
              </CardSection>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTask;
