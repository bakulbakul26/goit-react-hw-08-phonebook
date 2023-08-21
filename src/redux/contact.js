import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, toggleFavorite } from './contactsSlice';

export const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteContact(contact.id));
  const handleToggle = () =>
    dispatch(toggleFavorite({ id: contact.id, favorite: !contact.favorite }));

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '200px',
      }}
    >
      <input
        type="checkbox"
        checked={contact.favorite}
        onChange={handleToggle}
      />
      <p>{contact.name}</p>
      <p>{contact.number}</p>
      <button onClick={handleDelete}>Remove</button>
    </div>
  );
};
