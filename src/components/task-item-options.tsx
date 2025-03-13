import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import { RefObject } from "react";

export type TaskItemOptionsProps = {
  open: boolean
  ref: RefObject<HTMLDivElement | null>
  onClose: () => void
  options: {
    label: string
    icon: React.ReactNode
    onClick: () => void
    color: string
  }[]
}

export const TaskItemOptions = ({ open, ref, onClose, options }: TaskItemOptionsProps) => {
  return (
    <Popper
      sx={{ zIndex: 1 }}
      open={open}
      role={undefined}
      transition
      disablePortal
      anchorEl={ref?.current}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={onClose}>
              <MenuList id="split-button-menu" autoFocusItem>
                {options.map((option) => (
                  <MenuItem
                    key={option.label}
                    onClick={option.onClick}
                    sx={{
                      color: option.color,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    {option.icon}
                    {option.label}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
};
