import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";

const initState = {
  registeredName: "",
  dBAName: "",
  dateIncorporated: "",
  nAICSCode: "",
  eIN: "",
  tXTaxpayerNumber: "",
  sOSFileNumber: "",
  webFileNumber: "",
  tWCTaxAccountNumber: "",
  profilePic: "",
};

export const OrganizationProfileManagementdata = {
  name: " Organization Profile",
  initialState: initState,
  section: [
    {
      title: "Profile Section",
      row: {},
      style: {
        sectionStyle: "col-lg-4 col-md-2",
      },
      wrapperTemplate: <div className="form-card row"></div>, // Wrapper HTML or Component
      fields: [
        {
          id: "profilePic",
          label: "Organization Logo",
          Field_Name: "Organization Logo",
          fieldType: FormFieldTypes.FILE,
          dataField: "profilePic",
          fieldSetting: {
            placeholder: "Organization Logo",
            imageUpload: true,
            acceptedFiles: ".png , .jpg ",
            maxSize: 3, // This size in MB
          },
          validation: [{ type: validationTypes.REQUIRE }],

          style: {
            containerCss:
              "col-lg-12 col-md-12 profile-pic-upload .validation-text-fileuploader",
          },
        },
      ],
    },
    {
      // title: "Organization Information Section",
      // row: {},
      style: {
        sectionStyle: "col-lg-8 col-md-6",
      },
      // wrapperTemplate: <div className=" row"></div>, // Wrapper HTML or Component
      rowGroup: [
        {
          // groupLabel: "Organization Information", // Group for personal details
          style: {
            groupStyle: "col-lg-12 col-md-12",
          },
          groupWrapper: <div className="form-card row"></div>,
          fields: [
            {
              id: "registeredName",
              label: "Registered Name ",
              Field_Name: "Registered Name",
              fieldType: FormFieldTypes.INPUT,
              dataField: "registeredName",
              fieldSetting: {
                placeholder: "Enter Registered Name",
                allowSpace: true,
                maxLength: 100,
              },
              validation: [{ type: validationTypes.REQUIRE }],
              style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
              },
            },
            {
              id: "dBAName",
              label: "DBA Name ",
              Field_Name: "DBA Name",
              fieldType: FormFieldTypes.INPUT,
              dataField: "dBAName",
              fieldSetting: {
                placeholder: "Enter DBA Name",
                allowSpace: true,
                maxLength: 255,
              },
              validation: [{ type: validationTypes.REQUIRE }],
              style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
              },
            },
            {
              id: "dateIncorporated",
              label: "Date Incorporated ",
              Field_Name: "Date Incorporated",
              fieldType: FormFieldTypes.DATEPICKER,
              dataField: "dateIncorporated",
              fieldSetting: {
                placeholder: "Select Date Incorporated",
                allowSpace: true,
              },
              validation: [{ type: validationTypes.REQUIRE }],
              style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
              },
            },
            {
              id: "nAICSCode",
              label: "NAICS Code ",
              Field_Name: "NAICS Code",
              fieldType: FormFieldTypes.INPUT,
              dataField: "nAICSCode",
              fieldSetting: {
                placeholder: "Select NAICS Code",
                allowSpace: true,
                maxLength: 6,
              },
              validation: [{ type: validationTypes.REQUIRE }],
              style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
              },
            },
            {
              id: "eIN",
              label: "EIN ",
              Field_Name: "EIN",
              fieldType: FormFieldTypes.INPUT,
              dataField: "eIN",
              fieldSetting: {
                placeholder: "Select EIN",
                allowSpace: true,
                maxLength: 9,
              },
              validation: [{ type: validationTypes.REQUIRE }],
              style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
              },
            },
            {
              id: "tXTaxpayerNumber",
              label: "TXTaxpayer Number ",
              Field_Name: "TXTaxpayer Number",
              fieldType: FormFieldTypes.NUMERIC,
              dataField: "tXTaxpayerNumber",
              fieldSetting: {
                placeholder: "Select TXTaxpayer Number",
                allowSpace: true,
                maxLength: 20,
              },
              validation: [{ type: validationTypes.REQUIRE }],
              style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
              },
            },
            {
              id: "sOSFileNumber",
              label: "SOS File Number ",
              Field_Name: "SOS File Number",
              fieldType: FormFieldTypes.NUMERIC,
              dataField: "sOSFileNumber",
              fieldSetting: {
                placeholder: "Enter SOS File Number",
                allowSpace: true,
                maxLength: 20,
              },
              validation: [{ type: validationTypes.REQUIRE }],
              style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
              },
            },
            {
              id: "webFileNumber",
              label: "Web File Number ",
              Field_Name: "Web File Number",
              fieldType: FormFieldTypes.NUMERIC,
              dataField: "webFileNumber",
              fieldSetting: {
                placeholder: "Enter Web File Number",
                allowSpace: true,
                maxLength: 20,
              },
              validation: [{ type: validationTypes.REQUIRE }],
              style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
              },
            },
            {
              id: "tWCTaxAccountNumber",
              label: "TWC Tax Account Number ",
              Field_Name: "TWC Tax Account Number",
              fieldType: FormFieldTypes.NUMERIC,
              dataField: "tWCTaxAccountNumber",
              fieldSetting: {
                placeholder: "Enter TWC Tax Account Number",
                allowSpace: true,
                maxLength: 20,
              },
              validation: [{ type: validationTypes.REQUIRE }],
              style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-input",
              },
            },
          ],
        },
      ],
    },
  ],
  formSetting: {
    isViewOnly: false,
  },
};
