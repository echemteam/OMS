import React from 'react'
import "./../../HistoryDetail/TimeLine.scss";
import Buttons from '../../../../../components/ui/button/Buttons';
import { AppIcons } from '../../../../../data/appIcons';

const events = [
    { id: 1, name: "Aurumusit +", email: "nisarg@gmail.com", action: "Changed the this document .", time: "1 day ago" },
    { id: 2, name: "Aurumusit +", email: "amit@gmail.com", action: "Changed the this document .", time: "1 day ago" },
    { id: 3, name: "Aurumusit +", email: "amit@gmail.com", action: "Changed the this document .", time: "1 day ago" },
    { id: 4, name: "Aurumusit +", email: "amit@gmail.com", action: "Changed the this document .", time: "1 day ago" },
    { id: 5, name: "Aurumusit +", email: "amit@gmail.com", action: "Changed the this document .", time: "1 day ago" },
];

const TimeLine = () => {
    return (
        <>
            <div className="row">
                <div className='d-flex justify-content-end mt-2'>
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Refresh"
                        imagePath={AppIcons.refreshIcone}
                        textWithIcon={true}
                    >
                    </Buttons>
                </div>
                <div className="col-md-12">
                    <div className="main-card mt-4">
                        <div className="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                            {events.map(event => (
                                <div className="vertical-timeline-item vertical-timeline-element" key={event.id}>
                                    <div>
                                        <span className="vertical-timeline-element-icon bounce-in">
                                            <i className="badge badge-dot badge-dot-xl badge-primary"> </i>
                                        </span>
                                        <div className="vertical-timeline-element-content bounce-in">
                                            <h4 className="timeline-title">
                                                <span className="mr-1">{event.name}</span>
                                                <span className="mr-1 font-bold">{event.email}</span>
                                                <span>{event.action}</span>
                                                {/* <b> &nbsp;{event.time}</b> */}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TimeLine