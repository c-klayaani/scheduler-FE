import emptyImage from "../../assets/images/empty.png";

const ClientServicesEmptyState = () => {
  return (
    <div className="client-services-empty-state-container">
      <img width="300" src={emptyImage} alt="empty state" />
      <h1>Oops, looks like this client doesn't have any services yet.</h1>
      <span>Let's get you started, click on + icon to add the first service</span>
    </div>
  );
};

export default ClientServicesEmptyState;
