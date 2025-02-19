export const MetricsCard = ({ title, value }) => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
        <p className="text-2xl font-bold text-white">{value || '--'}</p>
      </div>
    );
  };