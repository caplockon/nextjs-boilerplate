export default function AppLogo() {
  return (
    <>
      <button
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <div className="flex items-center">
          <svg
            className="ms-3 flex h-6 w-6 items-center"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </div>
      </button>
      <a href="https://flowbite.com" className="ms-2 flex md:me-24">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="me-3 h-8"
          alt="FlowBite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold sm:text-2xl dark:text-white">
          Flowbite
        </span>
      </a>
    </>
  )
}
