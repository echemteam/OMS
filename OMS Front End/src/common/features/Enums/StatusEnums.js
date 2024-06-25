export const StatusEnums = {
    ALL: "0",
    Pending: "1",
    Submitted: "2",
    Approved: "3",
    Freeze: "4",
    Block: "5",
    Disable: "6",
    Reject:"7",
}

export const StatusFeild = {
    Freeze: "Freeze",
    Block: "Block",
    Disable: "Disable",
    Reject:"Reject",
}

export const StaticStatus = {
    Pending: [{ value: "1", label: "Pending" }, { value: "2", label: "Submitted" }],
    Submitted: [{ value: "2", label: "Submitted" }, { value: "3", label: "Approved" }],
    Approved: [
        { value: "3", label: "Approved" }, { value: "4", label: "Freeze" },
        { value: "5", label: "Block" },
        { value: "6", label: "Disable" },
        {
            value:"7",label:"Reject"
        }
    ],
    Reject:[{ value: "7", label: "Reject" },{ value: "1", label: "Pending" }]
}

export const StatusValue = [
    { value: 1, label: "Pending" },
    { value: 2, label: "Submitted" },
    { value: 3, label: "Approved" },
    { value: 4, label: "Freeze" },
    { value: 5, label: "Block" },
    { value: 6, label: "Disable" },
    {
        value:7,label:"Reject"
    },
    
];