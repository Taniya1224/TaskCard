"use client";

import React from "react";
import TaskCard from "./components/molecules/TaskCard";
import { Box, Typography, Grid } from "@mui/material";

export default function Home() {
  const [tasks, setTasks] = React.useState([
    {
      id: "1",
      title: "Finish Homework",
      desc: "Complete math exercises by tonight",
      priority: "high",
      status: "completed",
      assignee: { name: "Tae" },
      dueDate: new Date("2025-11-28"),
    },
    {
      id: "2",
      title: "Buy Groceries",
      desc: "Milk, Eggs, Bread, Fruits",
      priority: "low",
      status: "todo",
      assignee: { name: "J-Hope" },
      dueDate: new Date("2025-11-29"),
    },
    {
      id: "3",
      title: "Watch a Movie",
      desc: "Finish Stranger Things season 5",
      priority: "medium",
      status: "in-progress",
      assignee: { name: "Jung Kook" },
      dueDate: new Date("2025-11-30"),
    },
    {
      id: "4",
      title: "Call Mom",
      desc: "Ask about weekend plans",
      priority: "high",
      status: "todo",
      assignee: { name: "Jimin" },
      dueDate: new Date("2025-12-01"),
    },
    {
      id: "5",
      title: "Clean Room",
      desc: "Organize books and clothes",
      priority: "medium",
      status: "completed",
      assignee: { name: "Yoongi" },
      dueDate: new Date("2025-12-02"),
    },
    {
      id: "6",
      title: "Pay Bills",
      desc: "Electricity and internet bills",
      priority: "high",
      status: "todo",
      assignee: { name: "RM" },
      dueDate: new Date("2025-12-03"),
    },
    {
      id: "7",
      title: "Go for a Walk",
      desc: "Evening walk in the park",
      priority: "low",
      status: "in-progress",
      assignee: { name: "Jin" },
      dueDate: new Date("2025-12-04"),
    },
  ]);

  const handleStatusChange = (id: string, newStatus: "todo" | "in-progress" | "completed") => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
    );
  };

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Task Cards
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {tasks.map((task) => (
          <Grid item key={task.id} xs={12} sm={12} md={8}>
            <TaskCard {...task} onStatusChange={handleStatusChange} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
