import React from 'react';
import { useDispatch } from 'react-redux';
import { setStatusFilter } from 'redux/contactsSlice';

export const Filters = () => {
  const dispatch = useDispatch();

  const handleChangeFilter = status => {
    dispatch(setStatusFilter(status));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <button onClick={() => handleChangeFilter('all')}>Wszystkie</button>
      <button onClick={() => handleChangeFilter('favorite')}>Ulubione</button>
    </div>
  );
};
