import {
    AccessibilityHelp,
    Alignment,
    AutoImage,
    AutoLink,
    Autosave,
    Bold,
    CloudServices,
    Code,
    CodeBlock,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    ImageBlock,
    ImageInline,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Italic,
    Link,
    LinkImage,
    List,
    Paragraph,
    SelectAll,
    SourceEditing,
    SpecialCharacters,
    Strikethrough,
    Style,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    Underline,
    Undo
} from 'ckeditor5';

export const editorConfig = {
    toolbar: {
        items: [
            'undo',
            'redo',
            '|',
            '|',
            'heading',
            // 'style',
            '|',
            'bold',
            'underline',
            'bulletedList',
            'numberedList',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            'italic',
            '|',
            'strikethrough',
            'fontFamily',
            // 'code',
            '|',
            'insertTable',
            'sourceEditing',
            'superscript',
            'specialCharacters',
            'link',
            'codeBlock',
            '|',
            'alignment',
            '|'
        ],
        shouldNotGroupWhenFull: false
    },
    plugins: [
        AccessibilityHelp, Alignment, AutoImage, AutoLink, Autosave, Bold, CloudServices, Code,
        CodeBlock, Essentials, FontBackgroundColor, FontColor, FontFamily, FontSize, GeneralHtmlSupport,
        Heading, ImageBlock, ImageInline, ImageInsertViaUrl, ImageResize, ImageStyle, ImageTextAlternative,
        ImageToolbar, ImageUpload, Italic, Link, LinkImage, List, Paragraph, SelectAll, SourceEditing,
        SpecialCharacters, Strikethrough, Style, Superscript, Table, TableCaption, TableCellProperties,
        TableColumnResize, TableProperties, TableToolbar, Underline, Undo
    ],
    fontFamily: {
        supportAllValues: true
    },
    fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true
    },
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
            { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
        ]
    },
    htmlSupport: {
        allow: [
            {
                name: /^.*$/,
                styles: true,
                attributes: true,
                classes: true
            }
        ]
    },
    image: {
        toolbar: ['imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|', 'resizeImage']
    },
    initialData: ``,
    link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
            toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                    download: 'file'
                }
            }
        }
    },
    placeholder: 'Type or paste your content here!',
    style: {
        definitions: [
            { name: 'Article category', element: 'h3', classes: ['category'] },
            { name: 'Title', element: 'h2', classes: ['document-title'] },
            { name: 'Subtitle', element: 'h3', classes: ['document-subtitle'] },
            { name: 'Info box', element: 'p', classes: ['info-box'] },
            { name: 'Side quote', element: 'blockquote', classes: ['side-quote'] },
            { name: 'Marker', element: 'span', classes: ['marker'] },
            { name: 'Spoiler', element: 'span', classes: ['spoiler'] },
            { name: 'Code (dark)', element: 'pre', classes: ['fancy-code', 'fancy-code-dark'] },
            { name: 'Code (bright)', element: 'pre', classes: ['fancy-code', 'fancy-code-bright'] }
        ]
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    }
};