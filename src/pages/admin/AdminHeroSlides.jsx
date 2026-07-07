import { useState, useRef } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiImage, FiUpload, FiEye, FiEyeOff, FiVideo } from 'react-icons/fi';
import { useHeroSlides, useUpsertHeroSlide, useDeleteHeroSlide } from '../../hooks/useHeroAndActivities';
import { heroSlidesService } from '../../services/heroAndActivitiesService';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input, Textarea } from '../../components/ui/Input';
import { Spinner } from '../../components/ui/Spinner';
import toast from 'react-hot-toast';

const EMPTY_FORM = {
  title: '',
  subtitle: '',
  image_url: '',
  image_path: '',
  media_type: 'image',
  button_text: 'View Properties',
  button_link: '/properties',
  secondary_button_text: 'Contact Us',
  secondary_button_link: '/contact',
  is_published: true,
  sort_order: 0,
};

const AdminHeroSlides = () => {
  const { data: slides = [], isLoading } = useHeroSlides(true);
  const upsert = useUpsertHeroSlide();
  const remove = useDeleteHeroSlide();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const openModal = (slide = null) => {
    if (slide) {
      setEditingId(slide.id);
      setFormData({
        title: slide.title || '',
        subtitle: slide.subtitle || '',
        image_url: slide.image_url || '',
        image_path: slide.image_path || '',
        media_type: slide.media_type || 'image',
        button_text: slide.button_text || 'View Properties',
        button_link: slide.button_link || '/properties',
        secondary_button_text: slide.secondary_button_text || 'Contact Us',
        secondary_button_link: slide.secondary_button_link || '/contact',
        is_published: slide.is_published,
        sort_order: slide.sort_order || 0,
      });
      setPreview(slide.image_url || null);
    } else {
      setEditingId(null);
      setFormData({ ...EMPTY_FORM });
      setPreview(null);
    }
    setIsModalOpen(true);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    if (!isVideo && !isImage) { toast.error('Images and videos only'); return; }
    try {
      setIsUploading(true);
      if (isImage) setPreview(URL.createObjectURL(file));
      else setPreview(null); // video preview handled differently
      const { url, path, mediaType } = await heroSlidesService.uploadMedia(file);
      setFormData(f => ({ ...f, image_url: url, image_path: path, media_type: mediaType }));
      toast.success(`${isVideo ? 'Video' : 'Image'} uploaded!`);
    } catch (err) {
      toast.error('Upload failed');
      setPreview(null);
    } finally {
      setIsUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleSave = async () => {
    if (!formData.title) { toast.error('Title is required'); return; }
    if (!formData.image_url) { toast.error('Please upload a background image'); return; }
    try {
      await upsert.mutateAsync({ ...(editingId ? { id: editingId } : {}), ...formData, sort_order: parseInt(formData.sort_order) || 0 });
      setIsModalOpen(false);
    } catch {}
  };

  const handleDelete = async (slide) => {
    if (!window.confirm('Delete this slide?')) return;
    try {
      if (slide.image_path) await heroSlidesService.deleteImage(slide.image_path);
      await remove.mutateAsync(slide.id);
    } catch {}
  };

  const togglePublish = (slide) => upsert.mutateAsync({ id: slide.id, is_published: !slide.is_published });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">Hero Slides</h1>
          <p className="text-gray-500">Manage the homepage hero carousel. Slides display in sort order.</p>
        </div>
        <Button onClick={() => openModal()} leftIcon={<FiPlus />}>Add Slide</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : slides.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <FiImage className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No hero slides yet. Add your first slide!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <div key={slide.id} className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${slide.is_published ? 'border-gray-100' : 'border-dashed border-gray-300 opacity-70'}`}>
              <div className="relative h-40 bg-gray-100 overflow-hidden">
                {slide.image_url ? (
                  <img src={slide.image_url} alt={slide.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><FiImage className="w-10 h-10 text-gray-300" /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-sm line-clamp-1">{slide.title}</p>
                  {slide.subtitle && <p className="text-white/70 text-xs line-clamp-1 mt-0.5">{slide.subtitle}</p>}
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${slide.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {slide.is_published ? 'Live' : 'Draft'}
                  </span>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between gap-2">
                <span className="text-xs text-gray-400">Order: {slide.sort_order}</span>
                <div className="flex gap-1">
                  <button onClick={() => togglePublish(slide)} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-navy-900 transition-colors" title={slide.is_published ? 'Hide' : 'Publish'}>
                    {slide.is_published ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                  <button onClick={() => openModal(slide)} className="p-1.5 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
                    <FiEdit2 size={15} />
                  </button>
                  <button onClick={() => handleDelete(slide)} className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Slide' : 'Add Hero Slide'}>
        <div className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Image *</label>
            <div
              className="relative h-48 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 cursor-pointer hover:border-crimson-400 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              {preview && formData.media_type === 'image' ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : formData.image_url && formData.media_type === 'video' ? (
                <video src={formData.image_url} className="w-full h-full object-cover" muted playsInline />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
                  <FiUpload className="w-8 h-8" />
                  <span className="text-sm">Click to upload background image or video</span>
                  <span className="text-xs">JPG, PNG, WebP, MP4, WebM — max 200MB</span>
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <Spinner size="lg" />
                </div>
              )}
              {(preview || formData.image_url) && !isUploading && (
                <div className="absolute inset-0 bg-navy-900/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium flex items-center gap-2"><FiUpload /> Change Media</span>
                </div>
              )}
            </div>
            <input type="file" ref={fileRef} onChange={handleUpload} accept="image/*,video/mp4,video/webm,video/quicktime" className="hidden" />
          </div>

          <Input label="Headline / Title *" value={formData.title} onChange={e => setFormData(f => ({ ...f, title: e.target.value }))} placeholder="Turning Dreams to Reality" />
          <Input label="Subtitle" value={formData.subtitle} onChange={e => setFormData(f => ({ ...f, subtitle: e.target.value }))} placeholder="Your trusted real estate partner..." />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Primary Button Text" value={formData.button_text} onChange={e => setFormData(f => ({ ...f, button_text: e.target.value }))} />
            <Input label="Primary Button Link" value={formData.button_link} onChange={e => setFormData(f => ({ ...f, button_link: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Secondary Button Text" value={formData.secondary_button_text} onChange={e => setFormData(f => ({ ...f, secondary_button_text: e.target.value }))} />
            <Input label="Secondary Button Link" value={formData.secondary_button_link} onChange={e => setFormData(f => ({ ...f, secondary_button_link: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-crimson-500 focus:border-transparent" value={formData.is_published ? 'true' : 'false'} onChange={e => setFormData(f => ({ ...f, is_published: e.target.value === 'true' }))}>
                <option value="true">Published (Live)</option>
                <option value="false">Draft (Hidden)</option>
              </select>
            </div>
            <Input label="Sort Order" type="number" value={formData.sort_order} onChange={e => setFormData(f => ({ ...f, sort_order: e.target.value }))} />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={isUploading}>Cancel</Button>
            <Button variant="primary" onClick={handleSave} isLoading={upsert.isPending} disabled={isUploading}>Save Slide</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminHeroSlides;
