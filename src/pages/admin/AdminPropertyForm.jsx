import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiUploadCloud, FiX } from 'react-icons/fi';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { useProperty, useCreateProperty, useUpdateProperty } from '../../hooks/useProperties';
import { storageService } from '../../services/storageService';
import { PROPERTY_TYPES, PROPERTY_STATUSES, PROVINCES, CITIES_BY_PROVINCE, generatePropertyCode } from '../../lib/constants';
import toast from 'react-hot-toast';

const AdminPropertyForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const { data: property, isLoading: isPropertyLoading } = useProperty(id);
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [features, setFeatures] = useState('');
  const [amenities, setAmenities] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [existingVideoId, setExistingVideoId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      property_code: generatePropertyCode(),
      status: 'available',
      province: 'Ilocos Sur',
    }
  });

  const selectedProvince = watch('province');

  useEffect(() => {
    if (isEditing && property) {
      reset({
        property_code: property.property_code,
        name: property.name,
        description: property.description,
        price: property.price,
        price_label: property.price_label || '',
        property_type: property.property_type,
        status: property.status,
        lot_area: property.lot_area || '',
        floor_area: property.floor_area || '',
        bedrooms: property.bedrooms || '',
        bathrooms: property.bathrooms || '',
        garage: property.garage || '',
        location: property.location,
        barangay: property.barangay || '',
        province: property.province,
        city: property.city,
        google_map_embed: property.google_map_embed || '',
      });
      setFeatures(property.features?.join(', ') || '');
      setAmenities(property.amenities?.join(', ') || '');
      setExistingImages(property.property_images || []);
      if (property.property_videos?.length > 0) {
        setVideoUrl(property.property_videos[0].video_type === 'upload' ? '' : property.property_videos[0].url);
        setExistingVideoId(property.property_videos[0].id);
      } else {
        setVideoUrl('');
        setExistingVideoId(null);
      }
    }
  }, [isEditing, property, reset]);

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) {
        toast.error('Video size must be less than 500MB');
        return;
      }
      setVideoFile(file);
      setVideoUrl('');
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length !== files.length) {
      toast.error('Only image files are allowed');
    }

    setImages(prev => [...prev, ...validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isPrimary: prev.length === 0 && existingImages.length === 0
    }))]);
  };

  const removeNewImage = (index) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      // If we removed the primary, make the first one primary if it exists
      if (prev[index].isPrimary && newImages.length > 0) {
        newImages[0].isPrimary = true;
      }
      return newImages;
    });
  };

  const setPrimaryNewImage = (index) => {
    setImages(prev => prev.map((img, i) => ({ ...img, isPrimary: i === index })));
    // Also unset any existing primary images
    setExistingImages(prev => prev.map(img => ({ ...img, is_primary: false })));
  };

  const setPrimaryExistingImage = (id) => {
    setExistingImages(prev => prev.map(img => ({ ...img, is_primary: img.id === id })));
    // Unset new primary images
    setImages(prev => prev.map(img => ({ ...img, isPrimary: false })));
  };

  const removeExistingImage = async (id, path) => {
    if (window.confirm('Delete this image permanently?')) {
      try {
        await storageService.deleteFile('property-images', path);
        // We should ideally delete the row from DB here too, but for simplicity we'll just remove from UI
        // and let the user handle it via a separate image manager if needed, or we just rely on cascade delete
        setExistingImages(prev => prev.filter(img => img.id !== id));
      } catch (error) {
        toast.error('Failed to delete image');
      }
    }
  };

  const onSubmit = async (data) => {
    setIsUploading(true);
    try {
      // 1. Process features and amenities
      const featuresArray = features.split(',').map(s => s.trim()).filter(Boolean);
      const amenitiesArray = amenities.split(',').map(s => s.trim()).filter(Boolean);

      // 2. Prepare base property data
      const propertyData = {
        ...data,
        price: data.price ? parseFloat(data.price) : 0,
        lot_area: data.lot_area ? parseFloat(data.lot_area) : null,
        floor_area: data.floor_area ? parseFloat(data.floor_area) : null,
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
        bathrooms: data.bathrooms ? parseInt(data.bathrooms) : null,
        garage: data.garage ? parseInt(data.garage) : 0,
        features: featuresArray,
        amenities: amenitiesArray,
      };

      let propertyId = id;

      // 3. Save Property
      if (isEditing) {
        await updateProperty.mutateAsync({ id, data: propertyData });
      } else {
        const newProp = await createProperty.mutateAsync(propertyData);
        propertyId = newProp.id;
      }

      // 4. Upload new images
      if (images.length > 0) {
        const uploadPromises = images.map(async (img, idx) => {
          const fileExt = img.file.name.split('.').pop();
          const fileName = `${propertyId}/${Date.now()}-${idx}.${fileExt}`;
          const { publicUrl, path } = await storageService.uploadFile('property-images', fileName, img.file);
          
          return {
            property_id: propertyId,
            url: publicUrl,
            storage_path: path,
            is_primary: img.isPrimary,
            sort_order: idx
          };
        });

        const newImageData = await Promise.all(uploadPromises);
        
        // Insert image records to DB (would need a service function for this, doing it directly for now)
        const { supabase } = await import('../../lib/supabase');
        await supabase.from('property_images').insert(newImageData);
      }

      // 5. Update existing primary status if changed
      const { supabase } = await import('../../lib/supabase');
      if (isEditing) {
        const primaryExisting = existingImages.find(img => img.is_primary);
        if (primaryExisting) {
           await supabase.from('property_images').update({ is_primary: false }).eq('property_id', propertyId);
           await supabase.from('property_images').update({ is_primary: true }).eq('id', primaryExisting.id);
        }
      }

      // 6. Save Video URL or Upload File
      if (videoFile || videoUrl) {
        let finalVideoUrl = videoUrl;
        let videoType = 'upload';

        if (videoFile) {
           const fileExt = videoFile.name.split('.').pop();
           const fileName = `${propertyId}/video-${Date.now()}.${fileExt}`;
           const { publicUrl, path } = await storageService.uploadFile('property-videos', fileName, videoFile);
           finalVideoUrl = publicUrl;
        } else if (videoUrl) {
           if (videoUrl.includes('youtu')) videoType = 'youtube';
           else if (videoUrl.includes('vimeo')) videoType = 'vimeo';
        }

        if (existingVideoId) {
          await supabase.from('property_videos').update({ url: finalVideoUrl, video_type: videoType }).eq('id', existingVideoId);
        } else {
          await supabase.from('property_videos').insert([{ property_id: propertyId, url: finalVideoUrl, video_type: videoType }]);
        }
      } else if (existingVideoId && !videoUrl && !videoFile) {
        await supabase.from('property_videos').delete().eq('id', existingVideoId);
      }

      toast.success(`Property ${isEditing ? 'updated' : 'created'} successfully`);
      navigate('/admin/properties');
    } catch (error) {
      toast.error(error.message || 'An error occurred while saving');
    } finally {
      setIsUploading(false);
    }
  };

  if (isEditing && isPropertyLoading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <FiArrowLeft className="w-5 h-5 text-navy-900" />
        </button>
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">
            {isEditing ? 'Edit Property' : 'Add New Property'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Basic Information */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-navy-900 mb-6 border-b border-gray-100 pb-4">Basic Information</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Property Name"
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
              className="sm:col-span-2"
            />
            
            <Input
              label="Property Code"
              {...register('property_code', { required: 'Code is required' })}
              error={errors.property_code?.message}
            />

            <Select
              label="Property Type"
              options={PROPERTY_TYPES}
              {...register('property_type', { required: 'Type is required' })}
              error={errors.property_type?.message}
            />

            <Input
              label="Price (₱) - Optional"
              type="number"
              step="0.01"
              {...register('price', { min: 0 })}
              error={errors.price?.message}
            />

            <Input
              label="Price Label (Optional, e.g. '₱2.5M')"
              {...register('price_label')}
            />

            <Select
              label="Status"
              options={PROPERTY_STATUSES}
              {...register('status')}
            />
          </div>

          <div className="mt-6">
            <Textarea
              label="Description"
              rows={6}
              {...register('description')}
            />
          </div>
        </div>

        {/* Location Details */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-navy-900 mb-6 border-b border-gray-100 pb-4">Location Details</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Select
              label="Province"
              options={PROVINCES}
              {...register('province', { required: 'Province is required' })}
              error={errors.province?.message}
            />

            <Select
              label="City/Municipality"
              options={CITIES_BY_PROVINCE[selectedProvince] || []}
              {...register('city', { required: 'City is required' })}
              error={errors.city?.message}
              disabled={!selectedProvince}
            />

            <Input
              label="Specific Location / Subdivision"
              {...register('location', { required: 'Location is required' })}
              error={errors.location?.message}
              className="sm:col-span-2"
            />

            <Input
              label="Barangay"
              {...register('barangay')}
              className="sm:col-span-2"
            />
            
            <Textarea
              label="Google Maps Embed HTML (Optional)"
              rows={3}
              {...register('google_map_embed')}
              className="sm:col-span-2 font-mono text-sm"
              placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'
            />
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-navy-900 mb-6 border-b border-gray-100 pb-4">Specifications</h2>
          <div className="grid sm:grid-cols-4 gap-6">
            <Input
              label="Lot Area (sqm)"
              type="number"
              step="0.01"
              {...register('lot_area')}
            />
            <Input
              label="Floor Area (sqm)"
              type="number"
              step="0.01"
              {...register('floor_area')}
            />
            <Input
              label="Bedrooms"
              type="number"
              {...register('bedrooms')}
            />
            <Input
              label="Bathrooms"
              type="number"
              {...register('bathrooms')}
            />
            <Input
              label="Garage/Carport"
              type="number"
              {...register('garage')}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <Textarea
              label="Features (Comma separated)"
              placeholder="e.g. 24/7 Security, Balcony, Built-in Cabinets"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              rows={3}
            />
            <Textarea
              label="Amenities (Comma separated)"
              placeholder="e.g. Swimming Pool, Clubhouse, Playground"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        {/* Media (Images & Videos) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-navy-900 mb-6 border-b border-gray-100 pb-4">Media</h2>
          
          <div className="mb-8 pb-8 border-b border-gray-100">
            <h3 className="font-semibold text-navy-900 mb-4">Property Video</h3>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <label className="block text-sm font-medium text-navy-800 mb-1.5">Upload Video File (MP4/WebM)</label>
                <div className="border border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors">
                  <input type="file" accept="video/mp4,video/webm" className="text-sm w-full" onChange={handleVideoSelect} />
                </div>
                {videoFile && <p className="text-xs text-green-600 mt-2 font-medium">Selected: {videoFile.name}</p>}
                {existingVideoId && !videoFile && !videoUrl && <p className="text-xs text-green-600 mt-2 font-medium">Existing video is saved.</p>}
              </div>
              <div className="text-center font-medium text-gray-400">
                — OR —
              </div>
              <div className="md:col-span-2 -mt-2">
                <Input
                  label="YouTube or Vimeo URL"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => { setVideoUrl(e.target.value); setVideoFile(null); }}
                  disabled={!!videoFile}
                />
                <p className="text-xs text-gray-500 mt-2">Provide a YouTube/Vimeo link, or upload an MP4 file directly. Maximum 500MB.</p>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-navy-900 mb-4">Property Images</h3>
          
          <div className="mb-6 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
            <FiUploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-navy-900 font-medium mb-1">Upload New Images</p>
            <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 5MB each</p>
            <label className="btn-outline cursor-pointer inline-flex">
              Select Files
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageSelect} />
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Existing Images */}
            {existingImages.map((img) => (
              <div key={img.id} className="relative group rounded-lg overflow-hidden aspect-square border border-gray-200">
                <img src={img.url} alt="Property" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex justify-between">
                    <button 
                      type="button"
                      onClick={() => setPrimaryExistingImage(img.id)}
                      className={`text-xs px-2 py-1 rounded bg-white font-medium ${img.is_primary ? 'text-crimson-600' : 'text-gray-600 hover:text-navy-900'}`}
                    >
                      {img.is_primary ? 'Primary' : 'Make Primary'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => removeExistingImage(img.id, img.storage_path)}
                      className="p-1 bg-white text-red-600 rounded hover:bg-red-50"
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
                {img.is_primary && (
                  <div className="absolute top-2 left-2 text-xs px-2 py-1 bg-crimson-500 text-white rounded font-medium shadow-sm">
                    Primary
                  </div>
                )}
              </div>
            ))}

            {/* New Images */}
            {images.map((img, index) => (
              <div key={index} className="relative group rounded-lg overflow-hidden aspect-square border-2 border-green-200">
                <img src={img.preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex justify-between">
                    <button 
                      type="button"
                      onClick={() => setPrimaryNewImage(index)}
                      className={`text-xs px-2 py-1 rounded bg-white font-medium ${img.isPrimary ? 'text-crimson-600' : 'text-gray-600 hover:text-navy-900'}`}
                    >
                      {img.isPrimary ? 'Primary' : 'Make Primary'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="p-1 bg-white text-red-600 rounded hover:bg-red-50"
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">New</span>
                </div>
                {img.isPrimary && (
                  <div className="absolute top-2 left-2 text-xs px-2 py-1 bg-crimson-500 text-white rounded font-medium shadow-sm">
                    Primary
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4 sticky bottom-6 z-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100">
          <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="lg" isLoading={isUploading || createProperty.isPending || updateProperty.isPending}>
            {isEditing ? 'Save Changes' : 'Create Property'}
          </Button>
        </div>

      </form>
    </div>
  );
};

export default AdminPropertyForm;
