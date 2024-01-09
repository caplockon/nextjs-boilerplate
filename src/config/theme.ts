import { useTheme } from '@mui/joy'

export function useIsDarkMode() {
  const theme = useTheme()
  return theme.palette.mode === 'dark'
}
