export type AddTaskTextareaProps = {
  value: string
  onChange: (value: string) => void
}

export const AddTaskTextarea = ({ value, onChange }: AddTaskTextareaProps) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Add new task..."
      autoFocus
      style={{
        width: '100%',
        borderRadius: 'calc(2 * var(--mui-shape-borderRadius))',
        border: '3px solid #3A7CFD',
        fontSize: 16,
        fontFamily: '"Josefin Sans", Arial, sans-serif',
        fontWeight: 400,
        outline: 'none',
        padding: 10,
        resize: 'none',
        backgroundColor: 'transparent',
        color: 'common.white',
      }}
    />
  )
}