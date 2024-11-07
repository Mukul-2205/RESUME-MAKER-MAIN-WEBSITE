import React, { useEffect, useState } from 'react';
import { Editor, EditorProvider, Toolbar } from 'react-simple-wysiwyg';
import { 
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnStrikeThrough,
} from 'react-simple-wysiwyg';

function RichTextEditor({ onRichTextEditorChange, defaultValue }) {
    const [value, setValue] = useState('');

    // Initialize value with defaultValue, ensuring it's a string
    useEffect(() => {
        setValue(typeof defaultValue === 'string' ? defaultValue : ''); // Ensure defaultValue is a string
    }, [defaultValue]);

    const handleEditorChange = (newValue) => {
        setValue(newValue.target.value); // Update the local state
        onRichTextEditorChange(newValue); // Directly pass the HTML content string to parent
    };

    return (
        <EditorProvider>
            <Editor 
                value={value} // Use the current value
                onChange={handleEditorChange} // Pass the new HTML content
            >
                <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnStrikeThrough />
                    <BtnNumberedList />
                    <BtnBulletList />
                    <BtnLink />
                </Toolbar>
            </Editor>
        </EditorProvider>
    );
}

export default RichTextEditor;
