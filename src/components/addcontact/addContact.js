import { useEffect } from 'react';
import css from './addContact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveContact, deleteContact, fetchContacts } from 'redux/contactsSlice';

import ContactForm from 'components/contactform/ContactForm';
import ContactList from 'components/contactlist/ContactList';

const AddContact = () => {
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = newContact => {
    dispatch(saveContact(newContact));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.wrapper}>
      <div>
        <h1 className={css.phonebookHeader}>Phonebook</h1>
        <ContactForm addContact={handleAddContact} />
      </div>
      <ContactList contacts={contacts} deleteContact={handleDeleteContact} />
    </div>
  );
};

export default AddContact;
