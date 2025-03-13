import { IconButton } from "@mui/material"
export type TaskViewButtonProps = {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
}

export const TaskViewButton = ({ active, onClick, icon }: TaskViewButtonProps) => {
  return (
    <IconButton onClick={onClick} sx={{ color: active ? 'primary.main' : 'secondary.main' }}>
      {icon}
    </IconButton>
  )
}