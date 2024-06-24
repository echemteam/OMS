import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./TinyEditor.scss";

const TinyEditor = ({
  onTinyMceEditorChange,
  data,
  key,
  onValidation,
  dataField,
  error,
  formSetting,
  isDisable,
  ...editorProps
}) => {
  
  return (
    <>
      <div className="tiny-editor-sec">
        <Editor
          apiKey="y420gmy1qxek6l0hxa1q7m0h7vllwqnopw9maudjccq0wvf1"
          value={data}
          onEditorChange={(newText, editor) =>
            onTinyMceEditorChange(newText, editor)
          }
          {...editorProps}
          disabled={isDisable}
          init={{
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            // toolbar: [
            //   "undo redo | formatselect | bold italic underline linethrough backcolor | alignleft aligncenter alignright | code | bullist numlist checklist outdent indent | table",
            // ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            statusbar: false,
            visual: false,
            content_css: "index.css",
            menubar: false,
            selector: "textarea",
            powerpaste_allow_local_images: true,
            paste_as_text: true,
            content_style:
              " body{font - family: Roboto, sans-serif !important; color:#848484;} #tinymce{color:#848484; border:none; } table tr th{padding:5px;}",
          }}
        />
      </div>
    </>
  );
};

export default TinyEditor;
