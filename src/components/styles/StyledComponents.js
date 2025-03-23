import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.border};
  width: 100%;

  h1 {
    margin: 0;
    font-size: 1.8rem;

    @media (max-width: 576px) {
      font-size: 1.5rem;
    }
  }
`;

export const Main = styled.main`
  padding: 0;
  width: 100%;
  flex: 1;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
  width: 100%;

  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;

    @media (max-width: 576px) {
      font-size: 1.3rem;
    }
  }
`;

export const Card = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px ${(props) => props.theme.shadow};
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    box-shadow: 0 6px 12px ${(props) => props.theme.shadow};
  }

  h2 {
    margin-top: 0;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 576px) {
    padding: 1rem;
  }
`;

export const TaskItem = styled(Card)`
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.$completed ? props.theme.taskCompleted : props.theme.cardBackground};
  color: ${(props) =>
    props.$completed ? props.theme.taskCompletedText : props.theme.text};
  border-left: 4px solid
    ${(props) => (props.$completed ? props.theme.success : props.theme.primary)};
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$completed ? 0.85 : 1)};
  transform: ${(props) => (props.$completed ? "scale(0.98)" : "scale(1)")};

  .task-content {
    margin-bottom: 1rem;
  }

  .task-title {
    margin-bottom: 0.5rem;
    text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
    color: ${(props) =>
      props.$completed ? props.theme.taskCompletedText : props.theme.text};
    position: relative;

    &:after {
      content: ${(props) => (props.$completed ? '"✓"' : '""')};
      position: absolute;
      right: 0;
      color: ${(props) => props.theme.success};
      font-weight: bold;
    }
  }

  .task-description {
    margin-bottom: 0.75rem;
    text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
    opacity: ${(props) => (props.$completed ? 0.7 : 1)};
  }

  .task-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    @media (max-width: 576px) {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  label {
    font-weight: 500;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    @media (max-width: 576px) {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  width: 100%;

  &:focus {
    outline: 2px solid ${(props) => props.theme.primary};
    border-color: ${(props) => props.theme.primary};
  }
`;

export const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  min-height: 100px;
  width: 100%;
  resize: vertical;

  &:focus {
    outline: 2px solid ${(props) => props.theme.primary};
    border-color: ${(props) => props.theme.primary};
  }
`;

export const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  width: 100%;

  &:focus {
    outline: 2px solid ${(props) => props.theme.primary};
    border-color: ${(props) => props.theme.primary};
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.primary};
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${(props) => props.theme.secondary};
    cursor: not-allowed;
  }

  @media (max-width: 576px) {
    width: 100%;
    padding: 0.75rem 1rem;
  }
`;

export const DangerButton = styled(Button)`
  background-color: ${(props) => props.theme.danger};
`;

export const SuccessButton = styled(Button)`
  background-color: ${(props) => props.theme.success};
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.secondary};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${(props) => props.theme.text};
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(12deg);
  }
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: ${(props) => props.theme.primary};
  color: white;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  ${(props) =>
    props.$completed &&
    `
    background-color: ${props.theme.success};
    opacity: 0.8;
  `}

  ${(props) =>
    props.$priority === "high" &&
    `
    background-color: ${props.theme.danger};
  `}
  
  ${(props) =>
    props.$priority === "medium" &&
    `
    background-color: ${props.theme.primary};
  `}
  
  ${(props) =>
    props.$priority === "low" &&
    `
    background-color: ${props.theme.secondary};
  `}
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const StatCard = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  padding: 1rem;
  flex: 1;
  box-shadow: 0 2px 4px ${(props) => props.theme.shadow};
  text-align: center;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.primary};
  }

  p {
    color: ${(props) => props.theme.secondary};
    font-size: 0.9rem;
    margin: 0;
  }

  @media (max-width: 576px) {
    padding: 0.75rem;

    h3 {
      font-size: 1.5rem;
    }
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  width: 100%;

  .filter-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-actions {
    display: flex;
    align-items: flex-end;
    padding-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;

    .filter-actions {
      padding: 0;
      width: 100%;

      button {
        width: 100%;
      }
    }
  }
`;
