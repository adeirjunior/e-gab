import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
};

export default function page() {
  return (
    <>
      <div className="items-top relative flex min-h-screen justify-center bg-white sm:items-center sm:pt-0">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="mt-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="mr-2 bg-gray-100 p-6 sm:rounded-lg">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl">
                  Entre em contato
                </h1>
                <p className="text-normal mt-2 text-lg font-medium text-gray-600 sm:text-2xl">
                  Preencha o formulário para iniciar uma conversa
                </p>

                <div className="mt-8 flex items-center text-gray-600">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div className="text-md ml-4 w-40 font-semibold tracking-wide">
                    Acme Inc, Street, State, Postal Code
                  </div>
                </div>

                <div className="mt-4 flex items-center text-gray-600">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div className="text-md ml-4 w-40 font-semibold tracking-wide">
                    +44 1234567890
                  </div>
                </div>

                <div className="mt-2 flex items-center text-gray-600">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="text-md ml-4 w-40 font-semibold tracking-wide">
                    info@acme.org
                  </div>
                </div>
              </div>

              <form className="flex flex-col justify-center p-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="hidden">
                    Nome Completo
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Nome completo"
                    className="w-100 mt-2 rounded-lg border border-gray-400 bg-white px-3 py-3 font-semibold text-gray-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="mt-2 flex flex-col">
                  <label htmlFor="email" className="hidden">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-100 mt-2 rounded-lg border border-gray-400 bg-white px-3 py-3 font-semibold text-gray-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="mt-2 flex flex-col">
                  <label htmlFor="tel" className="hidden">
                    Número
                  </label>
                  <input
                    type="tel"
                    name="tel"
                    id="tel"
                    placeholder="Número de telefone"
                    className="w-100 mt-2 rounded-lg border border-gray-400 bg-white px-3 py-3 font-semibold text-gray-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="hover:bg-blue-dark mt-3 rounded-lg bg-indigo-600 px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:bg-indigo-500 md:w-32"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
