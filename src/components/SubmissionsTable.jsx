import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Search, RefreshCw, Download, FileSpreadsheet, Calendar, User, ExternalLink, Filter, ChevronRight, X, Sparkles, Database, Layers, CheckCircle2 } from 'lucide-react';
import { fetchAllSubmissions } from '../mantra/api';
import { useToast } from './Toast';

export default function SubmissionsTable() {
  const { showToast } = useToast();
  const [submissions, setSubmissions] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalRecords: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const loadSubmissions = async (page = 1) => {
    setLoading(true);
    const res = await fetchAllSubmissions({
      page,
      limit: 50,
      search: searchQuery
    });
    setLoading(false);

    if (res.success) {
      setSubmissions(res.data || []);
      if (res.pagination) {
        setPagination(res.pagination);
      }
    } else {
      showToast(res.error || 'Failed to load submissions from server', 'error');
    }
  };

  useEffect(() => {
    loadSubmissions(1);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadSubmissions(1);
  };

  // Filter submissions by selected activity
  const filteredSubmissions = submissions.filter(item => {
    if (selectedActivity === 'all') return true;
    return item.lesson_id === selectedActivity || item.submission_type === selectedActivity;
  });

  // Unique activity list for filter dropdown
  const uniqueActivities = Array.from(new Set(submissions.map(s => JSON.stringify({ lessonId: s.lesson_id, title: s.activity_title }))))
    .map(str => JSON.parse(str));

  // Exclude redundant user info & technical file upload metadata keys
  const REDUNDANT_KEYS = [
    'fullName', 'name', 'email', 'submittedAt', 'service',
    'fileName', 'file_name',
    'fileSize', 'file_size', 'bytes',
    'fileType', 'file_type', 'format',
    'publicId', 'public_id',
    'uploadedAt', 'uploaded_at',
    'originalFilename', 'original_filename',
    'secure_url', 'url'
  ];

  const PROOF_KEYS = ['screenshotUrl', 'imageUrl', 'fileUrl', 'proofUrl'];

  // Dynamically discover form field keys (excluding technical metadata & file names)
  const getDynamicFormKeys = () => {
    const keys = new Set();
    filteredSubmissions.forEach(item => {
      const data = item.form_data || item.submission_data || {};
      Object.keys(data).forEach(k => {
        if (!REDUNDANT_KEYS.includes(k)) {
          keys.add(k);
        }
      });
    });

    const keysArr = Array.from(keys);
    const regularKeys = keysArr.filter(k => !PROOF_KEYS.includes(k));
    const proofKeys = keysArr.filter(k => PROOF_KEYS.includes(k));
    
    return [...regularKeys, ...proofKeys];
  };

  const dynamicKeys = getDynamicFormKeys();

  const formatHeaderLabel = (key) => {
    if (PROOF_KEYS.includes(key)) return 'Uploaded Proof';
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateStr;
    }
  };

  const exportToCSV = () => {
    if (!filteredSubmissions || filteredSubmissions.length === 0) {
      showToast('No submission data available to export', 'error');
      return;
    }

    const headers = ['User Name', 'Email', 'Service', ...dynamicKeys.map(formatHeaderLabel), 'Activity Title', 'Submitted Date'];
    const csvRows = [headers.join(',')];

    filteredSubmissions.forEach(item => {
      const data = item.form_data || item.submission_data || {};
      const fullName = data.fullName || data.name || item.user_id || '';
      const email = data.email || '';
      const service = item.service || data.service || '';
      const activity = item.activity_title || '';

      const formValues = dynamicKeys.map(key => {
        const val = data[key];
        if (!val) return '""';
        return `"${String(val).replace(/"/g, '""')}"`;
      });

      const row = [
        `"${fullName.replace(/"/g, '""')}"`,
        `"${email.replace(/"/g, '""')}"`,
        `"${service.replace(/"/g, '""')}"`,
        ...formValues,
        `"${activity.replace(/"/g, '""')}"`,
        `"${formatDate(item.created_at)}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = '\uFEFF' + csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `operations_activity_submissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Exported Operations CSV successfully!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      
      {/* Quick Summary Stat Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        
        {/* Widget 1: Total Records */}
        <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Database size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Submissions</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginTop: '2px' }}>{submissions.length}</div>
          </div>
        </div>

        {/* Widget 2: Active Activities */}
        <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Layers size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Activity Types</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginTop: '2px' }}>{uniqueActivities.length}</div>
          </div>
        </div>

      </div>

      {/* Sleek Operations Action Bar */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justify: 'space-between', 
        alignItems: 'center', 
        gap: '16px', 
        background: '#ffffff', 
        padding: '18px 24px', 
        borderRadius: '16px', 
        border: '1px solid #e2e8f0', 
        boxShadow: '0 4px 14px rgba(0,0,0,0.03)' 
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '10px', 
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', 
            color: '#ffffff', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' 
          }}>
            <FileSpreadsheet size={20} style={{ display: 'block', margin: 'auto' }} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
              Submission Portal
            </h3>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '1px' }}>
              Showing <strong style={{ color: '#2563eb' }}>{filteredSubmissions.length}</strong> real-time records
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          
          {/* Activity Filter Dropdown */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: '#f8fafc', 
            padding: '6px 12px', 
            borderRadius: '10px', 
            border: '1px solid #cbd5e1',
            transition: 'border 0.2s' 
          }}>
            <Filter size={14} color="#64748b" />
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              style={{ border: 'none', background: 'transparent', fontSize: '0.84rem', color: '#1e293b', fontWeight: 700, outline: 'none', cursor: 'pointer' }}
            >
              <option value="all">All Activities ({submissions.length})</option>
              {uniqueActivities.map(act => (
                <option key={act.lessonId} value={act.lessonId}>{act.title}</option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '220px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search user, data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '38px',
                padding: '0 12px 0 34px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.84rem',
                outline: 'none',
                background: '#f8fafc',
                color: '#0f172a',
                transition: 'all 0.2s ease'
              }}
            />
          </form>

          {/* Refresh Button */}
          <button
            onClick={() => loadSubmissions(pagination.currentPage)}
            disabled={loading}
            style={{
              height: '38px',
              padding: '0 14px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.83rem',
              fontWeight: 700,
              transition: 'all 0.2s ease'
            }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>

          {/* Export Excel / CSV Button */}
          <button
            onClick={exportToCSV}
            style={{
              height: '38px',
              padding: '0 16px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.84rem',
              fontWeight: 800,
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(37, 99, 235, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 99, 235, 0.3)';
            }}
          >
            <Download size={15} /> Export Excel / CSV
          </button>

        </div>

      </div>

      {/* Main Operations Grid */}
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.06em' }}>
                <th style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>User / Email</th>
                <th style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>Service</th>
                
                {/* Dynamically Generated Form Data Columns */}
                {dynamicKeys.map(key => (
                  <th key={key} style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                    {formatHeaderLabel(key)}
                  </th>
                ))}

                <th style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>Activity</th>
                <th style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>Submitted Date</th>
                <th style={{ padding: '14px 16px', whiteSpace: 'nowrap', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4 + dynamicKeys.length} style={{ textAlign: 'center', padding: '48px 16px', color: '#64748b' }}>
                    <RefreshCw size={24} style={{ margin: '0 auto 12px', color: '#2563eb' }} className="animate-spin" />
                    <div style={{ fontWeight: 600 }}>Loading operations data...</div>
                  </td>
                </tr>
              ) : filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={4 + dynamicKeys.length} style={{ textAlign: 'center', padding: '56px 16px', color: '#64748b' }}>
                    <FileSpreadsheet size={36} style={{ margin: '0 auto 12px', color: '#cbd5e1' }} />
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>No Submissions Found</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>Try adjusting your activity filter or search terms</div>
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((item) => {
                  const data = item.form_data || item.submission_data || {};
                  const fullName = data.fullName || data.name || item.user_id;
                  const email = data.email;

                  return (
                    <tr 
                      key={item.id} 
                      style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      
                      {/* Column 1: User / Email */}
                      <td style={{ padding: '14px 16px', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem' }}>{fullName}</div>
                        {email && <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '1px' }}>{email}</div>}
                      </td>

                      {/* Column 2: Service Context Badge */}
                      <td style={{ padding: '14px 16px', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                        {item.service ? (
                          <span style={{ 
                            padding: '3px 10px', 
                            borderRadius: '6px', 
                            background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', 
                            color: '#7e22ce', 
                            border: '1px solid #e9d5ff',
                            fontSize: '0.75rem', 
                            fontWeight: 700, 
                            textTransform: 'capitalize',
                            display: 'inline-block'
                          }}>
                            {item.service}
                          </span>
                        ) : (
                          <span style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>—</span>
                        )}
                      </td>

                      {/* Dynamic Form Field Columns */}
                      {dynamicKeys.map(key => {
                        const val = data[key];
                        const isImage = PROOF_KEYS.includes(key);

                        if (isImage && val) {
                          return (
                            <td key={key} style={{ padding: '14px 16px', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                              <button
                                onClick={() => setPreviewImage(val)}
                                style={{
                                  padding: '4px 12px',
                                  borderRadius: '8px',
                                  border: '1px solid #e9d5ff',
                                  background: '#faf5ff',
                                  color: '#7e22ce',
                                  fontSize: '0.76rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  transition: 'all 0.15s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#f3e8ff'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#faf5ff'}
                              >
                                🖼️ View Proof
                              </button>
                            </td>
                          );
                        }

                        return (
                          <td key={key} style={{ padding: '14px 16px', verticalAlign: 'middle', whiteSpace: 'nowrap', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {val !== undefined && val !== null && val !== '' ? (
                              <span style={{ color: '#334155', fontWeight: 600 }}>{String(val)}</span>
                            ) : (
                              <span style={{ color: '#cbd5e1' }}>—</span>
                            )}
                          </td>
                        );
                      })}

                      {/* Activity Name */}
                      <td style={{ padding: '14px 16px', verticalAlign: 'middle', whiteSpace: 'nowrap', maxWidth: '170px' }}>
                        <div 
                          style={{ 
                            fontSize: '0.78rem', 
                            fontWeight: 600, 
                            color: '#475569', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap' 
                          }}
                          title={item.activity_title}
                        >
                          {item.activity_title}
                        </div>
                      </td>

                      {/* Submitted Date */}
                      <td style={{ padding: '14px 16px', verticalAlign: 'middle', whiteSpace: 'nowrap', fontSize: '0.8rem', color: '#64748b' }}>
                        {formatDate(item.created_at)}
                      </td>

                      {/* Action View Button */}
                      <td style={{ padding: '14px 16px', verticalAlign: 'middle', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <button
                          onClick={() => setSelectedSubmission(item)}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '8px',
                            border: '1px solid #bfdbfe',
                            background: '#eff6ff',
                            color: '#2563eb',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#dbeafe';
                            e.currentTarget.style.borderColor = '#93c5fd';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#eff6ff';
                            e.currentTarget.style.borderColor = '#bfdbfe';
                          }}
                        >
                          View <ChevronRight size={14} />
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Premium Image Proof Viewer Portal */}
      {previewImage && ReactDOM.createPortal(
        <div 
          onClick={() => setPreviewImage(null)}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            width: '100vw', 
            height: '100vh', 
            backgroundColor: 'rgba(15, 23, 42, 0.75)', 
            backdropFilter: 'blur(8px)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 9999999, 
            padding: '20px' 
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              background: '#ffffff', 
              borderRadius: '20px', 
              overflow: 'hidden', 
              maxWidth: '780px', 
              width: '100%', 
              maxHeight: '88vh', 
              display: 'flex', 
              flexDirection: 'column', 
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
              border: '1px solid #e2e8f0',
              position: 'relative' 
            }}
          >
            <div style={{ height: '4px', background: 'linear-gradient(90deg, #2563eb, #7c3aed, #ec4899)' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>Submitted Proof Screenshot</h3>
              <button 
                onClick={() => setPreviewImage(null)} 
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>
            
            <div style={{ overflow: 'auto', padding: '24px', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={previewImage} alt="Full Proof" style={{ maxWidth: '100%', maxHeight: '65vh', borderRadius: '12px', objectFit: 'contain', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} />
            </div>

            <div style={{ padding: '14px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff' }}>
              <a href={previewImage} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                Open original high-res image <ExternalLink size={14} />
              </a>
              <button 
                onClick={() => setPreviewImage(null)} 
                style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* MODAL 2: Premium Centered Screen Record Popup Portal */}
      {selectedSubmission && ReactDOM.createPortal(
        <div 
          onClick={() => setSelectedSubmission(null)}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            width: '100vw', 
            height: '100vh', 
            backgroundColor: 'rgba(15, 23, 42, 0.75)', 
            backdropFilter: 'blur(8px)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 9999999, 
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              background: '#ffffff', 
              borderRadius: '20px', 
              width: '100%', 
              maxWidth: '560px', 
              maxHeight: '85vh', 
              display: 'flex', 
              flexDirection: 'column', 
              padding: '0', 
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.4)',
              border: '1px solid #e2e8f0',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Gradient Top Accent Bar */}
            <div style={{ height: '4px', background: 'linear-gradient(90deg, #2563eb, #7c3aed, #ec4899)' }}></div>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.01em' }}>
                  Submission Record
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '3px' }}>
                  Submitted on <strong style={{ color: '#334155' }}>{formatDate(selectedSubmission.created_at)}</strong>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSubmission(null)} 
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', transition: 'all 0.15s' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px 24px' }}>
              
              {/* Context Summary Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#f8fafc', padding: '14px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Activity Name</div>
                  <div style={{ color: '#0f172a', fontWeight: 700, marginTop: '3px', fontSize: '0.9rem' }}>{selectedSubmission.activity_title}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service Context</div>
                  <div style={{ color: '#7e22ce', fontWeight: 700, marginTop: '3px', fontSize: '0.9rem', textTransform: 'capitalize' }}>{selectedSubmission.service || 'N/A'}</div>
                </div>
              </div>

              {/* Form Fields Section */}
              <div>
                <h4 style={{ margin: '0 0 10px', fontSize: '0.86rem', color: '#0f172a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Submitted Form Fields
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {Object.entries(selectedSubmission.form_data || selectedSubmission.submission_data || {})
                    .filter(([k]) => !REDUNDANT_KEYS.includes(k) && !PROOF_KEYS.includes(k))
                    .map(([key, val]) => (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem', boxShadow: '0 1px 3px rgba(0,0,0,0.01)' }}>
                        <span style={{ fontWeight: 700, color: '#475569', textTransform: 'capitalize' }}>
                          {formatHeaderLabel(key)}:
                        </span>
                        <span style={{ color: '#0f172a', fontWeight: 600, textAlign: 'right', wordBreak: 'break-word', marginLeft: '16px' }}>
                          {String(val)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Proof Image Attachment Preview Card */}
              {(selectedSubmission.form_data?.screenshotUrl || selectedSubmission.form_data?.imageUrl) && (
                <div>
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.86rem', color: '#0f172a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Uploaded Proof Screenshot
                  </h4>
                  <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <img 
                      src={selectedSubmission.form_data?.screenshotUrl || selectedSubmission.form_data?.imageUrl} 
                      alt="Proof" 
                      style={{ width: '84px', height: '58px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}
                    />
                    <a 
                      href={selectedSubmission.form_data?.screenshotUrl || selectedSubmission.form_data?.imageUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      View Original Image <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
              <button 
                onClick={() => setSelectedSubmission(null)} 
                style={{ padding: '9px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', color: '#ffffff', fontWeight: 800, cursor: 'pointer', fontSize: '0.86rem', boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }}
              >
                Close Record
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
