import { Switch, useColorScheme } from "@mui/material"

export const DarkModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  return <div>
    <Switch checked={mode === 'dark'} onChange={() => setMode(mode === 'dark' ? 'light' : 'dark')} />
  </div>
}