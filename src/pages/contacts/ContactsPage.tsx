import { useState, useEffect } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { deleteContact, fetchContacts } from "../../api/contactsApi";
import Contact from "../../models/Contact";
import { DeleteIcon } from "../../components/Icons/DeleteIcon";
import { Link, useNavigate } from "react-router-dom";
import { CheckMarkIcon } from "../../components/Icons/CheckMarIcon";
import { XMarkIcon } from "../../components/Icons/XMarckIcon";
import CustomDataTable, { TableColumn } from "../../components/CustomDataTable";
import { CTAButton } from "../../components/form_components/CTAButton";
import PageHeader from "../../components/misc/page_header/PageHeader";
import PlusIcon from "../../components/Icons/PlusIcon";

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Array<Contact>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteService = async (id: number) => {
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((contact) => contact.id != id));
      // fetchData();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };
  const addActionButtons = () => {
    const data = contacts.map((item) => {
      return {
        ...item,
        isDefault: item.isDefault ? (
          <CheckMarkIcon onClick={() => {}} />
        ) : (
          <XMarkIcon onClick={() => {}} />
        ),
        actions: (
          <div className="table-action-row">
            <DeleteIcon onClick={() => handleDeleteService(item.id)} />
          </div>
        ),
      };
    });
    return data;
  };

  const tableColumns: Array<TableColumn> = [
    { field: "name", header: "Name" },
    { field: "email", header: "Email" },
    { field: "isDefault", header: "Default", align: "center" },
    {
      field: "actions",
      header: "",
      style: { maxWidth: "1rem" },
      align: "right",
    },
  ];

  return (
    <div className="page-container">
      <PageHeader>
        <h1>Contacts</h1>
        <CTAButton
          leadingIcon={<PlusIcon />}
          iconButton
          onClick={() => navigate("/contacts/details")}
        />
      </PageHeader>

      <CustomDataTable
        isRowClickable
        columns={tableColumns}
        data={addActionButtons()}
        isLoading={isLoading}
        onRowClick={(e) => navigate(`/contacts/details/${e.data.id}`)}
      />
    </div>
  );
};

export default ContactsPage;
