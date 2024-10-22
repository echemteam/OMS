import { GridColumnType } from "../../../../components/FinalMolGrid/libs/data/gridColumnType";

const assignSnippetInfo = {
    columns: [
        {
            name: "Name",
            fieldName: "name",
            allowShort: false,
            colStyle: {
                width: "90%",
              },
        },
        {
            name: "Hashtag",
            fieldName: "hashtag",
            allowShort: false,
            colStyle: {
                width: "90%",
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
                width: "10%",
              },
        },
    ]
}

export default assignSnippetInfo;