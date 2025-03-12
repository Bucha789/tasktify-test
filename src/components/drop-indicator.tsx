import { Divider } from "@mui/material"


export const DropIndicator = ({ beforeId, column }: { beforeId: string, column: string }) => {
  return (
    <Divider 
      data-before={beforeId || "-1"} 
      data-column={column}
      sx={{
        opacity: 0,
        color: 'text.secondary',
        height: '16px',
      }}
    >
      Move here
    </Divider>
  )
}