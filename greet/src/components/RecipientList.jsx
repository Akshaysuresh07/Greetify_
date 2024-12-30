import React from 'react';

const RecipientList = () => {
    
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
         
            <tr >
              <td className="py-2 px-4 border-b">1</td>
              <td className="py-2 px-4 border-b">Namwe</td>
              <td className="py-2 px-4 border-b">Tets@gamil.com</td>
            </tr>
        
        </tbody>
      </table>
    </div>
  );
};

export default RecipientList;