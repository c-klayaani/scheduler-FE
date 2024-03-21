import { useState, useEffect } from "react";
import {
  addClientService,
  editClientService,
  fetchReminders,
  addReminder,
} from "../api/apiIndex";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { useLocation } from "react-router-dom";
import Contact from "../models/Contact";
import ContactsMultiSelect from "../components/form_components/ContactsMultiSelect";
import {
  addContactsToClientService,
  fetchContacts,
  getContactsByServiceId,
} from "../api/contactsApi";
import { fetchServices } from "../api/servicesApi";
import CustomDataTable, { TableColumn } from "../components/CustomDataTable";
import { DeleteIcon } from "../components/Icons/DeleteIcon";
import { CTAButton } from "../components/form_components/CTAButton";
import ControlledInput from "../components/form_components/ControlledInput";
import { CustomDropDown } from "../components/form_components/CustomDropDown";
import PageHeader from "../components/misc/page_header/PageHeader";
import FormWrapper from "../components/form_components/FormWrapper";
import FormRow from "../components/form_components/FormRow";
import { deleteReminder } from "../api/remindersApi";
import Loader from "../components/misc/Loader";
import useToast from "../hooks/useToast";
import { ToastSeverity } from "../context/context";
interface Reminder {
  id: number;
  reminder_name: string;
  time: string;
  // Add more properties if needed
}
const ClientsServicesPage = () => {
  const [services, setServices] = useState<any[]>([]);
  const [reminderdata, setReminderdata] = useState<Reminder[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<string>("active");
  const [description, setDescription] = useState<string>("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  const [isLoading, setIsLoading] = useState<boolean>(type != null);
  const [isFetchingReminders, setIsFetchingReminders] = useState<boolean>(
    type != null
  );
  const [isFetchingContacts, setIsFetchingContacts] = useState<boolean>(
    type != null
  );

  const { showToast } = useToast();

  const [contacts, setContacts] = useState<Array<Contact>>([]);
  const [selectedContacts, setSelectedContacts] = useState<Array<Contact>>([]);

  const navigate = useNavigate();
  const [newReminder, setNewReminder] = useState({
    reminder_name: "",
    time: "",
  });

  const [newReminderError, setNewReminderError] = useState<string | null>(null);

  const statusValues = [
    { code: "Active", name: "Active" },
    { code: "Inactive", name: "Inactive" },
    { code: "Pending", name: "Pending" },
    { code: "Overdue", name: "Overdue" },
  ];
  useEffect(() => {
    fetchData();
    getContacts();
    if (type !== "cid") {
      fetchReminderData();
    }
  }, []);

  const getContacts = async () => {
    setIsFetchingContacts(true);
    try {
      const allContacts = await fetchContacts(false);
      setContacts(allContacts);
      if (id && type != "cid") {
        const assignedContacts = await getContactsByServiceId(Number(id));
        setSelectedContacts(assignedContacts);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingContacts(false);
    }
  };

  const assignContacts = async () => {
    try {
      const response = await addContactsToClientService(
        { contact_ids: selectedContacts.map((contact) => contact.id) },
        Number(id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (type !== "cid" && services.length > 0 && location.state) {
      const { clientDetails } = location.state;
      const selectedService = services.find(
        (service) => service.id === clientDetails.service.id
      );
      setSelectedService(selectedService);
      setStartDate(new Date(clientDetails.startDate));
      setDueDate(new Date(clientDetails.dueDate));
      setStatus(clientDetails.status);
      setDescription(clientDetails.description);
    }
  }, [services, type, location.state, description]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const serviceData = await fetchServices();
      setServices(serviceData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReminderData = async () => {
    setIsFetchingReminders(true);
    try {
      const response = await fetchReminders(Number(id));
      setReminderdata(
        response.map((reminder: any, index: number) => {
          return { ...reminder, name: `Reminder ${index + 1}` };
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsFetchingReminders(false);
    }
  };
  const handleAddReminder = async () => {
    if (!newReminder.time) {
      setNewReminderError("Time is a required field.");
      return;
    }
    setNewReminderError(null);

    setIsFetchingReminders(true);
    try {
      // Call the addReminder function from API
      await addReminder({
        client_services_id: Number(id),
        time: newReminder.time.toString(), // Convert to string if necessary
      });
      // Fetch reminder data again after adding a new reminder
      fetchReminderData();
      // Reset the newReminder state
      setNewReminder({ reminder_name: "", time: "" });
    } catch (error) {
      console.error("Error adding reminder:", error);
    } finally {
      setIsFetchingReminders(false);
    }
  };

  const handleAddService = async () => {
    if (
      !selectedService ||
      !dueDate ||
      !status ||
      !startDate ||
      !description ||
      description == ""
    ) {
      showToast(
        "All the fields are required, please fill them up before submitting",
        ToastSeverity.Error,
        "Required Fields",
        5
      );
      return;
    }
    setIsLoading(true);
    try {
      const service = {
        client_id: Number(id),
        service_id: selectedService.id,
        start_date: startDate?.toISOString(),
        due_date: dueDate.toISOString(),
        status: status,
        description: description,
      };

      if (type === "cid") await addClientService(service);
      else await editClientService(Number(id), service);

      await assignContacts();
      navigate(-1);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReminder = async (id: number) => {
    setIsFetchingReminders(true);
    try {
      await deleteReminder(id);
      setReminderdata((prev) => prev.filter((reminder) => reminder.id != id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingReminders(false);
    }
  };

  const addActionButtons = () => {
    const data = reminderdata.map((item) => {
      return {
        ...item,
        actions: (
          <div className="table-action-row">
            <DeleteIcon onClick={() => handleDeleteReminder(item.id)} />
            {/* <DeleteIcon onClick={() => {}} /> */}
          </div>
        ),
      };
    });
    return data;
  };

  const remindersTableColumns: Array<TableColumn> = [
    { field: "name", header: "Name" },
    { field: "time", header: "Time" },
    {
      field: "actions",
      header: "",
      style: { maxWidth: "1rem" },
      align: "right",
    },
  ];

  return (
    <>
      <div className="page-container">
        <PageHeader>
          <h1>Service Details</h1>
        </PageHeader>

        <FormWrapper>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <FormRow>
                <span className="p-float-label w-100 md:w-14rem">
                  <Dropdown
                    style={{ width: "100%" }}
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.value)}
                    inputId="service"
                    options={services}
                    className="m-w14rem w-100"
                    optionLabel="name"
                    placeholder="Select a Service"
                    disabled={type !== "cid"}
                  />
                  <label htmlFor="service">Service</label>
                </span>
                <CustomDropDown
                  label="Status"
                  currentOption={{ code: status, name: status }}
                  options={statusValues}
                  onCurrentOptionChange={(option) =>
                    setStatus(option?.name || "")
                  }
                />
              </FormRow>

              <FormRow>
                <span className="p-float-label w-100">
                  <Calendar
                    value={startDate ?? new Date()}
                    className="m-w14rem w-100"
                    onChange={(e) => {
                      const selectedDate = e.value ?? new Date();
                      const selectedDateWithoutTime = new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        selectedDate.getDate()
                      );
                      setStartDate(selectedDateWithoutTime);
                    }}
                  />
                  <label htmlFor="birth_date">Start Date</label>
                </span>
                <span className="p-float-label w-100">
                  <Calendar
                    value={dueDate ?? new Date()}
                    className="m-w14rem w-100"
                    onChange={(e) => {
                      const selectedDate = e.value ?? new Date();
                      const selectedDateWithoutTime = new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        selectedDate.getDate()
                      );
                      setDueDate(selectedDateWithoutTime);
                    }}
                  />
                  <label htmlFor="birth_date">Due Date</label>
                </span>
              </FormRow>

              {type != "cid" && (
                <ContactsMultiSelect
                  label="Contacts to remind"
                  name="contacts"
                  contacts={contacts}
                  selectedContacts={selectedContacts}
                  setSelectedContacts={setSelectedContacts}
                  isLoading={isFetchingContacts}
                />
              )}
              <ControlledInput
                label="Description"
                name="description"
                placeholder="Enter service Description"
                value={description}
                onValueChange={setDescription}
              />
              <CTAButton onClick={handleAddService} text="Save" />
            </>
          )}
          {type !== "cid" && (
            <>
              <PageHeader>
                <h1>Reminders</h1>
                {/* <CTAButton
                  leadingIcon={<PlusIcon />}
                  iconButton
                  onClick={handleAddReminder}
                  
                /> */}
                <div></div>
              </PageHeader>
              <FormRow vAlign="flex-start" width="75%">
                <CustomDataTable
                  columns={remindersTableColumns}
                  data={addActionButtons()}
                  isLoading={isFetchingReminders}
                  style={{ minWidth: "30rem" }}
                />
                <FormWrapper padding={0} width="25%">
                  <ControlledInput
                    label="Time"
                    placeholder="Enter reminder time in days"
                    name="time"
                    value={newReminder.time}
                    onValueChange={(newValue) => {
                      if (/^\d*$/.test(newValue)) {
                        setNewReminder({ ...newReminder, time: newValue });
                      }
                    }}
                    error={newReminderError}
                  />

                  <CTAButton
                    text="Add Reminder"
                    onClick={handleAddReminder}
                    isLoading={isFetchingReminders}
                  />
                </FormWrapper>
              </FormRow>
            </>
          )}
        </FormWrapper>
      </div>
    </>
  );
};

export default ClientsServicesPage;
