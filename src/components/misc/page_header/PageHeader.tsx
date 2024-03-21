import { ReactNode } from "react";
import "./pageHeader.css";

type PageHeaderProps = {
  children: ReactNode;
};

const PageHeader = ({ children }: PageHeaderProps) => {
  return <div className="page-header">{children}</div>;
};

export default PageHeader;
