"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Stack,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
  onStatusChange?: (
    id: string,
    status: "todo" | "in-progress" | "completed"
  ) => void;
  onPriorityChange?: (
    id: string,
    priority: "low" | "medium" | "high"
  ) => void; 
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
  onPriorityChange, 
}: TaskCardProps) {
  const priorityColors = {
    low: "green",
    medium: "orange",
    high: "red",
  };

  const statusColors = {
    todo: "gray",
    "in-progress": "blue",
    completed: "green",
  };

  const avatarColors = ["#8e44ad", "#2980b9", "#c0392b", "#16a085", "#d35400"];
  const colorIndex = assignee.name.charCodeAt(0) % avatarColors.length;

  /* EDIT MENU */
  const [editAnchor, setEditAnchor] = React.useState<null | HTMLElement>(null);
  const editOpen = Boolean(editAnchor);
  const openEditMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setEditAnchor(event.currentTarget);
  const closeEditMenu = () => setEditAnchor(null);

  /* STATUS MENU */
  const [statusAnchor, setStatusAnchor] = React.useState<null | HTMLElement>(
    null
  );
  const statusOpen = Boolean(statusAnchor);
  const openStatusMenu = (event: React.MouseEvent<HTMLDivElement>) =>
    setStatusAnchor(event.currentTarget);
  const closeStatusMenu = () => setStatusAnchor(null);

  const changeStatus = (val: "todo" | "in-progress" | "completed") => {
    onStatusChange && onStatusChange(id, val);
    closeStatusMenu();
  };

  /* PRIORITY MENU */
  const [priorityAnchor, setPriorityAnchor] =
    React.useState<null | HTMLElement>(null);
  const priorityOpen = Boolean(priorityAnchor);
  const openPriorityMenu = (event: React.MouseEvent<HTMLDivElement>) =>
    setPriorityAnchor(event.currentTarget);
  const closePriorityMenu = () => setPriorityAnchor(null);

  const changePriority = (val: "low" | "medium" | "high") => {
    onPriorityChange && onPriorityChange(id, val); 
    closePriorityMenu();
  };

  return (
    <Card
      sx={{
        width: 900,
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
        {/* TOP ROW: TITLE + MENU */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={openEditMenu}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Menu anchorEl={editAnchor} open={editOpen} onClose={closeEditMenu}>
          <MenuItem
            onClick={() => {
              closeEditMenu();
              onEdit && onEdit(id);
            }}
          >
            <ListItemIcon>
              <EditIcon sx={{ color: "green" }} />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>

          <MenuItem
            onClick={() => {
              closeEditMenu();
              onDelete && onDelete(id);
            }}
          >
            <ListItemIcon>
              <DeleteIcon sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </Menu>

        {/* DESCRIPTION */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, mb: 2 }}
        >
          {desc}
        </Typography>

        {/* BOTTOM ROW */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          {/* LEFT SIDE: PRIORITY + STATUS */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* PRIORITY CHIP */}
            <Chip
              label={priority.toUpperCase()}
              onClick={openPriorityMenu}
              sx={{
                bgcolor: priorityColors[priority],
                color: "white",
                cursor: "pointer",
                "&:hover": { transform: "scale(1.05)", bgcolor: "#2D2D2D" },
                transition: "0.2s",
              }}
            />

            <Menu
              anchorEl={priorityAnchor}
              open={priorityOpen}
              onClose={closePriorityMenu}
            >
              {(["low", "medium", "high"] as const).map((p) => (
                <MenuItem key={p} onClick={() => changePriority(p)}>
                  {p.toUpperCase()}
                </MenuItem>
              ))}
            </Menu>

            {/* STATUS CHIP */}
            <Chip
              label={status.toUpperCase()}
              onClick={openStatusMenu}
              sx={{
                bgcolor: statusColors[status],
                color: "white",
                cursor: "pointer",
                "&:hover": { transform: "scale(1.05)", bgcolor: "#2D2D2D" },
                transition: "0.2s",
              }}
            />

            <Menu
              anchorEl={statusAnchor}
              open={statusOpen}
              onClose={closeStatusMenu}
            >
              {(["todo", "in-progress", "completed"] as const).map((s) => (
                <MenuItem key={s} onClick={() => changeStatus(s)}>
                  {s.toUpperCase()}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* RIGHT SIDE: ASSIGNEE + DUE DATE */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ bgcolor: avatarColors[colorIndex], color: "white" }}
              >
                {assignee.name[0]}
              </Avatar>
              <Typography variant="body2">{assignee.name}</Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary">
              Due: {dueDate.toDateString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
