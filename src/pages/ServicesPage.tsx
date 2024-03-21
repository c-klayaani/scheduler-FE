import { useState, useEffect } from "react";
import { fetchServices, deleteService } from "../api/servicesApi";
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "../components/Icons/DeleteIcon";
import CustomDataTable, { TableColumn } from "../components/CustomDataTable";
import { CTAButton } from "../components/form_components/CTAButton";
import PageHeader from "../components/misc/page_header/PageHeader";
import PlusIcon from "../components/Icons/PlusIcon";

interface Service {
  id: number;
  name: string;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddService = async () => {
    navigate("/services/details");
  };

  const handleDeleteService = async (id: number) => {
    try {
      await deleteService(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };
  const addActionButtons = () => {
    const data = services.map((item) => {
      return {
        ...item,
        actions: <DeleteIcon onClick={() => handleDeleteService(item.id)} />,
      };
    });
    return data;
  };

  const tableColumns: Array<TableColumn> = [
    { field: "name", header: "Name" },
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
        <h1>Services</h1>
        <CTAButton
          leadingIcon={<PlusIcon />}
          iconButton
          onClick={handleAddService}
        />
      </PageHeader>

      <CustomDataTable
        isRowClickable
        columns={tableColumns}
        data={addActionButtons()}
        isLoading={isLoading}
        onRowClick={(e) => navigate(`/services/details/${e.data.id}`)}
      />
    </div>
  );
};

export default ServicesPage;
