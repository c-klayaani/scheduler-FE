import { FormEvent, useEffect, useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import "./contacts.css";
import {
  createContact,
  editContact,
  getContactById,
} from "../../api/contactsApi";
import { useNavigate, useParams } from "react-router-dom";
import { CTAButton } from "../../components/form_components/CTAButton";
import ControlledInput from "../../components/form_components/ControlledInput";
import PageHeader from "../../components/misc/page_header/PageHeader";
import FormWrapper from "../../components/form_components/FormWrapper";
import FormRow from "../../components/form_components/FormRow";
import Loader from "../../components/misc/Loader";

const AddEditContactPage = () => {
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(id != null);

  const getUserInfo = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await getContactById(Number(id));
      setName(response.name);
      setEmail(response.email);
      setIsDefault(response.isDefault);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) getUserInfo(id);
  }, []);

  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const isFormValid = () => {
    const emailValid = isEmailValid();
    const nameValid = isNameValid();
    return emailValid && nameValid;
    // return isNameValid() && isEmailValid();
  };

  const isNameValid = () => {
    if (!name || name == "") {
      setNameError("Name is required");
      return false;
    }
    setNameError(null);
    return true;
  };

  const isEmailValid = () => {
    if (!email || email == "") {
      setEmailError((prev) => "Email is a required Field");
      return false;
    }
    if (!email.match(emailRegex)) {
      setEmailError((prev) => "Email should be a valid email");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleSubmit = async () => {
    const contact = {
      name,
      email,
      is_default: isDefault,
    };
    if (isFormValid()) {
      setIsLoading(true);
      try {
        if (id) await editContact(contact, Number(id));
        else await createContact(contact);
        navigate("/contacts");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="page-container">
      <PageHeader>
        <h1>Contact</h1>
        <CTAButton text="Save" onClick={handleSubmit} isLoading={isLoading} />
      </PageHeader>

      {isLoading ? (
        <Loader />
      ) : (
        <FormWrapper>
          <FormRow width="50%">
            <label htmlFor="default-contact">Default User</label>
            <InputSwitch
              id="value"
              name="value"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.value)}
              required
            />
          </FormRow>
          <FormRow width="50%">
            <ControlledInput
              label="Name"
              name="name"
              placeholder="Enter Contact Name"
              value={name}
              onValueChange={setName}
              error={nameError}
            />
          </FormRow>
          <FormRow width="50%">
            <ControlledInput
              name="email"
              label="Email"
              placeholder="Enter contact email"
              value={email}
              onValueChange={setEmail}
              error={emailError}
            />
          </FormRow>
        </FormWrapper>
      )}
    </div>
  );
};

export default AddEditContactPage;
