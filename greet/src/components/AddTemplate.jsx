import React, { useState } from 'react';
import { createTemplate } from '../Api/templateApi'; 

const AddTemplate = ({ onTemplateAdded, onClose }) => {
  const [templateData, setTemplateData] = useState({
    name: '',
    content: `<!DOCTYPE html>
    <html>
    <head>
        <title>Warm Wishes for a Joyous Holiday Season</title>
    </head>
    <body>
    <br/>
    <br/>
    
    <!-- Outer container -->
    <div style="min-width:390px; max-width:650px; width:80%; margin:10px auto; border:solid thin gray; font-family:Arial; font-size:13pt; background:url({imgUrl}) no-repeat; background-size:contain;">
    
    <!-- Header -->
    <div style="padding-bottom:35px;">
        <img style="width:200px; margin:40px 0 0 20px;" src="https://ictkerala.org/uploads/2024/05/LOGO_ICTAK-ENG-Black-Text.png" alt="Logo - ICT Academy of Kerala" title="ICT Academy of Kerala"/>
    </div>
    <!-- Header End -->
    
    <!-- Main Body -->
    <div style="margin-top:600px; min-width:350px; padding:0 20px; font-size:13pt; ">
    Dear {{name}},
    <br/>
    <div id="mainBody">


    </div>

    </div>
    
    <!-- Footer -->
    <div style="width:300px; margin: 25px auto; font-family:Arial; text-align:center; text-transform:uppercase; font-size:65%; color:gray;">
        <span style="font-size:125%; font-weight:bold; color:#0099CC">ICT Academy of Kerala</span><br/>G1, Thejaswini, Technopark Campus<br/>Thiruvananthapuram, Kerala, India - 695581
    </div>
    <!-- Footer End -->
    
    <br/>
    <br/>
    </body>
    </html>`,
    image: ''
  });
  const [preview, setPreview] = useState('');
  const [mainBodyContent, setMainBodyContent] = useState('');
  console.log('mainbody----', mainBodyContent);
  console.log('templateData----', templateData);
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplateData({ ...templateData, [name]: value });
  };

  const handleMainBodyChange = (e) => {
    setMainBodyContent(e.target.value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Show preview
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUpload = async (e) => {
    e.preventDefault();
  
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (!file) {
      alert('Please select an image first.');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      
    if (result.data && result.data.filename) {
      // Set uploaded image as background image
      const imgUrl = ` https://greetify-ryxz.onrender.com/api/uploads/${result.data.filename}`;
      setTemplateData((prev) => ({
        ...prev,
        content: prev.content.replace('{imgUrl}', imgUrl),
      }));
      alert('Image uploaded successfully!');
    } else {
      alert('Image upload failed.');
    }


    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedContent = templateData.content.replace(
      '<div id="mainBody">',
      `<div id="mainBody">${mainBodyContent}`
  );
    console.log('Updated content:', updatedContent);
    
    try {
      const newTemplate = await createTemplate({ ...templateData, content: updatedContent });
      console.log('New template:', newTemplate);
      if (newTemplate.code === 201) {
        alert('Template Created Successfully');
        onTemplateAdded(newTemplate);
        onClose();
      }
    } catch (error) {
      console.error('Error creating template:', error.response ? error.response.data : error.message);
      alert('Error creating template:', error.response ? error.response.data : error.message);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 max-h-full overflow-y-auto">
      <h2>Add New Template</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={templateData.name}
            onChange={handleChange}
            placeholder="name"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4 flex flex-row justify-between">
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button onClick={handleUpload} className="bg-blue-500  px-2 py-1 w-2/4 text-white rounded mt-2">
            Upload 
          </button>
        </div>
        <div className="mb-4">
        <textarea
            name="mainBodyContent"
            value={mainBodyContent}
            onChange={handleMainBodyChange}
            placeholder="Enter main  content here..."
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            rows="10"
          />
        </div>
    
        {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
        <div className="flex justify-between mt-5">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gary-600"
            >
              Add Template
            </button>
          </div>
      </form>
    </div>
    </div>
  );
};

export default AddTemplate;