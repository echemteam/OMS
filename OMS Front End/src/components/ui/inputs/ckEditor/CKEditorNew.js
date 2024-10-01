import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';
import { editorConfig } from './CkEditorConfig';

import 'ckeditor5/ckeditor5.css';
import './CkEditor.scss';

const CKEditorNew = () => {
    const editorContainerRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    // Ensure layout readiness
    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false); // Cleanup on unmount
    }, []);


    return (
        <div className="main-container">
            <div className="editor-container editor-container_classic-editor editor-container_include-style" ref={editorContainerRef}>
                <div className="editor-container__editor">
                    {isLayoutReady && <CKEditor editor={ClassicEditor} config={editorConfig} />}
                </div>
            </div>
        </div>
    );
};

export default CKEditorNew;
