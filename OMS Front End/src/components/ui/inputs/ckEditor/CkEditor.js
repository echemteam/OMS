import React, { useEffect, useRef, useState } from 'react';
import PropTypes from "prop-types";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import './CkEditor.scss';
import { editorConfig } from './CkEditorConfig';

const CKEditorComponent = ({
  onCKEditorChange,
  data,
  isDisable,
  ...editorProps
}) => {
  const editorContainerRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false); // Cleanup on unmount
  }, []);

  return (
    <div className="main-container">
      <div className="editor-container editor-container_classic-editor editor-container_include-style" ref={editorContainerRef}>
        <div className="editor-container__editor ckeditor-section">
          {isLayoutReady &&
            <CKEditor
              editor={ClassicEditor}
              config={editorConfig}
              data={editorProps?.value}
              onChange={(event, editor) => {
                const data = editor.getData();
                onCKEditorChange(data, editor);
              }}

              disabled={isDisable}
              {...editorProps}
            />}
        </div>
      </div>
    </div>
    // <div className="ckeditor-sec" ref={editorContainerRef}>
    //   {isLayoutReady && <CKEditor editor={ClassicEditor} config={editorConfig}
    //     data={editorProps?.value}
    //     onChange={(event, editor) => {
    //       const data = editor.getData();
    //       onCKEditorChange(data, editor);
    //     }}
    //     disabled={isDisable}
    //     {...editorProps}
    //   />}
    //   {/* <CKEditor
    //     editor={ClassicEditor}
    //     data={editorProps?.value}
    //     onChange={(event, editor) => {
    //       const data = editor.getData();
    //       onCKEditorChange(data, editor);
    //     }}
    //     config={{
    //       toolbar: [
    //         'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo'
    //       ],
    //       placeholder: editorProps.placeholder || 'Enter text here...',
    //       ...editorProps.config
    //     }}
    //     disabled={isDisable}
    //     {...editorProps}
    //   /> */}
    // </div>
  );
};

CKEditorComponent.propTypes = {
  onCKEditorChange: PropTypes.func.isRequired,
  data: PropTypes.string,
  isDisable: PropTypes.bool,
  placeholder: PropTypes.string,
  config: PropTypes.object,
};

export default CKEditorComponent;
