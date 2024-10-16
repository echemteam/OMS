import React, { useEffect, useRef, useState } from 'react'
import { useAssignRoleToUserMutation, useGetAssignedRoleDetailsMutation, useLazyGetUnAssignedRoleByUserIdQuery } from '../../../../app/services/userAPI';
import Label from '../../../../components/ui/label/Label';
import DropdownSelect from '../../../../components/ui/dropdown/DropdownSelect';
import Buttons from '../../../../components/ui/button/Buttons';
import ToastService from '../../../../services/toastService/ToastService';
import FinalMolGrid from '../../../../components/FinalMolGrid/FinalMolGrid';
import assignRoleInfo from './config/AssignRole.data';


const AssignRole=(props) => {

    const molGridRef = useRef();
    const [unAssignedRole, setUnAssignedRole] = useState([]);   
    const [selectedRole, setSelectedRole] = useState(null);

    const [userRoleDataSource, setUserRoleDataSource] = useState([]);
    const [totalRowCount, setTotalRowCount] = useState(0);

    
    const [getUnAssignedRoleByUserId, {isSuccess: isUnAssignedRoleByUserIdSuccess,isFetching: isUnAssignedRoleByUserIdFetching,data: isUnAssignedRoleByUserIdData } ] = useLazyGetUnAssignedRoleByUserIdQuery();
    const [assignRoleToUser,{ isSuccess: isAssignRoleToUser, data: assignRoleToUserData }] = useAssignRoleToUserMutation();
    const [getAssignedRoleDetails,{ isLoading,isSuccess: isAssignedRoleFetched,data: assignedRoleData }] = useGetAssignedRoleDetailsMutation();


    useEffect(() => {
        if (props.descrypteId) {
            getUnAssignedRoleByUserId(props.descrypteId)
        }
    }, [props.descrypteId]);

    useEffect(() => {
        if (isAssignRoleToUser && assignRoleToUserData) {
            ToastService.success(assignRoleToUserData.errorMessage);
            const currentPageObject = molGridRef.current.getCurrentPageObject();
            getAssignedUserList(currentPageObject);
            getUnAssignedRoleByUserId(props.descrypteId);
        }
    }, [isAssignRoleToUser, assignRoleToUserData]);

    useEffect(() => {
        if (!isUnAssignedRoleByUserIdFetching && isUnAssignedRoleByUserIdSuccess && isUnAssignedRoleByUserIdData) {
            const roleData = isUnAssignedRoleByUserIdData.map(role => ({
                value: role.roleId,
                label: role.roleName
            }))
            setUnAssignedRole(roleData)
        }
    }, [isUnAssignedRoleByUserIdFetching, isUnAssignedRoleByUserIdSuccess, isUnAssignedRoleByUserIdData])

    useEffect(() => {
        if (molGridRef.current) {
            const currentPageObject = molGridRef.current.getCurrentPageObject();
            getAssignedUserList(currentPageObject);
        }
    }, []);

    const getAssignedUserList = (userDetails) => {
        const data = {
            pagination: {
                pageNumber: userDetails.pageNumber,
                pageSize: userDetails.pageSize,
              },
              filters:null,
              sortString: null,
              userId: props.descrypteId
        };
        getAssignedRoleDetails(data);
    }
    useEffect(() => {
        if (isAssignedRoleFetched && assignedRoleData) {
            if (assignedRoleData) {
                setUserRoleDataSource(assignedRoleData.dataSource);
            }
            if (assignedRoleData.totalRecord) {
                setTotalRowCount(assignedRoleData.totalRecord);
            }
        }
    }, [isAssignedRoleFetched, assignedRoleData])

    const handleDropdownChange = (selectedOption) => {
        setSelectedRole(selectedOption)
    }

    const handleClick = () => {
        if (props.descrypteId && selectedRole) {
            const data = {
                userId: props.descrypteId,
                roleId: selectedRole.value
            }
            assignRoleToUser(data);
            setUnAssignedRole([]);
            setSelectedRole(null);
        }
    }
    
    const handlePageChange = (page) => {
        getAssignedUserList(page, molGridRef.current.generateSortingString());
    };

  return (
    <div>
            <div className="top-filter">
            <div className="row">
                <div className="col-md-7">
                    <div className="d-flex align-items-end">
                        <div className="input-label-part">
                            <Label labelName="Roles" />
                            <DropdownSelect
                                optionsValue={unAssignedRole}
                                value={selectedRole}
                                handleDropdownChange={handleDropdownChange}
                                isMultiSelect={false}
                                placeholder="Select Role"
                            />
                        </div>
                        <div className="apply-btn ml-5">
                            <Buttons
                                buttonTypeClassName="theme-button"
                                buttonText="Assign Role"
                                onClick={handleClick}
                                isDisable={props.isButtonDisable}
                            />
                        </div>
                    </div>
                </div>
                <div className='mt-4'>

                    <FinalMolGrid
                        ref={molGridRef}
                        configuration={assignRoleInfo}
                        dataSource={userRoleDataSource}
                        isLoading={isLoading}
                        pagination={{
                            totalCount: totalRowCount,
                            pageSize: 25,
                            currentPage: 1,
                        }}
                        onPageChange={handlePageChange}
                         
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default AssignRole