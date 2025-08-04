import React, { useState } from 'react';
import { listingAPI } from '../api';
import { useNavigate } from 'react-router-dom';

const EditListing = ({ listing, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(listing.title);
  const [price, setPrice] = useState(listing.price);
  const [location, setLocation] = useState(listing.location);
  const [description, setDescription] = useState(listing.description);
  const [img, setImg] = useState(listing.img);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await listingAPI.updateListing(listing._id, {
        title,
        price,
        location,
        description,
        img,
        userId,
      });
      alert('Listing updated!');
      onUpdate?.(res.data.data);
    } catch (err) {
      alert('Update failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    try {
      const res = await listingAPI.deleteListing(listing._id, userId);

      if (res.status === 200) {
        alert('Listing deleted!');
        onDelete?.(); // Trigger parent redirect
      }
    } catch (err) {
      alert('Delete failed');
      console.error("Delete error", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Listing</h2>

      <input className="w-full border p-2 mb-3 rounded" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input className="w-full border p-2 mb-3 rounded" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
      <input className="w-full border p-2 mb-3 rounded" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
      <textarea className="w-full border p-2 mb-3 rounded" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={4} />
      <input className="w-full border p-2 mb-4 rounded" type="text" value={img} onChange={(e) => setImg(e.target.value)} placeholder="Image URL" />

      <div className="flex gap-4">
        <button onClick={handleUpdate} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          {loading ? 'Updating...' : 'Update Listing'}
        </button>
        <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditListing;
