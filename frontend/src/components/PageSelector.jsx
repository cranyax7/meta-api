// frontend/src/components/PageSelector.jsx
import { useState } from 'react';

const PageSelector = ({ pages, onPageSelect, selectedPageId }) => {
  const [selectedPage, setSelectedPage] = useState(selectedPageId || '');

  const handleFetchInsights = () => {
    if (selectedPage) {
      onPageSelect(selectedPage);
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-lg font-semibold mb-2">Select a Page:</label>
      <select
        value={selectedPage}
        onChange={(e) => setSelectedPage(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">Select a page</option>
        {pages.map((page) => (
          <option key={page.id} value={page.id}>
            {page.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleFetchInsights}
        className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Fetch Insights
      </button>
    </div>
  );
};

export default PageSelector;