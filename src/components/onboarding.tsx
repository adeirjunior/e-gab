import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
  RiDatabase2Line,
} from "@remixicon/react";

const steps = [
  {
    id: 1,
    type: "done",
    title: "Sign in with your account",
    description:
      "To get started, log in with your organization account from your company.",
    href: "#",
  },
  {
    id: 2,
    type: "in progress",
    title: "Import data",
    description:
      "Connect your database to the new workspace by using one of 20+ database connectors.",
    href: "#",
  },
  {
    id: 3,
    type: "open",
    title: "Create your first report",
    description:
      "Generate your first report by using our pre-built templates or easy-to-use report builder.",
    href: "#",
  },
];

export default function OnboardingExample() {
  return (
    <>
      <div className="sm:mx-auto sm:max-w-lg">
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Hello, Maxime
        </h3>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Let&apos;s set up your first data workspace
        </p>
        <ul role="list" className="mt-8 space-y-3">
          {steps.map((step) =>
            step.type === "done" ? (
              <li key={step.id} className="relative p-4">
                <div className="flex items-start">
                  <RiCheckboxCircleFill
                    className="h-6 w-6 shrink-0 text-tremor-brand dark:text-dark-tremor-brand"
                    aria-hidden={true}
                  />
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="font-medium leading-5 text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      <a href={step.href} className="focus:outline-none">
                        {/* extend link to entire list card */}
                        <span className="absolute inset-0" aria-hidden={true} />
                        {step.title}
                      </a>
                    </p>
                    <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ) : step.type === "in progress" ? (
              <li className="rounded-tremor-default bg-tremor-background-muted p-4 dark:bg-dark-tremor-background-muted">
                <div className="flex items-start">
                  <RiCheckboxBlankCircleLine
                    className="h-6 w-6 shrink-0 text-tremor-brand dark:text-dark-tremor-brand"
                    aria-hidden={true}
                  />
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="font-medium leading-5 text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      {step.title}
                    </p>
                    <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                      {step.description}
                    </p>
                    <button
                      type="button"
                      className="rounded-tremor-small mt-4 inline-flex items-center gap-1.5 whitespace-nowrap bg-tremor-brand px-3 py-2 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                    >
                      <RiDatabase2Line
                        className="-ml-0.5 h-5 w-5 shrink-0"
                        aria-hidden={true}
                      />
                      Connect database
                    </button>
                  </div>
                </div>
              </li>
            ) : (
              <li className="relative p-4">
                <div className="flex items-start">
                  <RiCheckboxBlankCircleLine
                    className="h-6 w-6 shrink-0 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
                    aria-hidden={true}
                  />
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="font-medium leading-5 text-tremor-content-subtle dark:text-dark-tremor-content-subtle">
                      <a href={step.href} className="focus:outline-none">
                        {/* extend link to entire list card */}
                        <span className="absolute inset-0" aria-hidden={true} />
                        {step.title}
                      </a>
                    </p>
                    <p className="mt-1 text-tremor-default leading-6 text-tremor-content-subtle dark:text-dark-tremor-content-subtle">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </>
  );
}
