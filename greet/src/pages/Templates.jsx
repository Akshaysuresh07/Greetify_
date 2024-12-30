import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTemplates } from '../Api/templateApi';
import Layout from '../components/Layout'; // Import the Layout component
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import Cards from '../components/Cards';
import AddTemplate from '../components/AddTemplate';

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddTemplateModalOpen, setIsAddTemplateModalOpen] = useState(false);
  
  
  const getTemplates = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTemplates(currentPage, limit);
      setTemplates(data.templates);
      setFilteredTemplates(data.templates);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };
  useEffect(() => {

    getTemplates();
  }, [currentPage, limit]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddTemplate = (newTemplate) => {
    const updatedTemplates = [...templates, newTemplate];
    setTemplates(updatedTemplates);
    setFilteredTemplates(updatedTemplates);
    getTemplates()
    
  };

  const handleView = (template) => {
    setSelectedTemplate(template);
  };

  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

  const handleSelect = () => {
    if (selectedTemplate) {
      navigate('/emails', { state: { content: selectedTemplate.content, id: selectedTemplate._id } });
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = templates.filter(template => 
      template.name.toLowerCase().includes(query) || 
      template.subject.toLowerCase().includes(query)
    );
    setFilteredTemplates(filtered);
  };

  return (
    <Layout>
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
  <h1 className="text-2xl font-bold mb-4 sm:mb-0">Templates</h1>
  <div className="flex flex-col sm:flex-row justify-end gap-5 w-full sm:w-auto">
    <input
      type="text"
      placeholder="Search templates..."
      value={searchQuery}
      onChange={handleSearch}
      className="p-2 border border-gray-300 rounded-md w-full sm:w-auto"
    />
    <button
      onClick={() => setIsAddTemplateModalOpen(true)}
      className="bg-black text-white px-3 py-2 rounded-md hover:bg-black"
    >
      Add Template
    </button>
  </div>
</div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Cards templates={filteredTemplates} onView={handleView} />
          <Pagination
            templatesPerPage={limit}
            totalTemplates={totalPages * limit}
            paginate={handlePageChange}
            currentPage={currentPage}
          />
        </>
      )}

      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 xl:w-2/3 max-h-full overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">{selectedTemplate.name}</h3>
            <h4 className="text-lg text-gray-600 mb-4">{selectedTemplate.subject}</h4>
            <div className="mb-4 w-full h-80 p-2 border border-gray-300 rounded-lg overflow-y-auto" dangerouslySetInnerHTML={{ __html: selectedTemplate.content }} />
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={handleSelect}
                className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddTemplateModalOpen && (
        <AddTemplate
          onClose={() => setIsAddTemplateModalOpen(false)}
          onTemplateAdded={handleAddTemplate}
        />
      )}
    </Layout>
  );
}

export default Templates;