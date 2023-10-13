// components/EditModal.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useMutation } from '@apollo/client';
import { UPDATE_NEWS_ITEM, GET_NEWS_ITEMS, PUBLISH_NEWSITEM } from '../../utils/queries';

Modal.setAppElement('#__next'); 

export default function EditModal({ newsItem, isOpen, onRequestClose }) {
  const [updateNewsItem] = useMutation(UPDATE_NEWS_ITEM, {
    refetchQueries: [{ query: GET_NEWS_ITEMS }],
  });
  const [publishNewsItem] = useMutation(PUBLISH_NEWSITEM);

  const [formData, setFormData] = useState({
    title: newsItem.title,
    author: newsItem.author,
    date: newsItem.date,
    content: newsItem.content,
    category: newsItem.category,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await updateNewsItem({
      variables: {
        id: newsItem.id, 
        title: formData.title,
        author: formData.author,
        date: new Date(formData.date).toISOString(),
        content: formData.content,
        category: formData.category,
      },
    });
    await publishNewsItem({
      variables: {
        where: { id: newsItem.id },
      },
    });
    onRequestClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit News Item"
      className="modal"
    overlayClassName="overlay"
    >
      <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded shadow-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Update
          </button>
          <button type="button" onClick={onRequestClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
