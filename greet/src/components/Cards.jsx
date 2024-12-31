import React from 'react';
// import image9 from '../assets/image 8.png'

const Cards = ({ templates,onView }) => {
  console.log(templates);
  
  return (
<div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 lg:mt-8">    
    {templates.map((template) => (
        <div key={template._id} className="bg-white border  border-gray-300 rounded-lg shadow-md w-80 p-4">
         
          <div className="mb-4">
                      <div className="mb-4 w-100 max-h-96   p-2 border border-gray-300 rounded-lg overflow-clip " dangerouslySetInnerHTML={{ __html: template.content}} />
          </div>
          <div className='flex justify-between'>
              <div className="mb-4">
                <h3 className="text-xl font-bold">{template.name}</h3>
                {/* <h4 className="text-lg text-gray-600">{template.subject}</h4> */}
              </div>
              <div className="flex justify-between">
                <button
                 onClick={() => onView(template)}
                  className="bg-white  text-violet-400 px-3 py-2 rounded hover:text-violet-800"
                >
                  View
                </button>
             
              </div>
              
          </div>
          {/* <div className=" p-1  bg-red-200  rounded-lg">
          <h4 className="text-lg text-center text-red-600 font-semibold ">{template.category}</h4>

          </div> */}
        </div>
      ))}
    </div>

    
  );
};

export default Cards;