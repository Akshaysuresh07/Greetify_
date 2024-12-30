import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles.css'; // Import your custom CSS

const Editor = () => {
  const [editorContent, setEditorContent] = useState('');

  //template
const template = {
  "content": `<html>\n<head>\n    <title>Warm Wishes for a Joyous Holiday Season</title>\n</head>\n<body>\n<br/>\n<br/>\n\n<!-- Outer container -->\n<div style=\"min-width:390px; max-width:650px; width:80%; margin:10px auto; border:solid thin gray; font-family:Arial; font-size:13pt; background:url('https://drive.google.com/file/d/1a3-Fz7g8o2icyV2k0r6dikkAxCLDMt7U/view?usp=sharing') no-repeat; background-size:contain;\">\n\n<!-- Header -->\n<div style=\"padding-bottom:35px;\">\n    <a href=\"https://ictkerala.org/\" target=\"_blank;\" alt=\"Official Website of ICTAK\" title=\"Official Website of ICT Academy of Kerala\"><img style=\"width:100px; float:right; margin:20px 20px 0 0;\" src=\"https://drive.google.com/uc?id=15xbZ51rwvJ-o3tJMlIGaqtktRcMy-jSY\"/></a>\n    <img src=\"https://drive.google.com/uc?id=1a3-Fz7g8o2icyV2k0r6dikkAxCLDMt7U\" alt=\"Image\">\n</div>\n<!-- Header End -->\n\n<!-- Inner Container -->\n<div style=\"\">\n\n<!-- Main Body -->\n<div style=\"margin-top:800px; min-width:350px; padding:0 20px; font-size:13pt; \">\n    <p>\n        Dear Well-wisher,<br/>\n        As the holiday season approaches, we want to take a moment to express our heartfelt gratitude for your continued support and collaboration throughout the year. Your commitment has played a pivotal role in our shared successes.\n    </p>\n    <p>\n        This festive season is a time for reflection, appreciation, and joy. We are immensely grateful for the trust you have placed in us, and we look forward to building on our partnership in the coming year.\n    </p>\n    <p>\n        May your holidays be filled with warmth, laughter, and the company of loved ones. As we celebrate the spirit of the season, let's cherish the moments that matter most.\n    </p>\n    <p>\n        Thank you for being an essential part of our journey. Wishing you a Merry Christmas and a joyous holiday season.\n    </p>\n    <p>\n        Warm Regards<br/><b>ICT Academy of Kerala<b>\n    </p>\n</div>\n<!-- Main Body End -->\n\n<!-- Footer -->\n<div style=\"background:url('https://drive.google.com/uc?id=1UXP-c839s8tjQeZCr7-T6EKTuHRngN-M') no-repeat left bottom; min-height:80px;\">\n<div style=\"margin-top:50px; text-transform:uppercase; font-size:65%; color:gray; text-align:center; font-family:Arial; font-weight:bold;\">\n    A Govt. of India supported, Govt. of Kerala partnered social enterprise.\n</div>\n\n<div style=\"margin-top:25px; padding:20px; text-align:right; font-size:80%; color:gray; font-weight:bold;\">\n    <a href=\"https://linkedin.com/company/ictkerala\" target=\"_blank\"><img title=\"ICTAK LinkedIn Page\" style=\"height:20px;\" src=\"https://drive.google.com/uc?id=17xBSkbFK7Q3RAwgoXL5biuki3fBtAwHB\"/></a>\n    <a href=\"https://fb.me/ictkerala\" target=\"_blank\"><img title=\"ICTAK Facebook Page\" style=\"height:20px;\" src=\"https://drive.google.com/uc?id=1815xzC2bA-n2anz7CE0am_XHdghMEF2w\"/></a> \n    <a href=\"https://instagr.am/ictkerala\" target=\"_blank\"><img title=\"ICTAK Instagram Handle\" style=\"height:20px;\" src=\"https://drive.google.com/uc?id=17zD-7fqTM54jnCqml1zWuVvhzFeh7CxB\"/></a> \n    <a href=\"https://youtube.com/ictkerala\" target=\"_blank\"><img title=\"YouTube Channel\" style=\"height:20px;\" src=\"https://drive.google.com/uc?id=17x0EmMXdzhNlWV-GbO6jv0bDtvgbIS1Y\"/></a>\n</div>\n</div>\n<!-- Footer End -->\n\n<!-- Outer Footer -->\n<div style=\"width:300px; margin: 25px auto; font-family:Arial; text-align:center; text-transform:uppercase; font-size:65%; color:gray;\">\n    <span style=\"font-size:125%; font-weight:bold; color:#0099CC\">ICT Academy of Kerala</span><br/>G1, Thejaswini, Technopark Campus<br/>Thiruvananthapuram, Kerala, India - 695581\n</div>\n<!-- Outer Footer End -->\n\n<br/>\n<br/>\n</body>\n
  </html>\n`,
"id": "6766a407b217ebf723e41d18"
}
const sendemeail=()=>{

}
  // Function to replace the message section with updated content
  const replaceMessageContent = (html, newMessageContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const messageDiv = doc.querySelector('body');
    if (messageDiv) {
      messageDiv.innerHTML = newMessageContent;
    }
    return doc.documentElement.outerHTML;
  };
  // Initialize editor content with the template's message content
  useEffect(() => {
    setEditorContent(template.content);
  }, [template.content]);

  // Handle changes in the editor
  const handleChange = (content) => {
    setEditorContent(content);
    const updatedHtmlContent = replaceMessageContent(template.content, editorContent);
    
    
    console.log("Sending email with the following content:");
    console.log(updatedHtmlContent);
  };

  const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],        
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image','code-block'],                                
        ['clean']                                         
    ],
};

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "link",
    "image",
    "code-block",
    
  ];

  return (
    <div style={{ width: '700px', margin: 'auto', padding: '20px' }}>
      <h2>{template.subject}</h2>
      <ReactQuill
        theme="snow"
        value={editorContent}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        style={{ height: '300px', marginBottom: '10px' }}
      />

    </div>
    
  );
};

export default Editor;

