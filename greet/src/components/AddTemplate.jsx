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
<style>
    @media screen and (max-width: 600px) {
        .mainBody {
            font-size: 11pt;
            padding: 10px;
            margin-top: 300px;
        }
    }
    </style>
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

    
<!-- Slider Start-->
<div style="display:none;">
  <img style="width:100%;" src="https://drive.google.com/uc?id=1LHiuSlgh3QPiYYhSj-pw_JBmNvCpgeP5"/>
</div>
 <!-- Slider End -->

<!-- Inner Container -->
<div style="">

<!-- Main Body -->
<div style="margin-top:800px; min-width:350px; padding:0 20px; font-size:13pt; ">
    <p>
        Dear Well-wisher,<br/>
        As the holiday season approaches, we want to take a moment to express our heartfelt gratitude for your continued support and collaboration throughout the year. Your commitment has played a pivotal role in our shared successes.
    </p>
    <p>
        This festive season is a time for reflection, appreciation, and joy. We are immensely grateful for the trust you have placed in us, and we look forward to building on our partnership in the coming year.
    </p>
    <p>
        May your holidays be filled with warmth, laughter, and the company of loved ones. As we celebrate the spirit of the season, let's cherish the moments that matter most.
    </p>
    <p>
        Thank you for being an essential part of our journey. Wishing you a Merry Christmas and a joyous holiday season.
    </p>
    <p>
        Warm Regards<br/><b>ICT Academy of Kerala<b>
    </p>


<div style="margin-top:25px; display:none;">
    <a href="https://ictkerala.org/registration" target="_blank" alt="Register Now" title="Register Now" style="background:#FF7755; padding:10px; border-radius:5px; color:white; text-decoration:none; font-weight:bold;">REGISTER NOW</a>
     <p>
        Registration ends on <b>2023 ഒക്ടോബർ 15</b>
    </p>
</div>
    

</div>
<!-- Main Body End -->
    
<!-- Side Content -->
<div style="margin-top:40px; min-width:150px;">

<div style="padding:5px 20px; background:#CCFBFB; font-size:80%; color:gray; display:none;">
    <p>
        <b>Information and Communication Technology Academy of Kerala</b> (ICTAK) is a social enterprise created in a Public-Private Partnership model (PPP). The organization is committed to imparting ICT skills to the youths of Kerala and thereby improving their employability opportunities in the industry. ICTAK is the largest skilled workforce supplier in the industry and trains and supplies eligible candidates with world-class amenities. ICTAK has successfully offered placement assistance for more than 2000+ candidates to date.
    </p>
</div>
    <div style="font-size:90%;">
        <p>
            
        </p>
    </div>

</div>
<!-- Side Content End -->
<div style="clear:both;"></div>
</div>
<!-- Inner Container End -->

    
<!-- Inner Footer -->
<div style="background:url('https://drive.google.com/uc?id=1UXP-c839s8tjQeZCr7-T6EKTuHRngN-M') no-repeat left bottom; min-height:80px;">
    
<div style="margin-top:50px; text-transform:uppercase; font-size:65%; color:gray; text-align:center; font-family:Arial; font-weight:bold;">
    A Govt. of India supported, Govt. of Kerala partnered social enterprise.
</div>
    

<!-- Inner Footer End -->

<!-- Outer container End -->
</div>

<!-- Outer Footer -->
<div style="width:300px; margin: 25px auto; font-family:Arial; text-align:center; text-transform:uppercase; font-size:65%; color:gray;">
    <span style="font-size:125%; font-weight:bold; color:#0099CC">ICT Academy of Kerala</span><br/>G1, Thejaswini, Technopark Campus<br/>Thiruvananthapuram, Kerala, India - 695581
</div>
<!-- Outer Footer End -->

<br/>
<br/>
</body>
</html>`,
    image: ''
  });
  const [preview, setPreview] = useState('');
  const [mainBodyContent, setMainBodyContent] = useState('');
  console.log('mainbody----', mainBodyContent);
  
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
            placeholder="Enter main body content here..."
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