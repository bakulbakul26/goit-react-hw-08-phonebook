import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './ContactList.module.css';
import { deleteContact } from 'redux/contactsSlice';
import { updateContact } from 'redux/contactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingContactId, setEditingContactId] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedNumber, setEditedNumber] = useState('');

  const contacts = useSelector(state => state.contacts);

  const getToken = () => {
    return localStorage.getItem('authToken');
  };
  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleEdit = (id, name, number) => {
    setEditing(true);
    setEditingContactId(id);
    setEditedName(name);
    setEditedNumber(number);
  };

  const handleSaveEdit = async () => {
    try {
      const token = getToken();
      const contactId = editingContactId;
      const editedContact = {
        name: editedName,
        number: editedNumber,
      };

      const response = await fetch(
        `https://connections-api.herokuapp.com/contacts/${contactId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedContact),
        }
      );

      if (response.ok) {
        dispatch(updateContact({ ...editedContact, id: editingContactId }));
        setEditing(false);
      } else {
        console.error(
          'Failed to update contact:',
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error('Error editing contact:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const getContacts = () => {
    if (filter.length === 0) {
      return contacts;
    }
    return contacts.filter(
      contact => contact.name.toLowerCase().indexOf(filter) >= 0
    );
  };

  const clearFindInput = () => {
    setFilter('');
  };

  return (
    <div>
      <div>
        <h2 className={css.contactsHeader}>Contacts</h2>
        <form className={css.form}>
          <div className={css.formInput}>
            <label htmlFor="Find contacts" className={css.inputLabel}>
              Find contacts
              <input
                type="text"
                name="filter"
                value={filter}
                onChange={handleChange}
                className={css.input}
              ></input>
            </label>
          </div>
          <button className={css.clearBtn} onClick={clearFindInput}>
            Delete
          </button>
        </form>
      </div>

      <ul>
        {getContacts().map(({ name, number, id }) => (
          <li key={id} className={css.contact}>
            {editing && editingContactId === id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={e => setEditedName(e.target.value)}
                />
                <input
                  type="text"
                  value={editedNumber}
                  onChange={e => setEditedNumber(e.target.value)}
                />
                <button className={css.listBtn} onClick={handleSaveEdit}>
                  Save
                </button>
                <button className={css.listBtn} onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {name} --- {number}
                <div>
                  <button
                    className={css.listBtn}
                    onClick={() => handleEdit(id, name, number)}
                  >
                    Edit
                  </button>
                  <button
                    className={css.listBtn}
                    onClick={() => dispatch(deleteContact(id))}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
