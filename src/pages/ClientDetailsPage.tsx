import React, { useState, useEffect } from "react";
import { getClientServices, deleteClientService } from "../api/apiIndex";
import { useNavigate } from "react-router-dom";
import { ClientService } from "../models/ClientService";
import ServiceCard from "../components/service_card/ServiceCard";
import { useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import Client from "../models/Client";
import { CTAButton } from "../components/form_components/CTAButton";
import ControlledInput from "../components/form_components/ControlledInput";
import { fetchClients, editClient, getClientById } from "../api/clientsApi";
import StatusIndicatorsLegend from "../components/service_card/StatusIndicatorsLegend";
import { EditIcon } from "../components/Icons/EditIcon";
import PageHeader from "../components/misc/page_header/PageHeader";
import Loader from "../components/misc/Loader";
import ClientServicesEmptyState from "../components/misc/ClientServicesEmptyState";
import PlusIcon from "../components/Icons/PlusIcon";

const ClientsDetails = () => {
  const [clientName, setClientName] = useState("");
  const [clientDetails, setClientDetails] = useState<ClientService[]>([]);
  const navigate = useNavigate();
  const [clients, setclients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const cid = id;

  useEffect(() => {
    fetchClientService(Number(cid));
  }, []);
  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      deleteClientService(id);
      setClientDetails((prev) => prev.filter((service) => service.id != id));
    } catch (error) {
      console.error("Error deleting service:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchData = async (id: number) => {
    setIsLoading(true);
    try {
      const data = await getClientById(id);
      setclients([data]);
      setClientName(data.name);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClientService = async (id: number) => {
    try {
      const data = await getClientServices(Number(id));
      const mappedData = data.map((item: any) => new ClientService(item));
      mappedData == 0 ? fetchData(Number(cid)) : setClientDetails(mappedData);
      if (mappedData.length > 0) {
        setClientName(mappedData[0].client.name);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="page-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PageHeader>
            <div className="row-16">
              <h1>{clientName}</h1>
              <EditIcon onClick={() => navigate(`/clients/details/${id}`)} />
            </div>

            <CTAButton
              leadingIcon={<PlusIcon />}
              iconButton
              onClick={() => navigate(`/clients/services/${cid}?type=cid`)}
            />
          </PageHeader>

          {clientDetails.length == 0 ? (
            <ClientServicesEmptyState />
          ) : (
            <div className="flex-row flex-wrap">
              {clientDetails.map((service, index) => {
                return (
                  <ServiceCard
                    key={index}
                    onClick={() =>
                      navigate(`/clients/services/${service.id}`, {
                        state: { clientDetails: service },
                      })
                    }
                    isLoading={false}
                    service={service}
                    handleDeleteClick={() => handleDelete(service.id)}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
      {clientDetails.length > 0 && (
        <div className="legend-wrapper">
          <StatusIndicatorsLegend />
        </div>
      )}
    </div>
  );
};

export default ClientsDetails;
