import { useState, useEffect } from "react";
import servicesData from "../data/servicesData";

const Services = ({ searchQuery }) => {
  const [filteredServices, setFilteredServices] = useState(servicesData.services);
  const [serviceQuery, setServiceQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      filterServices(searchQuery);
    } else {
      setFilteredServices(servicesData.services);
    }
  }, [searchQuery]);

  // Function to filter services
  const filterServices = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = servicesData.services.filter(
      (service) =>
        service.service_name.toLowerCase().includes(lowerCaseQuery) ||
        service.description.toLowerCase().includes(lowerCaseQuery) ||
        service.price.includes(query)
    );
    setFilteredServices(filtered);
  };

  // Handle search
  const handleSearch = () => {
    if (serviceQuery.trim() === "") return;
    filterServices(serviceQuery);
    setServiceQuery(""); // Clear input after search
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Our Services</h2>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search services..."
          value={serviceQuery}
          onChange={(e) => setServiceQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="p-2 border rounded-md text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-5 gap-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service.id}
              className="border p-4 rounded-lg shadow-md bg-white w-56 h-72 flex flex-col justify-between"
            >
              <div className="h-32 bg-gray-200 flex items-center justify-center">
                <img
                  src={service.image_path}
                  alt={service.service_name}
                  className="h-24 w-24 object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mt-2">{service.service_name}</h3>
              <p className="text-gray-700 text-sm">{service.description}</p>
              <p className="text-green-600 font-bold">{service.price}</p>
            </div>
          ))
        ) : (
          <p className="text-red-500">No services found.</p>
        )}
      </div>
    </div>
  );
};

export default Services;
