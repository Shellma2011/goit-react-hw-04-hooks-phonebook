import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import shortid from 'shortid';
// import useLocalStorage from './hooks/useLocalStorage';
import Section from './components/Section';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Container from './components/Container';

// state = {
//   contacts: [
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ],
//   filter: '',
// };

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setContacts(JSON.parse(localStorage.getItem('contacts')));
  }, []);

  useEffect(() => {
    setContacts(localStorage.setItem('contacts', JSON.stringify(contacts)));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    let newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (
      contacts.find(
        prevState =>
          prevState.name.toLocaleLowerCase() === name.toLocaleLowerCase() ||
          prevState.number === number,
      )
    ) {
      return toast.success(`${name} is already in contacts!`);
    } else {
      setContacts(contacts => [newContact, ...contacts]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    // const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
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
