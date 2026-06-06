import { useAuth } from '../../hooks/useAuth';
import { useFavorites } from '../../hooks/useFavorites';
import { PropertyCard } from '../../components/ui/PropertyCard';
import { Spinner } from '../../components/ui/Spinner';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

const ClientFavorites = () => {
  const { user } = useAuth();
  const { data: favorites, isLoading } = useFavorites(user?.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy-900">Saved Properties</h1>
        <p className="text-gray-600">Properties you have favorited for later viewing.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : favorites && favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-20 px-4">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiHeart className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-display font-bold text-navy-900 mb-2">No Saved Properties</h3>
          <p className="text-gray-500 mb-6">You haven't added any properties to your favorites yet.</p>
          <Link to="/properties">
            <Button>Explore Properties</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ClientFavorites;
