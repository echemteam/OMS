/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { viewFunctionalEventsData } from './config/ViewFunctionalEvents.data'
import { useGetFunctionalityEventsMutation } from '../../../../../../app/services/configurationAPI';
import CardSection from '../../../../../../components/ui/card/CardSection';
import FinalMolGrid from '../../../../../../components/FinalMolGrid/FinalMolGrid';

const ViewFunctionalEvents = (props) => {
  const molGridRef = useRef();
  const [listData, setListData] = useState();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [getFunctionalityEvents, { isLoading: isGetFunctionalityEventsLoading, isSuccess: isGetFunctionalityEventsSuccess, data: isGetFunctionalityEventsData }] = useGetFunctionalityEventsMutation();

  const getLists = (pageObject, sortingString) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: "" },
      sortString: sortingString,
      functionalityId: props.functionalityId
    };
    getFunctionalityEvents(request);
  };

  const handlePageChange = (page) => {
    getLists(page, molGridRef.current.generateSortingString());
  };

  const handleSorting = (shortString) => {
    getLists(molGridRef.current.getCurrentPageObject(), shortString);
  };

  useEffect(() => {
    if (isGetFunctionalityEventsSuccess && isGetFunctionalityEventsData) {
      if (isGetFunctionalityEventsData) {
        setListData(isGetFunctionalityEventsData.dataSource);
      }
      if (isGetFunctionalityEventsData.totalRecord) {
        setTotalRowCount(isGetFunctionalityEventsData.totalRecord);
      }
    }
  }, [isGetFunctionalityEventsSuccess, isGetFunctionalityEventsData]);

  useEffect(() => {
    if (molGridRef.current) {
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      const currentsortingString = molGridRef.current.generateSortingString();
      const request = {
        pagination: {
          pageNumber: currentPageObject.pageNumber,
          pageSize: currentPageObject.pageSize,
        },
        filters: { searchText: "" },
        sortString: currentsortingString,
        functionalityId: props.functionalityId
      };
      getFunctionalityEvents(request);
    }
  }, [props.functionalityId]);

  return (
    <div className="row">
      <div className="col-md-12 table-striped api-provider view-function-provider">
        <CardSection
          cardTitle="Functional Events"
          buttonClassName="btn theme-button"
        >
          <FinalMolGrid
            ref={molGridRef}
            configuration={viewFunctionalEventsData}
            dataSource={listData}
            allowPagination={false}
            pagination={{
              totalCount: totalRowCount,
              pageSize: 20,
              currentPage: 1,
            }}
            onPageChange={handlePageChange}
            onSorting={handleSorting}
            isLoading={isGetFunctionalityEventsLoading}
          />
        </CardSection>
      </div>
    </div>
  )
}

ViewFunctionalEvents.propTypes = {
  functionalityId: PropTypes.number.isRequired,
};
export default ViewFunctionalEvents