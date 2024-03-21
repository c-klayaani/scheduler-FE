import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import Contact from "../../models/Contact";
import { useState } from "react";

type ContactsMultiSelectProps = {
  contacts: Array<Contact>;
  label: string;
  name: string;
  selectedContacts: Array<Contact>;
  isLoading: boolean;
  setSelectedContacts: (newContacts: Array<Contact>) => void;
};

const ContactsMultiSelect = (props: ContactsMultiSelectProps) => {
  const [filteredContacts, setFilteredContacts] = useState<Array<Contact>>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredContacts;

      if (!event.query.trim().length) {
        _filteredContacts = [...props.contacts];
      } else {
        _filteredContacts = props.contacts.filter((contact) => {
          return contact.name.toLowerCase().includes(event.query.toLowerCase());
        });
      }

      setFilteredContacts(_filteredContacts);
    }, 250);
  };

  return (
    <span className="p-float-label w-100">
      <AutoComplete
        className="contacts-multiselect"
        field="name"
        multiple
        loadingIcon={props.isLoading}
        inputId={props.name}
        value={props.selectedContacts}
        suggestions={filteredContacts}
        completeMethod={search}
        onChange={(e) => props.setSelectedContacts(e.value)}
      />
      <label htmlFor={props.name}>{props.label}</label>
    </span>
  );
};

export default ContactsMultiSelect;
