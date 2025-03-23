import React, { memo } from "react";
import { useTaskFilters } from "../hooks/useTaskFilters";
import { StatsContainer, StatCard } from "./styles/StyledComponents";

const TaskStats = () => {
  const { taskStats } = useTaskFilters();

  return (
    <StatsContainer>
      <StatCard>
        <h3>{taskStats.total}</h3>
        <p>Total Tasks</p>
      </StatCard>

      <StatCard>
        <h3>{taskStats.completed}</h3>
        <p>Completed</p>
      </StatCard>

      <StatCard>
        <h3>{taskStats.incomplete}</h3>
        <p>Remaining</p>
      </StatCard>

      <StatCard>
        <h3>{taskStats.percentComplete}%</h3>
        <p>Completion Rate</p>
      </StatCard>
    </StatsContainer>
  );
};

export default memo(TaskStats);
