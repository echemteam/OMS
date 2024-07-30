import React, { useEffect, useRef, useState } from 'react';
import MolGrid from '../../../../../../components/Grid/MolGrid';
import { functionalConfigurationListData } from '../config/FunctionalConfigurationList.data';


const ManageResponsibleUsers = () => {
  const molGridRef = useRef();
  const [listData, setListData] = useState();
  const [totalRowCount, setTotalRowCount] = useState(0);

  useEffect(() => {
      // Sample static data
      const staticData = [
          {
              id: 1,
              eventName: 'Event 1',
              description: 'Description for event 1',
          },
          {
              id: 2,
              eventName: 'Event 2',
              description: 'Description for event 2',
          },
          {
              id: 3,
              eventName: 'Event 3',
              description: 'Description for event 3',
          },
          {
              id: 4,
              eventName: 'Event 4',
              description: 'Description for event 4',
          },
          {
              id: 5,
              eventName: 'Event 5',
              description: 'Description for event 5',
          },
      ];

      setListData(staticData);
      setTotalRowCount(staticData.length);
  }, []);

  // const actionHandler = {
  //     VIEW: handleViewClick,
  //     Edit: handleEditClick
  // }

  return (
      <div className="row">
          <div className="col-md-12 table-striped api-provider">
              <MolGrid
                  ref={molGridRef}
                  configuration={functionalConfigurationListData}
                  dataSource={listData}
                  allowPagination={true}
                  pagination={{
                      totalCount: totalRowCount,
                      pageSize: 20,
                      currentPage: 1,
                  }}
                  // onPageChange={handlePageChange}
                  // onSorting={handleSorting}
                  // isLoading={isGetApiEventsLoading}
                  // onActionChange={actionHandler}
              />
          </div>
      </div>
  )
}

export default ManageResponsibleUsers