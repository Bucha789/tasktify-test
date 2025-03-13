import { IconButton } from "@mui/material"
export type TaskViewButtonProps = {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  ariaLabel: string
}

export const TaskViewButton = ({ active, onClick, icon, ariaLabel }: TaskViewButtonProps) => {
  return (
    <IconButton onClick={onClick} sx={{ color: active ? 'primary.main' : 'secondary.main' }} aria-label={ariaLabel}>
      {icon}
    </IconButton>
  )
}