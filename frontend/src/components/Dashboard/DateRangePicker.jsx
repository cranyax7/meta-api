export const DateRangePicker = ({ since, until, onChange, onFetch }) => {
    const handleSinceChange = (e) => {
      onChange({ since: e.target.value, until });
    };
  
    const handleUntilChange = (e) => {
      onChange({ since, until: e.target.value });
    };
  
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Select Date Range</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Since</label>
            <input
              type="date"
              value={since}
              onChange={handleSinceChange}
              className="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Until</label>
            <input
              type="date"
              value={until}
              onChange={handleUntilChange}
              className="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={onFetch}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Fetch Insights
        </button>
      </div>
    );
  };