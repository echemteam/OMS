import React, { useState } from 'react'
import CardSection from '../../components/ui/card/CardSection';
import RenderTabs from '../../components/ui/tabs/RenderTabs';
const OrganizationContactDetail=React.lazy(() => import("./feature/organizationContactDetail/OrganizationContactDetail"))
const SMTPSettings = React.lazy(() => import("./feature/smtpSettings/SMTPSettings"));
const OtherSettings = React.lazy(() => import("./feature/otherSettings/OtherSettings"));
const OrganizationProfileManagement = React.lazy(() => import("./feature/organizationProfileManagement/OrganizationProfileManagement"));

const Organization = () => {

    const [organizationId, setOrganizationId] = useState(0)
    const [smtpSettingId, setSmtpSettingId] = useState(0)
    const [organizationOtherSettingId, setOrganizationOtherSettingId] = useState(0)
    const [activeTabId, setActiveTabId] = useState(0)

    const handleSetOrganizationId = (id) => {
        setOrganizationId(id)
    }


    const handleSetSmtpSettingId = (id) => {
        setSmtpSettingId(id)
    }

    const handleSetOrganizationOtherSettingId = (id) => {
        setOrganizationOtherSettingId(id)
    }

    const handleActiveTab = (id) => {
        setActiveTabId(id)
    }

    const tabs = [
        {
            sMenuItemCaption: "Organization Profile",
            component: (
                <div className="mt-2">
                    <OrganizationProfileManagement
                        activeTabId={activeTabId}
                        onHandleOrganization={handleSetOrganizationId}
                        organizationId={organizationId} />
                </div>
            ),
        },
        // organizationId > 0 &&
        {
            sMenuItemCaption: "SMTP Settings",
            component: (
                <div className="mt-2">
                    <SMTPSettings
                        activeTabId={activeTabId}
                        organizationId={organizationId}
                        onHandleSmtp={handleSetSmtpSettingId}
                        smtpSettingId={smtpSettingId} />
                </div>
            ),
        },

        // smtpSettingId > 0 &&
        {
            sMenuItemCaption: "Other Settings",
            component: (
                <div className="mt-2">
                    <OtherSettings
                        activeTabId={activeTabId}
                        organizationId={organizationId}
                        smtpSettingId={smtpSettingId}
                        organizationOtherSettingId={organizationOtherSettingId}
                        onHandleOrganizationOtherSetting={handleSetOrganizationOtherSettingId} />
                </div>
            ),
        },
        {
            sMenuItemCaption: "Contact Details",
            component: (
                <div className="mt-2">
                   <OrganizationContactDetail activeTabId={activeTabId} />
                </div>
            ),
        },

    ];

    return (
        <div className="vertical-tab-card">
            <div className="row">
                <div className="col-xxl-12 col-xl-12 col-md-12 col-12">
                    <CardSection cardTitle={
                        activeTabId === 0 ? "Organization Profile Management" :
                            activeTabId === 1 ? "SMTP Settings" :
                                activeTabId === 2 ? "Other Settings" :
                                    ""
                    }>
                        <div className="vertical-tab-inner">
                            <RenderTabs tabs={tabs} isCollapse={true} onActiveTab={handleActiveTab} isOrganization={true} />
                        </div>
                    </CardSection>
                </div>
            </div>
        </div>
    )
}

export default Organization