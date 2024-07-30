import React, { useEffect, useState } from 'react'
import NoRecordFound from '../../../../components/ui/noRecordFound/NoRecordFound';
import "./OrganizationHistory.scss";
import moment from 'moment';

const OrganizationHistory = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const staticData = [
      {
        id: 1,
        eventStatus: 'Insert',
        personName: 'Nisarg Patel',
        organizationName: 'Moltech Solution',
        date: '2024-07-29T10:30:00Z', // Add a date field for formatting
      },
      {
        id: 2,
        eventStatus: 'Update',
        personName: 'John Doe',
        organizationName: 'Tech Innovators',
        date: '2024-07-28T09:15:00Z', // Add a date field for formatting
      },
      {
        id: 3,
        eventStatus: 'Insert',
        personName: 'Jane Smith',
        organizationName: 'Future Tech',
        date: '2024-07-27T08:45:00Z', // Add a date field for formatting
      },
      {
        id: 3,
        eventStatus: 'Insert',
        personName: 'Jane Smith',
        organizationName: 'Future Tech',
        date: '2024-07-27T08:45:00Z', // Add a date field for formatting
      },
      {
        id: 3,
        eventStatus: 'Insert',
        personName: 'Jane Smith',
        organizationName: 'Future Tech',
        date: '2024-07-27T08:45:00Z', // Add a date field for formatting
      },
      {
        id: 3,
        eventStatus: 'Insert',
        personName: 'Jane Smith',
        organizationName: 'Future Tech',
        date: '2024-07-27T08:45:00Z', // Add a date field for formatting
      },
      {
        id: 3,
        eventStatus: 'Insert',
        personName: 'Jane Smith',
        organizationName: 'Future Tech',
        date: '2024-07-27T08:45:00Z', // Add a date field for formatting
      },
      {
        id: 3,
        eventStatus: 'Insert',
        personName: 'Jane Smith',
        organizationName: 'Future Tech',
        date: '2024-07-27T08:45:00Z', // Add a date field for formatting
      },
      {
        id: 3,
        eventStatus: 'Insert',
        personName: 'Jane Smith',
        organizationName: 'Future Tech',
        date: '2024-07-27T08:45:00Z', // Add a date field for formatting
      },
    ];

    setHistoryData(staticData);
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <div class="main-card">
          {historyData.length > 0 ? (
            <div className="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
              {historyData.map((event, index) => {
                const formattedDate = event.date ? moment(event.date).format('DD/MM/YYYY hh:mm:ss A') : '';
                return (
                  <div className="vertical-timeline-item vertical-timeline-element" key={index}>
                    <div>
                      <span className="vertical-timeline-element-icon bounce-in">
                        <i className="badge badge-dot badge-dot-xl badge-primary"> </i>
                      </span>
                      <div className="vertical-timeline-element-content bounce-in">
                        <h4 className="timeline-title">
                          <span className="mr-1">{event.personName}</span>
                          <span className="mr-1 font-bold">{event.organizationName}</span>
                        </h4>
                        <p>Some Etc Text.......... {formattedDate} </p>
                        {/* <span className="vertical-timeline-element-date">
                          {formattedDate}
                        </span> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <NoRecordFound />
          )}
        </div>
      </div>
    </div>
  );
}

export default OrganizationHistory