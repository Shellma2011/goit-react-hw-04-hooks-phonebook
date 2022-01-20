import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import shortid from 'shortid';
// import useLocalStorage from './hooks/useLocalStorage';
import Section from './components/Section';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Container from './components/Container';

export default function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function addContact(name, number) {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    console.log(newContact);
    if (
      contacts.find(
        contact =>
          contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase() ||
          contact.number === newContact.number,
      )
    ) {
      return toast.success(`${newContact.name} is already in contacts!`);
    } else {
      return setContacts(contacts => [newContact, ...contacts]);
    }
  }

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
  };

  return (
    <div>
      <Section title="Phonebook">
        <Toaster />
        <ContactForm onSubmit={addContact} />
        <Container title="Contacts">
          <Filter value={filter} onChange={changeFilter} />
          <ContactList contacts={getVisibleContacts()} onDeleteContact={deleteContact} />
        </Container>
      </Section>
    </div>
  );
}
