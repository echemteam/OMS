import React, { useEffect, useRef, useState } from 'react';
import { useLazyGetUserLoginLogoutHistoryByUserIdQuery } from '../../../../app/services/userAPI';
import { UserHistoryGridConfig } from './config/UserForm.data';
import formatDate from '../../../../lib/formatDate';
import FinalMolGrid from '../../../../components/FinalMolGrid/FinalMolGrid';
import { useParams } from 'react-router-dom';
import { decryptUrlData } from '../../../../services/CryptoService';

const UserHistory = () => {  
  const molGridRef = useRef();

  const { id } = useParams();  
  const userId = id ? decryptUrlData(id) : 0;
  const [userList, setUserList] = useState([]);

  const [
    getUserLoginLogoutHistoryByUserId,
    {
      isFetching: isGetUserLoginLogoutHistoryByUserIdFetching,
      isSuccess: isGetUserLoginLogoutHistoryByUserIdSuccess,
      data: isGetUserLoginLogoutHistoryByUserIdData,
    },
  ] = useLazyGetUserLoginLogoutHistoryByUserIdQuery();

  useEffect(() => {
      getUserLoginLogoutHistoryByUserId(userId);  
  }, [userId]);

  useEffect(() => {
    if ( !isGetUserLoginLogoutHistoryByUserIdFetching &&isGetUserLoginLogoutHistoryByUserIdSuccess && isGetUserLoginLogoutHistoryByUserIdData ) {
      if (isGetUserLoginLogoutHistoryByUserIdData) {
        const formattedHistoryData = isGetUserLoginLogoutHistoryByUserIdData.map(history => ({
          ...history,
          userLoginDateTime: formatDate(history.userLoginDateTime), 
          userLogoutDateTime: formatDate(history.userLogoutDateTime), 
           
        }));
        setUserList(formattedHistoryData);
 
      }
    }
  }, [isGetUserLoginLogoutHistoryByUserIdFetching, isGetUserLoginLogoutHistoryByUserIdSuccess, isGetUserLoginLogoutHistoryByUserIdData,]);

  return (
    <div className="row">
      <div className="col-md-12 table-striped p-3">
        <FinalMolGrid
        
          ref={molGridRef}
          configuration={UserHistoryGridConfig}
          dataSource={userList}
          allowPagination={false}
          // pagination={{
          //   totalCount: totalRowCount,
          //   pageSize: 20,
          //   currentPage: 1,
          // }}
        />
      </div>
    </div>
  );
}

export default UserHistory;
