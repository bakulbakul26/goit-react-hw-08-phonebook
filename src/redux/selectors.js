import { createSelector } from '@reduxjs/toolkit';

export const selectIsLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;

export const selectContactsItems = state => state.contacts.items;

export const selectFilters = state => state.filters;

export const selectFiltersContacts = createSelector(
  [selectContactsItems, selectFilters],
  (contacts, filters) => {
    switch (filters) {
      case 'favorite':
        return contacts.filter(contact => contact.favorite);
      default:
        return contacts;
    }
  }
);
