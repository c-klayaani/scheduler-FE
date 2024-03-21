import { useState, useEffect } from "react";
import { addService, editService, getServiceById } from "../api/servicesApi";
import { useNavigate, useParams } from "react-router-dom";
import { CTAButton } from "../components/form_components/CTAButton";
import ControlledInput from "../components/form_components/ControlledInput";
import PageHeader from "../components/misc/page_header/PageHeader";
import FormWrapper from "../components/form_components/FormWrapper";
import Loader from "../components/misc/Loader";
interface Service {
  id: number;
  name: string;
}

const AddServicesPage = () => {
  const [newServiceName, setNewServiceName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(id != null);

  const getService = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await getServiceById(Number(id));
      setNewServiceName(response.name);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    if (!newServiceName || newServiceName == "") {
      setNameError("Name is a required field");
      return false;
    }

    setNameError(null);
    return true;
  };

  useEffect(() => {
    if (id) getService(id);
  }, []);

  const handleAddService = async () => {
    if (!isFormValid()) return;
    setIsLoading(true);
    try {
      const service = { name: newServiceName };
      if (id) await editService(service, Number(id));
      else await addService(service);
      navigate(-1);
      setNewServiceName("");
    } catch (error) {
      console.error("Error adding service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <PageHeader>
        <h1>Services</h1>
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
            value={newServiceName}
            placeholder="Enter Service name"
            onValueChange={setNewServiceName}
            error={nameError}
          />
        </FormWrapper>
      )}
    </div>
  );
};

export default AddServicesPage;
