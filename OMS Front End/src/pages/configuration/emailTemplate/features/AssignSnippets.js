/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'

import Label from '../../../../components/ui/label/Label';
import DropdownSelect from '../../../../components/ui/dropdown/DropdownSelect';
import Buttons from '../../../../components/ui/button/Buttons';
import ToastService from '../../../../services/toastService/ToastService';
import FinalMolGrid from '../../../../components/FinalMolGrid/FinalMolGrid';
import SwalAlert from '../../../../services/swalService/SwalService';
import { useAddAssignedSnippetMutation, useDeleteAssignedSnippetBySnippetEmailTemplateIdMutation, useGetAssignedSnippetByEmailTemplateIdMutation, useLazyGetUnAssignedSnippetByEmailTemplateIdQuery } from '../../../../app/services/snippetEmailTemplateAPI';
import assignSnippetInfo from '../config/assignSnippet.Data';
import PropTypes from 'prop-types';

const AssignSnippets=(props) => {

    const molGridRef = useRef();
    const [unAssignedSnippet, setUnAssignedSnippet] = useState([]);   
    const [selectedSnippet, setSelectedSnippet] = useState(null);
    const [snippedDataSource, setSnippedDataSource] = useState([]);
    const [totalRowCount, setTotalRowCount] = useState(0);
    const { confirm } = SwalAlert();
   
    const [getUnAssignedSnippetByEmailTemplateId, {isSuccess: isgetUnAssignedSnippetByEmailTemplateIdSuccess,isFetching: isgetUnAssignedSnippetByEmailTemplateIdFetching,data: isgetUnAssignedSnippetByEmailTemplateIdData } ] = useLazyGetUnAssignedSnippetByEmailTemplateIdQuery();
    const [addAssignedSnippet,{ isSuccess: isAddAssignedSnippet, data: addAssignedSnippetData }] = useAddAssignedSnippetMutation();
    const [getAssignedSnippetByEmailTemplateId,{ isLoading,isSuccess: isAssignedSnippetFetched,data: assignedSnippetData }] =  useGetAssignedSnippetByEmailTemplateIdMutation();
    const [deleteAssignedSnippetBySnippetEmailTemplateId, { isSuccess: isDeleteSuccess, data: isDeletData }] =  useDeleteAssignedSnippetBySnippetEmailTemplateIdMutation();
   
    useEffect(() => {
    if (props.emailTemplateId) {
        getUnAssignedSnippetByEmailTemplateId(props.emailTemplateId);
    }
    }, [props.emailTemplateId]);

    useEffect(() => {
        if (isAddAssignedSnippet && addAssignedSnippetData) {
            ToastService.success(addAssignedSnippetData.errorMessage);
            const currentPageObject = molGridRef.current.getCurrentPageObject();
            getAssignedSnippetList(currentPageObject);
            getUnAssignedSnippetByEmailTemplateId(props.emailTemplateId);
        }
    }, [isAddAssignedSnippet, addAssignedSnippetData]);

    useEffect(() => {
        if (!isgetUnAssignedSnippetByEmailTemplateIdFetching && isgetUnAssignedSnippetByEmailTemplateIdSuccess && isgetUnAssignedSnippetByEmailTemplateIdData) {
            console.log("API Response:", isgetUnAssignedSnippetByEmailTemplateIdData);
            const snippetData = isgetUnAssignedSnippetByEmailTemplateIdData.map(snippet => ({
                value: snippet.snippetId,
                label: snippet.name
            }))
            setUnAssignedSnippet(snippetData)
        }
    }, [isgetUnAssignedSnippetByEmailTemplateIdFetching, isgetUnAssignedSnippetByEmailTemplateIdSuccess, isgetUnAssignedSnippetByEmailTemplateIdData])

    useEffect(() => {
        if (molGridRef.current) {
            const currentPageObject = molGridRef.current.getCurrentPageObject();
            getAssignedSnippetList(currentPageObject);
        }
    }, []);

    const getAssignedSnippetList = (userDetails) => {
        const data = {
            pagination: {
                pageNumber: userDetails.pageNumber,
                pageSize: userDetails.pageSize,
              },
              filters:null,
              sortString: null,
              emailTemplateId: props.emailTemplateId,
        };
        getAssignedSnippetByEmailTemplateId(data);
    }
    useEffect(() => {
        if (isAssignedSnippetFetched && assignedSnippetData) {
            if (assignedSnippetData) {
                setSnippedDataSource(assignedSnippetData.dataSource);
            }
            if (assignedSnippetData.totalRecord) {
                setTotalRowCount(assignedSnippetData.totalRecord);
            }
        }
    }, [isAssignedSnippetFetched, assignedSnippetData])

    useEffect(() => {
        if (isDeleteSuccess && isDeletData) {
          ToastService.success(isDeletData.errorMessage);
          const currentPageObject = molGridRef.current.getCurrentPageObject();
          getAssignedSnippetList(currentPageObject,molGridRef.current.generateSortingString());
          getUnAssignedSnippetByEmailTemplateId(props.emailTemplateId);
        }
      }, [isDeleteSuccess, isDeletData]);

    const handleDropdownChange = (selectedOption) => {
        setSelectedSnippet(selectedOption)
    }

    const handleClick = () => {
        if (!selectedSnippet) {
            ToastService.error("Please select a role to assign.");
            return;
        }
        if (props.emailTemplateId && selectedSnippet) {
            const data = {
                emailTemplateId: props.emailTemplateId,
                snippetId: selectedSnippet.value
            }
            addAssignedSnippet(data);
            setUnAssignedSnippet([]);
            setSelectedSnippet(null);
        }
    }
    
    const handlePageChange = (page) => {
        getAssignedSnippetList(page, molGridRef.current.generateSortingString());
    };

    const handleDeleteClick = (data) => {
        console.log("Data for deletion:", data);
        confirm(
          "Delete?",
          "Are you sure you want to Delete?",
          "Delete",
          "Cancel"
        ).then((confirmed) => {
          if (confirmed) {
            deleteAssignedSnippetBySnippetEmailTemplateId(data.snippetEmailTemplateId);
          }
        });
      };

      const actionHandler = {
        DELETE: handleDeleteClick,
      };
    
  return (
    <div>
            <div className="top-filter">
            <div className="row">
                <div className="col-md-7">
                    <div className="d-flex align-items-end">
                        <div className="input-label-part">
                            <Label labelName="Snippets" />
                            <DropdownSelect
                                optionsValue={unAssignedSnippet}
                                value={selectedSnippet}
                                handleDropdownChange={handleDropdownChange}
                                isMultiSelect={false}
                                placeholder="Select Snippets"
                            />
                        </div>
                        <div className="apply-btn ml-5">
                            <Buttons
                                buttonTypeClassName="theme-button"
                                buttonText="Assign Snippet"
                                onClick={handleClick}
                                isDisable={props.isButtonDisable}
                            />
                        </div>
                    </div>
                </div>
                <div className='mt-4'>

                    <FinalMolGrid
                        ref={molGridRef}
                        configuration={assignSnippetInfo}
                        dataSource={snippedDataSource}
                        isLoading={isLoading}
                        pagination={{
                            totalCount: totalRowCount,
                            pageSize: 25,
                            currentPage: 1,
                        }}
                        onPageChange={handlePageChange}
                        onActionChange={actionHandler}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

AssignSnippets.propTypes = {
    emailTemplateId: PropTypes.number.isRequired,
    isButtonDisable: PropTypes.bool,
};
export default AssignSnippets