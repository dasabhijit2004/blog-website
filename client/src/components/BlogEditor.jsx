import React, { useEffect, useState, useRef } from 'react';
import debounce from '../utils/debounce';
import API from '../services/api';
import { toast } from 'react-toastify';

const BlogEditor = ({ initialData = null }) => {
    const [form, setForm] = useState({ title: '', content: '', tags: '' });
    const [blogId, setBlogId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const saveTimeout = useRef(null);
    const intervalRef = useRef(null);
    const savingToastId = useRef(null); // For toast reference
    const blogIdRef = useRef(null);

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || '',
                content: initialData.content || '',
                tags: initialData.tags?.join(', ') || '',
            });
            setBlogId(initialData._id);
            blogIdRef.current = initialData._id;
        }
    }, [initialData]);

    useEffect(() => {
        blogIdRef.current = blogId;
    }, [blogId]);

    const debouncedAutoSave = useRef(
        debounce((data) => {
            saveDraft({
                ...data,
                id: blogIdRef.current
            });
        }, 5000)
    );

    const lastSavedForm = useRef(form);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (
                form.title !== lastSavedForm.current.title ||
                form.content !== lastSavedForm.current.content ||
                form.tags !== lastSavedForm.current.tags
            ) {
                saveDraft(form);
                lastSavedForm.current = form;
            }
        }, 30000);

        return () => clearInterval(intervalRef.current);
    }, [form]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => {
            const updated = { ...prev, [name]: value };
            debouncedAutoSave.current(updated);
            return updated;
        });
    };

    const saveDraft = async (data) => {
        if (!data.title.trim() || !data.content.trim()) return;

        try {
            setIsSaving(true);

            if (!savingToastId.current) {
                savingToastId.current = toast.loading('Saving draft...');
            }

            const res = await API.post('/blogs/save-draft', {
                ...data,
                tags: data.tags.split(',').map(tag => tag.trim()),
                id: data.id || blogIdRef.current,
            });

            if (!blogId && res.data._id) {
                setBlogId(res.data._id);
                blogIdRef.current = res.data._id;
            }

            clearTimeout(saveTimeout.current);
            saveTimeout.current = setTimeout(() => setIsSaving(false), 1500);

            toast.update(savingToastId.current, {
                render: 'Draft saved!',
                type: 'success',
                isLoading: false,
                autoClose: 1500,
            });
            savingToastId.current = null;
        } catch (err) {
            setIsSaving(false);
            toast.update(savingToastId.current, {
                render: 'Failed to save draft!',
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
            savingToastId.current = null;
            console.error('Auto-save error:', err.response?.data || err.message);
        }
    };

    const handlePublish = async () => {
        try {
            const res = await API.post('/blogs/publish', {
                ...form,
                tags: form.tags.split(',').map(tag => tag.trim()),
                id: blogId,
            });

            toast.success('Published successfully!');
            setForm({ title: '', content: '', tags: '' });
            setBlogId(null);
            blogIdRef.current = null;
        } catch (err) {
            toast.error('Failed to publish');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;

        try {
            await API.delete(`/blogs/${blogId}`);
            toast.success('Blog deleted!');
            setForm({ title: '', content: '', tags: '' });
            setBlogId(null);
        } catch (err) {
            toast.error('Failed to delete blog');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <input
                name="title"
                placeholder="Title"
                className="input mb-4 w-full"
                value={form.title}
                onChange={handleChange}
            />
            <textarea
                name="content"
                placeholder="Content"
                rows="8"
                className="textarea w-full"
                value={form.content}
                onChange={handleChange}
            />
            <input
                name="tags"
                placeholder="Tags (comma separated)"
                className="input mt-4 w-full"
                value={form.tags}
                onChange={handleChange}
            />

            <div className="flex items-center gap-4 mt-4">
                <button onClick={handlePublish} className="btn">Publish</button>
                {blogId && (
                    <button onClick={handleDelete} className="btn bg-red-600 hover:bg-red-700 text-white ml-4">
                        Delete Blog
                    </button>
                )}
                <span className="text-sm italic text-gray-500">
                    {isSaving ? 'Saving...' : ''}
                </span>
            </div>
        </div>
    );
};

export default BlogEditor;
