import { GridColumnType } from "../../../../../components/FinalMolGrid/libs/data/gridColumnType";


const assignRoleInfo = {
    columns: [
        {
            name: "Role",
            fieldName: "roleName",
            allowShort: false,
            colStyle: {
                width: "50%",
              },
        },
        {
            name: "Action",
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: false,
                allowDelete: true
            },
            colStyle: {
                width: "50%",
              },
        },
    ]
}

export default assignRoleInfo;