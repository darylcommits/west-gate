import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiSearch, FiX } from 'react-icons/fi';
import { PropertyCard } from '../../components/ui/PropertyCard';
import { Spinner } from '../../components/ui/Spinner';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useProperties } from '../../hooks/useProperties';
import { usePropertyStore } from '../../store/propertyStore';
import { PROPERTY_TYPES, PROVINCES, CITIES_BY_PROVINCE, PRICE_RANGES } from '../../lib/constants';

const PropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, setFilter, setFilters, resetFilters, pagination, setPagination } = usePropertyStore();

  // Initialize filters from URL on mount
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setFilter('search', search);
    }
  }, [searchParams, setFilter]);

  const { data, isLoading, isError } = useProperties(filters, pagination);
  const properties = data?.data || [];
  const totalProperties = data?.count || 0;
  const totalPages = Math.ceil(totalProperties / pagination.pageSize);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(name, value);
    setPagination({ page: 1 }); // Reset to page 1 on filter change
    
    // Reset city if province changes
    if (name === 'province') {
      setFilter('city', '');
    }
  };

  const handlePriceRangeChange = (e) => {
    const range = PRICE_RANGES[e.target.value];
    setFilters({
      min_price: range.min,
      max_price: range.max
    });
    setPagination({ page: 1 });
  };

  const clearFilters = () => {
    resetFilters();
    setSearchParams({});
    setPagination({ page: 1 });
  };

  return (
    <div className="bg-cream-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mb-2">Properties for Sale</h1>
          <p className="text-gray-600">Find your perfect home, lot, or commercial space in Ilocos.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-lg text-navy-900 flex items-center gap-2">
                  <FiFilter /> Filters
                </h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-crimson-600 hover:text-crimson-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-5">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Search</label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                      placeholder="Keywords, location..."
                      className="input-field pl-10"
                    />
                    {filters.search && (
                      <button 
                        onClick={() => setFilter('search', '')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <FiX />
                      </button>
                    )}
                  </div>
                </div>

                {/* Property Type */}
                <Select
                  label="Property Type"
                  name="property_type"
                  value={filters.property_type.length > 0 ? filters.property_type[0] : ''}
                  onChange={(e) => setFilter('property_type', e.target.value ? [e.target.value] : [])}
                  options={[
                    { value: '', label: 'All Types' },
                    ...PROPERTY_TYPES
                  ]}
                />

                {/* Price Range */}
                <Select
                  label="Price Range"
                  name="price_range"
                  onChange={handlePriceRangeChange}
                  options={PRICE_RANGES.map((r, i) => ({ value: i, label: r.label }))}
                  defaultValue="0"
                />

                {/* Location */}
                <Select
                  label="Province"
                  name="province"
                  value={filters.province}
                  onChange={handleFilterChange}
                  options={[
                    { value: '', label: 'Any Province' },
                    ...PROVINCES.map(p => ({ value: p, label: p }))
                  ]}
                />

                {filters.province && (
                  <Select
                    label="City/Municipality"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    options={[
                      { value: '', label: 'Any City' },
                      ...(CITIES_BY_PROVINCE[filters.province] || []).map(c => ({ value: c, label: c }))
                    ]}
                  />
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            {/* Active Filters & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600 font-medium">
                {isLoading ? 'Searching...' : `Showing ${properties.length} of ${totalProperties} properties`}
              </p>
              
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</label>
                <select 
                  className="input-field py-2 pr-8"
                  value={filters.sort}
                  onChange={(e) => {
                    setFilter('sort', e.target.value);
                    setPagination({ page: 1 });
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest_price">Highest Price</option>
                  <option value="lowest_price">Lowest Price</option>
                </select>
              </div>
            </div>

            {/* Property Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center py-32">
                <Spinner size="lg" />
              </div>
            ) : isError ? (
              <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100">
                <p>There was an error loading the properties. Please try again later.</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl text-center shadow-sm border border-gray-100">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-display font-bold text-navy-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any properties matching your current filters. Try adjusting your search criteria.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12 gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setPagination({ page: Math.max(1, pagination.page - 1) })}
                      disabled={pagination.page === 1}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPagination({ page: i + 1 })}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            pagination.page === i + 1 
                              ? 'bg-navy-900 text-white' 
                              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setPagination({ page: Math.min(totalPages, pagination.page + 1) })}
                      disabled={pagination.page === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
