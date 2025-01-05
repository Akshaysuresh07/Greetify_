import React from 'react';

const RecipientList = ({recipients}) => {

    
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Name</th>
            
          </tr>
        </thead>
        <tbody>
         
            {recipients && recipients.length > 0 ? (
            recipients.map((recipient, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-center">{recipient.email}</td>
                <td className="py-2 px-4 border-b text-center">{recipient.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-2 px-4 border-b text-center">
                No recipients available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecipientList;