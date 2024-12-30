import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles.css'; // Import your custom CSS

const TextEditor = ({ content, onContentChange, template }) => {
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
  
      setEditorContent(content);
    },
   [content, template]);

  const handleChange = (content) => {
    setEditorContent(content);
    onContentChange(content);
  };

  const replaceMessageContent = (html, newMessageContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const messageDiv = doc.querySelector('body');
    if (messageDiv) {
      messageDiv.innerHTML = newMessageContent;
    }
    return doc.documentElement.outerHTML;
  };

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image', 'code-block'],
      ['clean']
    ]
  };

  return (
    <ReactQuill
      value={editorContent}
      onChange={handleChange}
      modules={modules}
      className="custom-quill"
    />
  );
};

export default TextEditor;