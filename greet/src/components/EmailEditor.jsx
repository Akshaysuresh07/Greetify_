import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = () => {
  const [content, setContent] = useState('');

  const handleEditorChange = (content) => {
    setContent(content); // Save content in state
  };

  return (
    <Editor
      apiKey="your-api-key" // Get your free API key from TinyMCE
      value={content}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TextEditor;
