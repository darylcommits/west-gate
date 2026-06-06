import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperties, useDeleteProperty, useToggleFeatured } from '../../hooks/useProperties';
import { FiEdit2, FiTrash2, FiStar, FiSearch, FiFilter, FiPlus, FiMoreVertical, FiEye } from 'react-icons/fi';
import { Spinner } from '../../components/ui/Spinner';
import { Badge } from '../../components/ui/Badge';
import { formatPrice, getPropertyTypeLabel } from '../../lib/utils';
import toast from 'react-hot-toast';

const AdminProperties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Use a large page size for admin list, or implement proper pagination
  const { data, isLoading } = useProperties(
    { search: searchTerm, status: statusFilter }, 
    { page: 1, pageSize: 50 }
  );
  
  const properties = data?.data || [];
  
  const deleteProperty = useDeleteProperty();
  const toggleFeatured = useToggleFeatured();

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        await deleteProperty.mutateAsync(id);
      } catch (error) {
        // Handled by hook
      }
    }
  };

  const handleToggleFeatured = async (id, isCurrentlyFeatured) => {
    try {
      await toggleFeatured.mutateAsync({ id, is_featured: !isCurrentlyFeatured });
    } catch (error) {
      // Handled by hook
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">Manage Properties</h1>
          <p className="text-gray-600">View, edit, and manage all property listings.</p>
        </div>
        <Link to="/admin/properties/new" className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
          <FiPlus /> Add New Property
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, code, or location..."
            className="input-field pl-10 py-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full sm:w-48">
          <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            className="input-field pl-10 py-2 text-sm appearance-none bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
            <option value="off_market">Off Market</option>
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Property</th>
                <th className="px-6 py-4 font-semibold">Code</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Featured</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <Spinner size="md" className="mx-auto" />
                  </td>
                </tr>
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No properties found matching your criteria.
                  </td>
                </tr>
              ) : (
                properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                          {property.property_images?.[0]?.url ? (
                            <img src={property.property_images[0].url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-navy-900 max-w-[200px] truncate" title={property.name}>
                            {property.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate max-w-[200px]">{property.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-600">
                      {property.property_code}
                    </td>
                    <td className="px-6 py-4">
                      {getPropertyTypeLabel(property.property_type)}
                    </td>
                    <td className="px-6 py-4 font-medium text-navy-900">
                      {formatPrice(property.price)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={property.status} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleToggleFeatured(property.id, property.is_featured)}
                        disabled={toggleFeatured.isPending && toggleFeatured.variables?.id === property.id}
                        className={`p-2 rounded-full transition-colors ${
                          property.is_featured 
                            ? 'text-crimson-500 hover:bg-cream-100' 
                            : 'text-gray-300 hover:text-crimson-500 hover:bg-gray-100'
                        }`}
                        title={property.is_featured ? "Remove from featured" : "Mark as featured"}
                      >
                        <FiStar className={property.is_featured ? 'fill-current' : ''} size={18} />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          to={`/properties/${property.id}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-navy-600 hover:bg-navy-50 rounded-lg transition-colors"
                          title="View live"
                        >
                          <FiEye size={18} />
                        </Link>
                        <Link 
                          to={`/admin/properties/${property.id}/edit`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(property.id, property.name)}
                          disabled={deleteProperty.isPending && deleteProperty.variables === property.id}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProperties;
