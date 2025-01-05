import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import GrapesJSEditor from '../components/GrapeJSEditor';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Email = () => {
  const navigate=useNavigate()
  const location=useLocation();
  const initialContent = location.state && location.state.content ? location.state.content : '';
  // const [formData, setFormData] = useState({
  //   group: '',
  //   content:  initialContent,
  //   emails: [''],
  //   subject: '',
  //   names: [], // Add names to the state
  //   // templateId:location.state.id
    
  // });
  const [emails, setEmails] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState(initialContent);
  const [names, setNames] = useState([]);
  console.log(`Emails: ${emails}, Subject: ${subject}, Content: ${content}, Names: ${names}`);
  
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'emails') {
      setEmails(value);
    } else if (name === 'subject') {
      setSubject(value);
    }
    
  };

  const handleEditorChange = (html) => {
    setContent(html);
    console.log("Updated content:", html);
  };
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const emails = results.data.map(row => row.email).filter(email => email);
        const names = results.data.map(row => row.name).filter(name => name);
        setEmails(emails.join(','));
        setNames(names);
      },
      error: (error) => {
        console.error('Error parsing CSV file:', error);
      }
    });
  };
    // Sample CSV content
    const sampleCsvContent = `email,name
    example1@example.com,Test1`;
    
      // Create a Blob URL for the sample CSV
      const sampleCsvBlob = new Blob([sampleCsvContent], { type: 'text/csv' });
      const sampleCsvUrl = URL.createObjectURL(sampleCsvBlob);
//send email
  const handleSubmit = async () => {
    
    try {
      const formData = { emails, subject, content, names };
      const response = await axios.post('http://localhost:4000/api/sendemails', formData, {
          headers: {
              'Content-Type': 'application/json', 
          },
      });
      if(response){
        alert("Email Sent Successfully");
        setEmails('');
        setSubject('');
        setContent('<p>Edit your template here...</p>');
        setNames([]);
        setTimeout(()=>{
          navigate('/')
        },2000)
      }

      console.log(response.data); 
  } catch (error) {
      console.error('Error sending email:', error.response ? error.response.data : error.message);
      alert("Error sending email:", error.responss ? error.response.data : error.message);
  }
};

  return (
    <>
     {/* <Header/> */}
     
    <div className=" flex w-full min-h-screen bg-slate-100 ">
    <Sidebar/>

    <div className="flex-1 w-full sm:w-2/3 p-4 sm:p-6 lg:p-10 h-auto bg-gray-50 m-4 sm:m-6 lg:m-10 shadow-md rounded-md">      <h1 className="text-2xl font-bold mb-6">Draft Email</h1>
      
      <div className=" w-auto h-auto space-x-6">
     
     <div className="mb-4">
         <div className="mb-4 flex flex-col sm:flex-row gap-6 justify-between">
          
          <input
            type="text"
            name="emails"
            value={emails}
            onChange={handleChange}
            placeholder="Emails"
            className="w-full  p-2 mt-2 border border-gray-300 rounded"
          />
           {/* <label className="block text-gray-700">Subject:</label> */}
          <input
            type="text"
            name="subject"
            
            value={subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            accept=".csv"
          
            onChange={handleFileUpload}
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
                    <a
              href={sampleCsvUrl}
              download="sample.csv"
              className="text-violet-500 hover:underline mt-2 inline-block"
            >
              Template
            </a>

        </div>
          <div className="mb-4">
          <label className="block text-gray-700">Body:</label>
          <div className="h-96 ">
            <GrapesJSEditor content={content} onChange={(e) => handleEditorChange(e.target.value)} onSave={handleEditorChange} />
          </div>
        </div>
          </div>
          
        <div className="flex justify-end mt-5">
          <button
          onClick={handleSubmit}
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
          >
            Send Email
          </button>
        </div>
      </div>
      {message && <p className="text-red-500 text-sm mt-4">{message}</p>}
    </div>    
    </div>
    </>
   
  );
};

export default Email;