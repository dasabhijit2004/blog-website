import React, { useState } from 'react';
import debounce from '../utils/debounce';
import API from '../services/api';
import { toast } from 'react-toastify';

const BlogEditor = () => {
    const [form, setForm] = useState({ title: '', content: '', tags: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => {
            const updatedForm = { ...prev, [name]: value };
            debouncedAutoSave(updatedForm);
            return updatedForm;
        });
    };

    const saveDraft = async (data) => {
        if (!data.title.trim() || !data.content.trim()) return; // ✅ skip if title or content is empty
        try {
            await API.post('/blogs/save-draft', { ...data, tags: data.tags.split(',') });
            toast.success('Auto-saved draft!');
        } catch (err) {
            console.error('Auto-save error:', err.response?.data || err.message);
            toast.error('Failed to auto-save');
        }
    };


    const debouncedAutoSave = debounce(saveDraft, 5000);

    const handlePublish = async () => {
        try {
            await API.post('/blogs/publish', { ...form, tags: form.tags.split(',') });
            toast.success('Published!');
        } catch {
            toast.error('Failed to publish');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <input name="title" placeholder="Title" className="input mb-4 w-full" onChange={handleChange} />
            <textarea name="content" placeholder="Content" rows="8" className="textarea w-full" onChange={handleChange} />
            <input name="tags" placeholder="Tags (comma separated)" className="input mt-4 w-full" onChange={handleChange} />
            <button onClick={handlePublish} className="btn mt-4">Publish</button>
        </div>
    );
};

export default BlogEditor;
