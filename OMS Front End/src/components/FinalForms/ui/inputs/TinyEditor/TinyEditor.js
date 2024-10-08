import React from "react";
import PropTypes from "prop-types";

import { Editor } from "@tinymce/tinymce-react";
import "./TinyEditor.scss";

const TinyEditor = (
  {
    onTinyMceEditorChange,
    isToolbarNotRequired,
    isMenubarNotRequired,
    data,
    key,
    onValidation,
    dataField,
    error,
    formSetting,
    isDisable,
    ...editorProps
  }) => {

  // const handleInputChange = (content) => {
  //   if (onTinyMceEditorChange) {
  //     const plainText = new DOMParser().parseFromString(content, 'text/html').body.textContent;
  //     onTinyMceEditorChange(plainText);
  //   }
  // }

  return (

    <div className="tiny-editor-sec">
      <Editor
        initialValue={data || ''}
        value={data}
        apiKey="c5ekv5obelcvvqkkm9qodsa4ongup0do7yo5x0wzbmwuhd94"
        onEditorChange={(newText, editor) => onTinyMceEditorChange(newText, editor)}
        {...editorProps}
        disabled={isDisable}
        init={{
          menubar: !isMenubarNotRequired,
          plugins: "link image code lists wordcount table",
          toolbar:
            isToolbarNotRequired && isToolbarNotRequired === true
              ? ""
              : "undo redo | bold italic underline linethrough | alignleft aligncenter alignright | code | bullist numlist checklist outdent indent | wordcount | table",
          statusbar: false,
          visual: false,
          // content_css: "index.css",
          selector: "textarea",
          powerpaste_allow_local_images: true,
          paste_as_text: true,
          content_style:
            " body{font-family: Roboto, sans-serif !important; color:#848484;}#tinymce{color:#848484; border:none; } table tr th{padding:5px;}",
        }}
      />
    </div>

  );
}
TinyEditor.propTypes = {
  /**
   * Callback function when the content of the editor changes.
   */
  onTinyMceEditorChange: PropTypes.func,

  /**
   * Boolean to determine if the toolbar should be included.
   */
  isToolbarNotRequired: PropTypes.bool,

  /**
   * Boolean to determine if the menubar should be included.
   */
  isMenubarNotRequired: PropTypes.bool,

  /**
   * Initial data/content for the editor.
   */
  data: PropTypes.string,

  /**
   * Key prop for React elements.
   */
  key: PropTypes.string,

  /**
   * Function to validate the editor content.
   */
  onValidation: PropTypes.func,

  /**
   * Data field associated with the editor.
   */
  dataField: PropTypes.string,

  /**
   * Error message related to the editor.
   */
  error: PropTypes.string,

  /**
   * Form settings for the editor.
   */
  formSetting: PropTypes.object,

  /**
   * Boolean to disable the editor.
   */
  isDisable: PropTypes.bool,

  /**
   * Additional props to pass to the Editor component.
   */
  editorProps: PropTypes.object
};

export default TinyEditor;