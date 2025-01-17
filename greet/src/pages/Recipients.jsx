import React, { useEffect, useState } from 'react';
import RecipientList from '../components/RecipientList';
import Header from '../components/Header';
import { AddRecipientsApi, fetchRecipients } from '../Api/Recipients';
import Papa from 'papaparse';

function Recipients() {
  const [isAddRecipientModalOpen, setIsAddRecipientModalOpen] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [parsedRecipients, setParsedRecipients] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const parsedRecipients = results.data.map(row => ({
            email: row.email,
            name: row.name
          })).filter(recipient => recipient.email && recipient.name);
          (parsedRecipients);
          console.log("Parsed Recipients:", parsedRecipients);
          
        },
        error: (error) => {
          console.error('Error parsing CSV file:', error);
        }
      });
    }
  }
    
  
 

  const handleAddRecipient = (email) => {
    const result=AddRecipientsApi(email);
    setRecipients([...recipients, result]);
    
    
    setIsAddRecipientModalOpen(false);
    console.log("Added Recipient:", email);
    
  };
  const getRecipients = async () => {
    try {
      const response =await fetchRecipients();
      setRecipients(response);
    } catch (error) {
      console.log("Error fetching recipients:", error);
  
      
    }
  }
console.log("Recipients:",recipients);

useEffect(()=>{
  getRecipients();
},[])
  return (
    <>
    {/* <Header/> */}

<div className="w-full min-h-screen bg-slate-100 p-6">
      <div className='flex justify-between '>
        <h1 className="text-2xl font-bold mb-6">Recipients</h1>
        <button
          onClick={() => setIsAddRecipientModalOpen(true)}
          className="bg-black text-white px-3 py-2 rounded-xl hover:bg-gray-600 mb-4"
        >
          Add Recipients
        </button>
      </div>
      <div>
        <RecipientList recipients={recipients} />
      </div>

      {isAddRecipientModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 max-h-full overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Add Recipients</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Upload CSV:</label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Add Manually:</label>
              <input
                type="text"
                placeholder="Enter email"
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddRecipient(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsAddRecipientModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button
              onClick={handleAddRecipient}
              className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>

  
  );
}

export default Recipients;