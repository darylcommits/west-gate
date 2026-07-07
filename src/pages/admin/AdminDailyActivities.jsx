import { useState, useRef } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiUpload, FiCalendar, FiTag, FiX } from 'react-icons/fi';
import { useDailyActivities, useUpsertDailyActivity, useDeleteDailyActivity } from '../../hooks/useHeroAndActivities';
import { dailyActivitiesService } from '../../services/heroAndActivitiesService';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input, Textarea } from '../../components/ui/Input';
import { Spinner } from '../../components/ui/Spinner';
import toast from 'react-hot-toast';

const EMPTY_FORM = {
  title: '',
  description: '',
  activity_date: new Date().toISOString().split('T')[0],
  media_url: '',
  media_type: 'image',
  tags: [],
  is_published: true,
};

const AdminDailyActivities = () => {
  const { data: activities = [], isLoading } = useDailyActivities(true);
  const upsert = useUpsertDailyActivity();
  const remove = useDeleteDailyActivity();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const fileRef = useRef(null);

  const openModal = (activity = null) => {
    if (activity) {
      setEditingId(activity.id);
      setFormData({
        title: activity.title || '',
        description: activity.description || '',
        activity_date: activity.activity_date || new Date().toISOString().split('T')[0],
        media_url: activity.media_url || '',
        media_type: activity.media_type || 'image',
        tags: activity.tags || [],
        is_published: activity.is_published,
      });
      setPreview(activity.media_url || null);
    } else {
      setEditingId(null);
      setFormData(EMPTY_FORM);
      setPreview(null);
    }
    setTagInput('');
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
      else setPreview(null);
      const { url } = await dailyActivitiesService.uploadMedia(file);
      setFormData(f => ({ ...f, media_url: url, media_type: isVideo ? 'video' : 'image' }));
      toast.success('Media uploaded!');
    } catch {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !formData.tags.includes(t)) {
      setFormData(f => ({ ...f, tags: [...f.tags, t] }));
    }
    setTagInput('');
  };

  const removeTag = (tag) => setFormData(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));

  const handleSave = async () => {
    if (!formData.title) { toast.error('Title is required'); return; }
    try {
      await upsert.mutateAsync({ ...(editingId ? { id: editingId } : {}), ...formData });
      setIsModalOpen(false);
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this activity?')) return;
    await remove.mutateAsync(id);
  };

  const togglePublish = (activity) => upsert.mutateAsync({ id: activity.id, is_published: !activity.is_published });

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' }) : '';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">Daily Activities</h1>
          <p className="text-gray-500">Share behind-the-scenes moments with your clients.</p>
        </div>
        <Button onClick={() => openModal()} leftIcon={<FiPlus />}>Add Activity</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : activities.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <FiCalendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No activities yet. Share your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div key={activity.id} className={`bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col ${activity.is_published ? 'border-gray-100' : 'border-dashed border-gray-300 opacity-70'}`}>
              <div className="relative h-44 bg-gray-100 overflow-hidden">
                {activity.media_url ? (
                  activity.media_type === 'video' ? (
                    <video src={activity.media_url} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={activity.media_url} alt={activity.title} className="w-full h-full object-cover" />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl bg-cream-50">📋</div>
                )}
                <div className="absolute top-2 left-2 bg-white/90 rounded-lg px-2 py-1 text-xs font-medium text-navy-700 flex items-center gap-1">
                  <FiCalendar className="w-3 h-3" /> {formatDate(activity.activity_date)}
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${activity.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {activity.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-bold text-navy-900 line-clamp-1 mb-1">{activity.title}</h4>
                {activity.description && <p className="text-gray-500 text-sm line-clamp-2 flex-1">{activity.description}</p>}
                {activity.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {activity.tags.map((tag, i) => <span key={i} className="text-xs bg-cream-100 text-navy-700 px-2 py-0.5 rounded-full">{tag}</span>)}
                  </div>
                )}
              </div>
              <div className="px-4 pb-4 flex gap-2 justify-end border-t border-gray-50 pt-3">
                <button onClick={() => togglePublish(activity)} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-navy-700 transition-colors text-xs">
                  {activity.is_published ? 'Hide' : 'Publish'}
                </button>
                <button onClick={() => openModal(activity)} className="p-1.5 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"><FiEdit2 size={14} /></button>
                <button onClick={() => handleDelete(activity.id)} className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"><FiTrash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Activity' : 'Add Daily Activity'}>
        <div className="space-y-4">
          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photo or Video</label>
            <div className="relative h-44 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden cursor-pointer hover:border-crimson-400 transition-colors" onClick={() => fileRef.current?.click()}>
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : formData.media_url && formData.media_type === 'video' ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-green-600">
                  <span className="text-3xl">🎥</span>
                  <span className="text-sm font-medium">Video uploaded</span>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
                  <FiUpload className="w-8 h-8" />
                  <span className="text-sm">Click to upload photo or video</span>
                  <span className="text-xs">JPG, PNG, MP4, WebM — max 100MB</span>
                </div>
              )}
              {isUploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><Spinner size="lg" /></div>}
            </div>
            <input type="file" ref={fileRef} onChange={handleUpload} accept="image/*,video/*" className="hidden" />
          </div>

          <Input label="Title *" value={formData.title} onChange={e => setFormData(f => ({ ...f, title: e.target.value }))} placeholder="Property site visit in Laoag City" />
          <Input label="Date" type="date" value={formData.activity_date} onChange={e => setFormData(f => ({ ...f, activity_date: e.target.value }))} />
          <Textarea label="Description" value={formData.description} onChange={e => setFormData(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="What happened during this activity?" />

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (Optional)</label>
            <div className="flex gap-2 mb-2">
              <input className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-crimson-500 focus:border-transparent" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="e.g. Laoag, Inspection" />
              <Button variant="outline" size="sm" onClick={addTag}>Add</Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1.5 bg-cream-100 text-navy-700 text-sm px-3 py-1 rounded-full">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="text-gray-400 hover:text-red-500 transition-colors"><FiX className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-crimson-500" value={formData.is_published ? 'true' : 'false'} onChange={e => setFormData(f => ({ ...f, is_published: e.target.value === 'true' }))}>
              <option value="true">Published (Visible on site)</option>
              <option value="false">Draft (Hidden)</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={isUploading}>Cancel</Button>
            <Button variant="primary" onClick={handleSave} isLoading={upsert.isPending} disabled={isUploading}>Save Activity</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDailyActivities;
