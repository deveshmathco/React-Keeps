import React from "react";
import TaskStats from "./TaskStats";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Container, Header, Main } from "./styles/StyledComponents";
import ThemeToggle from "./ThemeToggle";

const Dashboard = () => {
  return (
    <Container>
      <Header>
        <h1>Task Manager</h1>
        <ThemeToggle />
      </Header>

      <Main>
        <TaskStats />
        <TaskForm />
        <TaskList />
      </Main>
    </Container>
  );
};

export default Dashboard;
