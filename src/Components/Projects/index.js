import { Divider } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { projects } from "../../Data/Constants";
import ProjectCards from "../Cards/ProjectCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  padding: 0 24px;
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ToggleGroup = styled.div`
  display: flex;
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  border-radius: 12px;
  font-weight: 500;
  margin: 22px 0px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const StyledToggleButton = styled.div`
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  ${({ active, theme }) =>
    active &&
    `
      background: ${theme.primary + 20};
    `}
  &:hover {
    background: ${({ theme }) => theme.primary + 8};
  }
  @media (max-width: 768px) {
    padding: 6px 8px;
    border-radius: 4px;
  }
`;

const StyledDivider = styled(Divider)`
  height: 24px;
  margin: 8px;
  background-color: ${({ theme }) => theme.primary};
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
`;

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState("all");

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>Here are some of the projects made by me</Desc>
        <ToggleGroup>
          {toggle === "all" ? (
            <StyledToggleButton active value="all">
              All
            </StyledToggleButton>
          ) : (
            <StyledToggleButton
              value=""
              onClick={() => setToggle("all")}
            >
              All
            </StyledToggleButton>
          )}
          <StyledDivider orientation="vertical" flexItem />
          {toggle === "airline" ? (
            <StyledToggleButton
              active
              value="airline"
              onClick={() => setToggle("airline")}
            >
              Airline Reservation System
            </StyledToggleButton>
          ) : (
            <StyledToggleButton
              value="airline"
              onClick={() => setToggle("airline")}
            >
              Airline Reservation System
            </StyledToggleButton>
          )}
          <StyledDivider orientation="vertical" flexItem />
          {toggle === "inventory" ? (
            <StyledToggleButton
              active
              value="inventory"
              onClick={() => setToggle("inventory")}
            >
              Inventory Management System
            </StyledToggleButton>
          ) : (
            <StyledToggleButton
              value="inventory"
              onClick={() => setToggle("inventory")}
            >
              Inventory Management System
            </StyledToggleButton>
          )}
          <StyledDivider />
        </ToggleGroup>
        <CardContainer>
          {toggle === 'all' && projects
            .map((project) => (
              <ProjectCards
                key={project.id} 
                project={project}
                setOpenModal={setOpenModal}
              />
            ))}
          {projects
            .filter((item) => item.category === toggle)
            .map((project) => (
              <ProjectCards
                key={project.id} 
                project={project}
                setOpenModal={setOpenModal}
              />
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
