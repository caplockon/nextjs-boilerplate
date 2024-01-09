export type XButtonComposingProps = {
  variant?: XButtonVariant
  color?: XButtonColor
  size?: XButtonSize
}

export type XButtonVariant = 'plain' | 'outlined' | 'solid'

export type XButtonColor =
  | 'primary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'light'
  | 'secondary'

export type XButtonSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'

export const XButtonSolidColors = new Map<XButtonColor, string>([
  [
    'primary',
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
  ],
  [
    'light',
    'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
  ],
  [
    'success',
    'text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
  ],
  [
    'danger',
    'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900',
  ],
  [
    'warning',
    'text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg dark:focus:ring-yellow-900',
  ],
])

export const XButtonOutlinedColors = new Map<XButtonColor, string>([
  [
    'primary',
    'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800',
  ],
  [
    'light',
    'text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800',
  ],
  [
    'success',
    'text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800',
  ],
  [
    'danger',
    'text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900',
  ],
  [
    'warning',
    'text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900',
  ],
])

export const XButtonVariants = new Map<
  XButtonVariant,
  Map<XButtonColor, string>
>([
  ['plain', XButtonSolidColors],
  ['outlined', XButtonOutlinedColors],
  ['solid', XButtonSolidColors],
])

export const XButtonSizes = new Map<XButtonSize, string>([
  ['xs', 'px-3 py-2 text-xs '],
  ['sm', 'px-3 py-2 text-sm'],
  ['base', 'px-5 py-2.5 text-sm'],
  ['lg', 'px-5 py-3 text-base'],
  ['xl', 'px-6 py-3.5 text-base'],
])

export const composeButtonClass = (props: XButtonComposingProps) => {
  const { variant = 'solid', color = 'primary', size = 'base' } = props
  const variantClass = XButtonVariants.get(variant)?.get(color)
  const sizeClass = XButtonSizes.get(size)

  return { variantClass, sizeClass, defaultClass: 'focus:outline-none cursor-pointer' }
}
