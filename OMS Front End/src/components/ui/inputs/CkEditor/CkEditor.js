import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './CkEditor.scss';

const CKEditorComponent = ({
  onCKEditorChange,
  data,
  isDisable,
  ...editorProps
}) => {

  const initialData = data !== undefined ? data : editorProps.value;
  
  return (
    <div className="ckeditor-sec">
      <CKEditor
        editor={ClassicEditor}
        data={initialData}
        onChange={(event, editor) => {
          const data = editor.getData();
          onCKEditorChange(data, editor);
        }}
        config={{
          toolbar: [
            'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo'
          ],
          placeholder: editorProps.placeholder || 'Enter text here...',
          ...editorProps.config
        }}
        disabled={isDisable}
        {...editorProps}
      />
    </div>
  );
};

export default CKEditorComponent;
