import React from "react";
import { Header } from ".";

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
