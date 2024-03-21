import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTableSelectEvent } from "primereact/datatable";
import CustomDataTable, { TableColumn } from "../../components/CustomDataTable";
import { DeleteIcon } from "../../components/Icons/DeleteIcon";
import { CTAButton } from "../../components/form_components/CTAButton";
import ControlledInput from "../../components/form_components/ControlledInput";
import { addClient, deleteClient, fetchClients } from "../../api/clientsApi";
import PageHeader from "../../components/misc/page_header/PageHeader";
import PlusIcon from "../../components/Icons/PlusIcon";

interface Client {
  id: number;
  name: string;
}

const ClientsPage = () => {
  const [clients, setclients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchClients();
      setclients(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handledeleteClient = async (id: number) => {
    try {
      await deleteClient(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const addActionButtons = () => {
    const data = clients.map((item) => {
      return {
        ...item,
        actions: <DeleteIcon onClick={() => handledeleteClient(item.id)} />,
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
        <h1>Clients</h1>
        <CTAButton
          leadingIcon={<PlusIcon />}
          iconButton
          onClick={() => navigate(`/clients/details`)}
        />
      </PageHeader>

      <CustomDataTable
        isRowClickable
        columns={tableColumns}
        data={addActionButtons()}
        isLoading={isLoading}
        onRowClick={(e) => navigate(`/clients/${e.data.id}`)}
      />
    </div>
  );
};

export default ClientsPage;
