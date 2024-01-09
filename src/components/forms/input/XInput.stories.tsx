export type XBaseInputProps = {
  id?: string
  name?: string
  type?: string
}

const inputClass =
  'block w-full rounded-md border-0 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 sm:text-sm sm:leading-6'

export default function XBaseInput(props: XBaseInputProps) {
  return (
    <div className="sm:col-span-3">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor={props.id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        First name
      </label>
      <div className="mt-2">
        <input
          type={props.type ?? 'text'}
          name={props.name}
          id={props.id}
          autoComplete="given-name"
          className={inputClass}
        />
      </div>
    </div>
  )
}
