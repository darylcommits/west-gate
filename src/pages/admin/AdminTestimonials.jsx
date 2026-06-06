import { useState } from 'react';
import { useTestimonials, useUpsertTestimonial, useDeleteTestimonial } from '../../hooks/useCMS';
import { FiPlus, FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
import { Spinner } from '../../components/ui/Spinner';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input, Textarea, Select } from '../../components/ui/Input';
import toast from 'react-hot-toast';

const AdminTestimonials = () => {
  const { data: testimonials, isLoading } = useTestimonials(true); // Include unpublished
  const upsertTestimonial = useUpsertTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    client_name: '',
    client_title: '',
    content: '',
    rating: 5,
    is_published: true,
    sort_order: 0
  });

  const handleOpenModal = (testimonial = null) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      setFormData({
        client_name: testimonial.client_name,
        client_title: testimonial.client_title || '',
        content: testimonial.content,
        rating: testimonial.rating,
        is_published: testimonial.is_published,
        sort_order: testimonial.sort_order || 0
      });
    } else {
      setEditingId(null);
      setFormData({
        client_name: '',
        client_title: '',
        content: '',
        rating: 5,
        is_published: true,
        sort_order: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const data = {
        ...formData,
        rating: parseInt(formData.rating),
        sort_order: parseInt(formData.sort_order)
      };

      if (editingId) {
        await upsertTestimonial.mutateAsync({ id: editingId, ...data });
      } else {
        await upsertTestimonial.mutateAsync(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      // Handled by hook
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this testimonial?')) {
      try {
        await deleteTestimonial.mutateAsync(id);
      } catch (error) {
        // Handled by hook
      }
    }
  };

  const togglePublish = async (testimonial) => {
    try {
      await upsertTestimonial.mutateAsync({ 
        id: testimonial.id, 
        is_published: !testimonial.is_published 
      });
    } catch (error) {
      // Handled by hook
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">Client Testimonials</h1>
          <p className="text-gray-600">Manage client reviews displayed on the public site.</p>
        </div>
        <Button onClick={() => handleOpenModal()} leftIcon={<FiPlus />}>
          Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-20"><Spinner size="lg" /></div>
        ) : testimonials && testimonials.length > 0 ? (
          testimonials.map(testimonial => (
            <div key={testimonial.id} className={`bg-white rounded-2xl shadow-sm border p-6 flex flex-col ${testimonial.is_published ? 'border-gray-100' : 'border-dashed border-gray-300 opacity-70'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex text-crimson-500">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={i < testimonial.rating ? 'fill-current' : 'text-gray-200'} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleOpenModal(testimonial)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(testimonial.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 italic mb-6 flex-1">"{testimonial.content}"</p>
              
              <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-auto">
                <div>
                  <h4 className="font-bold text-navy-900">{testimonial.client_name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.client_title || 'Client'}</p>
                </div>
                <button
                  onClick={() => togglePublish(testimonial)}
                  className={`text-xs px-2 py-1 rounded font-medium ${testimonial.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                >
                  {testimonial.is_published ? 'Published' : 'Draft'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-gray-100">
            <FiStar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No testimonials added yet.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Testimonial' : 'Add Testimonial'}
      >
        <div className="space-y-4">
          <Input
            label="Client Name"
            value={formData.client_name}
            onChange={(e) => setFormData({...formData, client_name: e.target.value})}
          />
          <Input
            label="Client Title/Role (Optional)"
            value={formData.client_title}
            onChange={(e) => setFormData({...formData, client_title: e.target.value})}
            placeholder="e.g. Homebuyer, Investor"
          />
          <Select
            label="Rating (1-5)"
            value={formData.rating}
            onChange={(e) => setFormData({...formData, rating: e.target.value})}
            options={[
              { value: 5, label: '5 Stars - Excellent' },
              { value: 4, label: '4 Stars - Very Good' },
              { value: 3, label: '3 Stars - Average' },
              { value: 2, label: '2 Stars - Poor' },
              { value: 1, label: '1 Star - Terrible' }
            ]}
          />
          <Textarea
            label="Testimonial Content"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            rows={4}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Status"
              value={formData.is_published ? 'true' : 'false'}
              onChange={(e) => setFormData({...formData, is_published: e.target.value === 'true'})}
              options={[
                { value: 'true', label: 'Published (Public)' },
                { value: 'false', label: 'Draft (Hidden)' }
              ]}
            />
            <Input
              label="Sort Order"
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({...formData, sort_order: e.target.value})}
            />
          </div>

          <div className="pt-4 flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave} isLoading={upsertTestimonial.isPending}>
              Save Testimonial
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminTestimonials;
