import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';

import { Form, FormLabel, Input, Button } from './ContactForm.styled';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const dispatch = useDispatch();
    const contactsList = useSelector(state => state.contacts.contactsList);

    const handleChange = event => {
        switch (event.target.name) {
            case 'name':
                setName(event.target.value);
                break;

            case 'number':
                setNumber(event.target.value);
                break;

            default:
                break;
        }
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (contactsList.filter(item => item.name === name).length) {
            alert(`${name} is already in contacts`);
        } else {
            dispatch(addContact({ name, number }));
        }

        setName('');
        setNumber('');
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormLabel>
                    Name
                    <Input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={name}
                        onChange={handleChange}
                    />
                </FormLabel>
                <FormLabel>
                    Number
                    <Input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        value={number}
                        onChange={handleChange}
                    />
                </FormLabel>
                <Button type="submit">Add contact</Button>
            </Form>
        </div>
    );
};

export default ContactForm;
