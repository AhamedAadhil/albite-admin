import { ReactNode } from "react"
import { IconProps } from "react-toastify"

export type ChildrenType = Readonly<{ children: ReactNode }>

export type BootstrapVariantType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'


export type DropzoneFormInputProps = {
  label?: string
  className?: string
  labelClassName?: string
  helpText?: ReactNode | string
  showPreview?: boolean
  iconProps?: IconProps
  icon?: string
  text?: string
  textClassName?: string
  onFileUpload?: (files: UploadFileType[]) => void
}

export type UploadFileType = File & {
  path?: string
  preview?: string
  formattedSize?: string
}

export type UIExamplesListProps = { examples: { label: string; link: string }[] }
