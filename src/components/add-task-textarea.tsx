import { InputHTMLAttributes } from "react"

export type AddTaskTextareaProps = InputHTMLAttributes<HTMLTextAreaElement>

export const AddTaskTextarea = (props: AddTaskTextareaProps) => {
  return (
    <textarea
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
      {...props}
    />
  )
}