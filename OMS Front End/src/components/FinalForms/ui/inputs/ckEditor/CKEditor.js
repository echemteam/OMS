import React from 'react';
import { ClassicEditor } from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import 'ckeditor5/ckeditor5.css';
import './CkEditor.scss';
import { editorConfig } from './CkEditorConfig';

const CKEditorComponent = ({
    onCKEditorChange,
    data,
    isDisable,
    ...editorProps
}) => {

    return (
        <div className="ckeditor-sec">
            <CKEditor
                editor={ClassicEditor}
                data={editorProps?.value}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onCKEditorChange(data, editor);
                }}
                config={editorConfig}
                disabled={isDisable}
                {...editorProps}
            />
        </div>
    );
};

export default CKEditorComponent;
