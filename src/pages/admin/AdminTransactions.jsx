import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiUpload, FiX, FiCalendar, FiTag, FiImage, FiVideo
} from 'react-icons/fi';
import { useAllTransactions, useCreateTransaction, useUpdateTransaction, useDeleteTransaction } from '../../hooks/useTransactions';
import { transactionService } from '../../services/transactionService';
import { Spinner } from '../../components/ui/Spinner';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const SERVICE_TYPES = [
  'Real Estate Brokerage & Marketing',
  'Property Selling and Buying',
  'Land Acquisition',
  'Property Documentation',
  'Title Transfer Processing',
  'DAR & DENR Assistance',
  'Due Diligence & Verification',
  'Land Reclassification',
  'Survey & Subdivision',
  'Building Permit Processing',
  'Construction & Pabakod',
  'Access Road Assistance',
  'Property Valuation',
  'Legal & Publication Processing',
  'Real Estate Consultation',
  'Government Clearances',
  'Other',
];

const EMPTY_FORM = {
  title: '',
  service_type: '',
  transaction_date: '',
  description: '',
  media_url: '',
  media_type: 'image',
  thumbnail_url: '',
  is_published: true,
};

const AdminTransactions = () => {
  const { data: transactions, isLoading } = useAllTransactions();
  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();
  const deleteTransaction = useDeleteTransaction();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setPreview(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title || '',
      service_type: item.service_type || '',
      transaction_date: item.transaction_date || '',
      description: item.description || '',
      media_url: item.media_url || '',
      media_type: item.media_type || 'image',
      thumbnail_url: item.thumbnail_url || '',
      is_published: item.is_published !== false,
    });
    setPreview(item.media_url || null);
    setModalOpen(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isVideo = file.type.startsWith('video/');
    setUploading(true);
    try {
      const { url } = await transactionService.uploadMedia(file);
      setForm(f => ({ ...f, media_url: url, media_type: isVideo ? 'video' : 'image' }));
      setPreview(url);
      toast.success('Media uploaded!');
    } catch (err) {
      toast.error('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.title) return toast.error('Title is required');
    if (!form.service_type) return toast.error('Service type is required');
    if (!form.transaction_date) return toast.error('Date is required');
    try {
      if (editing) {
        await updateTransaction.mutateAsync({ id: editing.id, data: form });
      } else {
        await createTransaction.mutateAsync(form);
      }
      setModalOpen(false);
    } catch {}
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    await deleteTransaction.mutateAsync(item.id);
  };

  const togglePublish = async (item) => {
    await updateTransaction.mutateAsync({ id: item.id, data: { is_published: !item.is_published } });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">Proof of Transactions</h1>
          <p className="text-gray-600">Manage transaction records shown on the homepage.</p>
        </div>
        <Button variant="primary" onClick={openNew}>
          <FiPlus className="mr-2" /> Add Transaction
        </Button>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : transactions && transactions.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {transactions.map((item) => (
              <div key={item.id} className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-gray-50 transition-colors">
                {/* Thumbnail */}
                <div className="w-20 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  {item.media_url ? (
                    <img src={item.thumbnail_url || item.media_url} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      {item.media_type === 'video' ? <FiVideo /> : <FiImage />}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-navy-900 truncate">{item.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {item.is_published ? 'Published' : 'Hidden'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1"><FiTag className="w-3.5 h-3.5" />{item.service_type}</span>
                    {item.transaction_date && (
                      <span className="flex items-center gap-1"><FiCalendar className="w-3.5 h-3.5" />{format(new Date(item.transaction_date), 'MMM d, yyyy')}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => togglePublish(item)}
                    title={item.is_published ? 'Hide' : 'Publish'}
                    className="p-2 text-gray-400 hover:text-navy-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {item.is_published ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => openEdit(item)}
                    className="p-2 text-gray-400 hover:text-navy-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="p-2 text-gray-400 hover:text-crimson-600 hover:bg-crimson-50 rounded-lg transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No transactions yet. Click "Add Transaction" to get started.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Transaction' : 'Add Proof of Transaction'} maxWidth="max-w-xl">
        <div className="space-y-5">
          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-2">Photo / Video</label>
            {preview ? (
              <div className="relative rounded-xl overflow-hidden h-48 bg-gray-100">
                {form.media_type === 'video' ? (
                  <video src={preview} className="w-full h-full object-cover" />
                ) : (
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                )}
                <button
                  onClick={() => { setPreview(null); setForm(f => ({ ...f, media_url: '' })); }}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="w-full h-36 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-navy-400 hover:text-navy-900 transition-colors"
              >
                {uploading ? <Spinner size="sm" /> : <FiUpload className="w-6 h-6" />}
                <span className="text-sm">{uploading ? 'Uploading...' : 'Click to upload photo or video'}</span>
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <Input
            label="Title *"
            placeholder="e.g. Title Transfer Completed"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          />

          <Select
            label="Service Type *"
            defaultValue=""
            value={form.service_type}
            onChange={e => setForm(f => ({ ...f, service_type: e.target.value }))}
            options={SERVICE_TYPES}
          />

          <Input
            label="Date *"
            type="date"
            value={form.transaction_date}
            onChange={e => setForm(f => ({ ...f, transaction_date: e.target.value }))}
          />

          <Textarea
            label="Description"
            placeholder="Briefly describe the transaction..."
            rows={3}
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={e => setForm(f => ({ ...f, is_published: e.target.checked }))}
              className="w-4 h-4 accent-navy-900"
            />
            <span className="text-sm font-medium text-navy-800">Publish on homepage</span>
          </label>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleSave}
              isLoading={createTransaction.isPending || updateTransaction.isPending}
            >
              {editing ? 'Save Changes' : 'Add Transaction'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminTransactions;
