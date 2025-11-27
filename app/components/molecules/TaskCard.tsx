"use client";

import react from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Stack,
  Box,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deepPurple, pink, indigo, teal, amber } from "@mui/material/colors";

interface TaskCardProps {
  id: string;
  title: string;
  desc: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  assignee: { name: string; avatar?: string };
  dueDate: Date;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: string) => void;
}

export default function TaskCard({
  id,
  title,
  desc,
  priority,
  status,
  assignee,
  dueDate,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {

  const priorityColors = {
    low: "green",
    medium: "orange",
    high: "red",
  };

  const avatarColors = [
    "#8e44ad", // purple
    "#2980b9", // blue
    "#c0392b", // red
    "#16a085", // teal
    "#d35400", // orange
  ];

  const colorIndex =
  assignee.name.charCodeAt(0) % avatarColors.length;

  const statusColors = {
    todo: "gray",
    "in-progress": "blue",
    completed: "green",
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        p: 2,
        m: 2,
        boxShadow: 3,
        borderRadius: 2,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton color="success" onClick={() => onEdit && onEdit(id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete && onDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </Box>

        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>

        <Chip
          label={priority.toUpperCase()}
          sx={{ bgcolor: priorityColors[priority], color: "white", mt: 1 }}
        />

        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <Avatar
            sx={{
              bgcolor: avatarColors[colorIndex],
              color: "white",
            }}
          >
            {assignee.name[0]}
          </Avatar>
          <Typography variant="body2">{assignee.name}</Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary" mt={1}>
          Due: {dueDate.toDateString()}
        </Typography>

        <Chip
          label={status.toUpperCase()}
          sx={{ bgcolor: statusColors[status], color: "white", mt: 1 }}
        />
      </CardContent>
    </Card>
  );
}
