import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CTAButton } from "../../components/form_components/CTAButton";
import ControlledInput from "../../components/form_components/ControlledInput";
import { addClient, editClient, getClientById } from "../../api/clientsApi";
import PageHeader from "../../components/misc/page_header/PageHeader";
import FormWrapper from "../../components/form_components/FormWrapper";
import Loader from "../../components/misc/Loader";
import { error } from "console";
interface Service {
  id: number;
  name: string;
}

const AddEditClientPage = () => {
  const [newClientName, setClientName] = useState("");
  const navigate = useNavigate();
  const [nameError, setNameError] = useState<string | null>(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(id != null);

  const isFormValid = () => {
    if (!newClientName || newClientName == "") {
      setNameError("Name is a required field");
      return false;
    }

    setNameError(null);
    return true;
  };

  const getClient = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await getClientById(Number(id));
      setClientName(response.name);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) getClient(id);
  }, []);

  const handleAddService = async () => {
    if (!isFormValid()) return;
    setIsLoading(true);
    try {
      const client = { name: newClientName };
      if (id) await editClient(Number(id), client);
      else await addClient(client);
      navigate(-1);
      setClientName("");
    } catch (error) {
      console.error("Error adding service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <PageHeader>
        <h1>Client</h1>
        <CTAButton
          text="Save"
          onClick={handleAddService}
          isLoading={isLoading}
        />
      </PageHeader>

      {isLoading ? (
        <Loader />
      ) : (
        <FormWrapper>
          <ControlledInput
            label="Name"
            value={newClientName}
            placeholder="Enter Client name"
            onValueChange={setClientName}
            error={nameError}
          />
        </FormWrapper>
      )}
    </div>
  );
};

export default AddEditClientPage;
