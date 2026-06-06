import { useState } from 'react';
import { useInquiries, useUpdateInquiry } from '../../hooks/useInquiries';
import { FiMail, FiPhone, FiFilter, FiMessageSquare } from 'react-icons/fi';
import { Spinner } from '../../components/ui/Spinner';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Textarea, Select } from '../../components/ui/Input';
import { formatDate } from '../../lib/utils';
import { INQUIRY_STATUSES } from '../../lib/constants';
import { formatDistanceToNow } from 'date-fns';

const AdminInquiries = () => {
  const [filter, setFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [statusVal, setStatusVal] = useState('');

  const { data: inquiries, isLoading, error } = useInquiries({ status: filter });
  const updateInquiry = useUpdateInquiry();

  const handleOpenModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setStatusVal(inquiry.status);
    setReplyText(inquiry.admin_reply || '');
    
    // Automatically mark as read if it was new
    if (inquiry.status === 'new') {
      updateInquiry.mutate({ id: inquiry.id, status: 'read' });
      setStatusVal('read');
    }
  };

  const handleSave = async () => {
    try {
      await updateInquiry.mutateAsync({
        id: selectedInquiry.id,
        status: statusVal,
        reply: replyText
      });
      setSelectedInquiry(null);
    } catch (error) {
      // Handled by hook
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">Inquiries</h1>
          <p className="text-gray-600">Manage messages from clients and visitors.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
        <div className="relative w-full sm:w-64">
          <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            className="input-field pl-10 py-2 text-sm appearance-none bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Inquiries</option>
            {INQUIRY_STATUSES.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-bold bg-red-50">
            Error: {error.message}
          </div>
        ) : inquiries && inquiries.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {inquiries.map((inquiry) => (
              <div 
                key={inquiry.id} 
                className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${inquiry.status === 'new' ? 'bg-blue-50/30' : ''}`}
                onClick={() => handleOpenModal(inquiry)}
              >
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${inquiry.status === 'new' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                      <FiMessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`text-base ${inquiry.status === 'new' ? 'font-bold text-navy-900' : 'font-semibold text-navy-800'}`}>
                          {inquiry.name}
                        </h3>
                        <Badge status={inquiry.status} />
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1"><FiMail /> {inquiry.email}</span>
                        {inquiry.phone && <span className="flex items-center gap-1"><FiPhone /> {inquiry.phone}</span>}
                      </div>
                      <p className={`text-sm line-clamp-2 ${inquiry.status === 'new' ? 'font-medium text-navy-800' : 'text-gray-600'}`}>
                        {inquiry.message}
                      </p>
                      {inquiry.properties && (
                        <div className="mt-3 inline-block bg-gray-100 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 border border-gray-200">
                          Regarding: {inquiry.properties.name} ({inquiry.properties.property_code})
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                    {formatDistanceToNow(new Date(inquiry.created_at), { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No inquiries found matching the current filter.
          </div>
        )}
      </div>

      {/* Detail/Reply Modal */}
      <Modal
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        title="Inquiry Details"
        maxWidth="max-w-2xl"
      >
        {selectedInquiry && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 block mb-1">Sender</span>
                  <p className="font-semibold text-navy-900">{selectedInquiry.name}</p>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Date</span>
                  <p className="font-medium text-navy-900">{formatDate(selectedInquiry.created_at)}</p>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Email</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="font-medium text-crimson-600 hover:underline">{selectedInquiry.email}</a>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Phone</span>
                  <p className="font-medium text-navy-900">{selectedInquiry.phone || 'N/A'}</p>
                </div>
              </div>

              {selectedInquiry.properties && (
                <div className="pt-4 border-t border-gray-200">
                  <span className="text-gray-500 block mb-1">Property Reference</span>
                  <p className="font-medium text-navy-900">{selectedInquiry.properties.name} ({selectedInquiry.properties.property_code})</p>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-navy-900 mb-2">Message:</h4>
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-gray-700 whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h4 className="font-semibold text-navy-900 mb-4">Update & Reply</h4>
              <div className="space-y-4">
                <Select
                  label="Status"
                  options={INQUIRY_STATUSES}
                  value={statusVal}
                  onChange={(e) => setStatusVal(e.target.value)}
                />
                <Textarea
                  label="Internal Notes / Reply Record"
                  placeholder="Record your reply or notes here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                />
                <div className="flex gap-3 justify-end pt-4">
                  <Button variant="outline" onClick={() => setSelectedInquiry(null)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleSave} isLoading={updateInquiry.isPending}>
                    Save Updates
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminInquiries;
