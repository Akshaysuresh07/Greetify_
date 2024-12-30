import React, { useState } from 'react';
import { createTemplate } from '../Api/templateApi';

const AddTemplate = ({ onClose, onTemplateAdded }) => {
  const [templateData, setTemplateData] = useState({
    name: '',
    // subject: '',
    content: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplateData({ ...templateData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTemplate = await createTemplate(templateData);
      console.log('New template:', newTemplate);
      if(newTemplate.code==201){
        alert("Template Created Successfully");
        onTemplateAdded(newTemplate);
        onClose();
        
      }

    
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Template</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Template Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={templateData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
             Upload Image
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={templateData.image}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              
            /> */}
          {/* </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              value={templateData.content}
              onChange={handleChange}
              rows="6"
              className="w-full p-2 border border-gray-300 rounded resize-none"
              required
            ></textarea>
          </div>
          <div className="flex justify-between">
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