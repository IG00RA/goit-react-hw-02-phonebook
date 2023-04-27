import { Component } from 'react';
import { GlobalStyle } from './GlobalStyles';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = newContact => {
    const normalizeName = newContact.name.toLowerCase();
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === normalizeName
      )
    ) {
      return alert(`${newContact.name} is already in contact list`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  findContact = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    const {
      addContact,
      deleteContact,
      getVisibleContacts,
      findContact,
      state,
    } = this;

    return (
      <>
        <GlobalStyle />
        <h1>Phonebook</h1>
        <ContactForm onAdd={addContact} />
        <h2>Contacts</h2>
        <Filter onChange={findContact} value={state.filter} />
        <ContactList
          getContacts={getVisibleContacts()}
          onDelete={deleteContact}
        />
      </>
    );
  }
}
