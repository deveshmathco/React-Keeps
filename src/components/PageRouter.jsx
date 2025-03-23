import React, { lazy, Suspense } from "react";
import { Card } from "./styles/StyledComponents";

const Dashboard = lazy(() => import("./Dashboard"));

const LoadingFallback = () => (
  <Card style={{ textAlign: "center", padding: "3rem" }}>
    <h2>Loading...</h2>
    <p>Please wait while the application loads</p>
  </Card>
);

const PageRouter = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Dashboard />
    </Suspense>
  );
};

export default PageRouter;
