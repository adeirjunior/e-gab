import DemoHeader from "@/components/header/demo-header";
import { getCurrentYear } from "@/lib/utils";
import { Image, Link } from "@nextui-org/react";
import { default as NextImage } from "next/image";

export default function page() {
  return (
    <>
      <section className="socials container mx-auto mt-2 hidden justify-end space-x-2 px-5 py-1 md:flex">
        <div>
          <Link href="#" title="Twitter Link">
            <i className="fa-brands fa-twitter fa-lg hover:text-demoSecondary text-gray-700 hover:transition-all"></i>
          </Link>
        </div>
        <div>
          <Link href="#" title="Facebook Link">
            <i className="fa-brands fa-facebook fa-lg hover:text-demoSecondary text-gray-700 hover:transition-all"></i>
          </Link>
        </div>
        <div>
          <Link href="#" title="Instagram Link">
            <i className="fa-brands fa-instagram fa-lg hover:text-demoSecondary text-gray-700 hover:transition-all"></i>
          </Link>
        </div>
        <div>
          <Link href="#" title="YouTube Link">
            <i className="fa-brands fa-youtube fa-lg hover:text-demoSecondary text-gray-700 hover:transition-all"></i>
          </Link>
        </div>
      </section>

      <DemoHeader />

      <section className="hero mt-2">
        <div className="container mx-auto flex max-h-max flex-col-reverse space-y-0 py-0 md:flex-row md:space-y-0 md:px-5">
          <div className="from-demoPrimaryLight to-demoPrimary flex flex-col items-center justify-center space-y-8 bg-gradient-to-tr p-10 md:w-1/2 md:items-start lg:items-start">
            <h1 className="font-saira max-w-sm text-center text-3xl font-bold uppercase text-white md:text-left md:text-4xl lg:text-5xl">
              A Real Person For A Real Town
            </h1>
            <p className="font-saira max-w-sm text-center text-base font-medium text-white md:text-left">
              I don&apos;t know what you&apos;re paying me for, but it
              ain&apos;t enough. If you can get enough dollars, we&apos;ll knock
              you off. If you can get enough votes, we&apos;ll win. That&apos;s
              the power we have in the Arcadia 2023 Election.
            </p>
            <div className="flex-justify-start">
              <Link
                href="#"
                className="font-saira text-demoSecondary hover:bg-demoSecondary bg-white px-3.5 py-1.5 font-bold uppercase hover:text-white"
              >
                Community
              </Link>
              <Link
                href="#"
                className="font-saira text-demoSecondary hover:bg-demoSecondary ml-4 bg-white px-3.5 py-1.5 font-bold uppercase hover:text-white"
              >
                Volunteer
              </Link>
            </div>
          </div>

          <div className="relative bg-gradient-to-tr from-sky-600 to-sky-800 md:max-h-[50rem] md:w-1/2 lg:max-h-[60rem]">
            <Image
              src="/demo-hero-image.jpeg"
              className="h-full w-full opacity-60"
              alt="Billy Pace Hero Image"
              width={800}
              height={600}
            />
            <h1 className="font-saira absolute left-1/2 top-1/2 z-10 max-w-sm -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              VOTE <span className="text-demoSecondary">1</span> BILLY PACE
            </h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto mt-5 md:px-5 md:pb-0">
        <div className="bg-demoPrimary h-6 w-full"></div>
      </div>

      <section className="political-party">
        <div className="container mx-auto mt-10 px-5">
          <div className="flex flex-col items-center space-y-8 md:flex-row md:space-x-16 md:space-y-0 lg:justify-center">
            <div className="w-44">
              <Image
                src="/demo-sdp-logo.png"
                className="shadow-lg transition-transform hover:scale-[1.1]"
                alt="SDP Logo"
                width={300}
                height={300}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <h1 className="font-saira text-demoSecondary text-center text-xl font-bold uppercase md:text-left md:text-lg lg:text-2xl">
                BILLY PACE IS A MEMBER OF THE SOVEREIGN DEFIANCE PARTY
              </h1>
              <p className="font-saira text-center text-base font-medium text-gray-700 md:text-start">
                Authorised by Bob Thornton, Sovereign Defiance Party, State
                Director, Arcadia 2000
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto mt-10 md:px-5 md:pb-5 md:pt-0">
        <div className="bg-demoPrimary h-6 w-full"></div>
      </div>

      <div className="container mx-auto mt-5 flex flex-col-reverse flex-wrap md:mt-0 md:flex-row md:px-5 md:pb-5 md:pt-0">
        <section className="mt-5 gap-5 px-5 md:mt-0 md:w-2/3 md:px-0 md:pr-5">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 lg:space-y-0 ">
            <div className="post from-demoPrimaryLight to-demoPrimary relative w-full overflow-hidden bg-gradient-to-tr">
              <NextImage
                className="opacity-40"
                src="/demo-main-1.jpg"
                alt="Placeholder"
                fill
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-start justify-between p-2 md:p-4 lg:p-4">
                <p className="text-md text-left font-medium text-white md:text-xl xl:text-3xl">
                  PHOTOS OF THE 2023 ARCADIA FUN RUN
                </p>
                <Link
                  href="#"
                  className="font-saira bg-demoSecondary hover:text-demoSecondary px-5 py-2 font-bold uppercase text-white hover:bg-white xl:mt-5"
                >
                  View
                </Link>
              </div>
            </div>
            <div className="post to-demoPrimary relative w-full overflow-hidden bg-gradient-to-tr from-purple-700">
              <Link href="#">
                <NextImage
                  className="opacity-40"
                  src="/demo-main-2.jpg"
                  alt="Placeholder"
                  width={600}
                  height={600}
                />
              </Link>
            </div>
            <div className="post to-demoPrimary relative w-full overflow-hidden bg-gradient-to-tr from-purple-700">
              <Link href="#">
                <NextImage
                  className="opacity-40"
                  src="/demo-main-3.jpg"
                  alt="Placeholder"
                  width={600}
                  height={600}
                />
              </Link>
            </div>
            <div className="post flex w-full flex-col space-y-2 overflow-hidden">
              <p className="font-saira text-demoPrimary text-left text-xs font-bold uppercase leading-tight tracking-tight md:text-base xl:text-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
                fuga!
              </p>
              <p className="font-saira text-xs font-medium leading-tight text-gray-700 md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                inventore ullam vero reprehenderit porro rem illum voluptates,
                blanditiis aperiam debitis?
              </p>
            </div>
            <div className="post to-demoPrimary relative w-full overflow-hidden bg-gradient-to-tr from-pink-700 via-purple-600">
              <Link href="#">
                <NextImage
                  className="opacity-40"
                  src="/demo-main-4.jpg"
                  alt="Placeholder"
                  width={600}
                  height={600}
                />
              </Link>
            </div>
            <div className="post flex w-full flex-col space-y-2 overflow-hidden">
              <p className="font-saira text-demoPrimary text-left text-xs font-bold uppercase leading-tight tracking-tight md:text-base xl:text-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
                fuga!
              </p>
              <p className="font-saira text-xs font-medium leading-tight text-gray-700 md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                inventore ullam vero reprehenderit porro rem illum voluptates,
                blanditiis aperiam debitis?
              </p>
            </div>
          </div>
        </section>

        <aside className="bg-demoPrimary flex w-full flex-col items-center justify-center p-7 md:w-1/3">
          <div className="flex w-full flex-col items-center space-y-6">
            <div className="bg-demoSecondary relative mx-auto h-16 w-16 rounded-full">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <i className="fa-regular fa-envelope fa-2xl text-white"></i>
              </div>
            </div>
            <h1 className="font-saira text-center text-2xl text-white md:text-3xl lg:text-4xl">
              Join Our Mailing List
            </h1>
            <p className="font-saira text-center text-base font-medium text-white">
              Stay up to date with the latest campaign news, events, and more as
              Billy Pace runs as a candidate in the Arcadia 2023 Election!
            </p>
            <form className="mb-9 w-full">
              <div className="mb-6">
                <input
                  className="font-saira focus:border-demoSecondary w-full px-4 py-3 text-center font-medium text-gray-700 placeholder-gray-600"
                  id="newsletterInput1-1"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="mb-6">
                <input
                  className="font-saira focus:secondary w-full px-4 py-3 text-center font-medium text-gray-700 placeholder-gray-600"
                  id="newsletterInput1-2"
                  type="text"
                  placeholder="Email address"
                />
              </div>
              <button
                className="font-saira bg-demoSecondary hover:text-demoSecondary w-full px-6 py-4 font-bold uppercase text-white hover:bg-white"
                type="button"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </aside>
      </div>

      <div className="container mx-auto mt-5 md:hidden">
        <div className="bg-demoPrimary flex justify-between p-8">
          <div>
            <Link href="#" title="Twitter Link">
              <i className="fa-brands fa-twitter fa-2xl hover:text-demoSecondary text-white hover:transition-all"></i>
            </Link>
          </div>
          <div>
            <Link href="#" title="Facebook Link">
              <i className="fa-brands fa-facebook fa-2xl hover:text-demoSecondary text-white hover:transition-all"></i>
            </Link>
          </div>
          <div>
            <Link href="#" title="Instagram Link">
              <i className="fa-brands fa-instagram fa-2xl hover:text-demoSecondary text-white hover:transition-all"></i>
            </Link>
          </div>
          <div>
            <Link href="#" title="YouTube Link">
              <i className="fa-brands fa-youtube fa-2xl hover:text-demoSecondary text-white hover:transition-all"></i>
            </Link>
          </div>
        </div>
      </div>

      <footer className="container mx-auto mt-5 bg-white p-4 md:px-6 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="#" className="mb-4 flex items-center sm:mb-0">
            <Image
              src="/demo-logo.png"
              className="h-12 w-auto"
              alt="Billy Pace Logo"
            />
          </Link>
          <ul className="mb-6 flex flex-wrap items-center text-base font-medium sm:mb-0 dark:text-gray-700">
            <li>
              <Link
                href="#"
                className="font-saira hover:text-demoSecondary mr-4 text-gray-700 transition-all hover:underline hover:decoration-2 hover:underline-offset-4 md:mr-6"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-saira hover:text-demoSecondary mr-4 text-gray-700 transition-all hover:underline hover:decoration-2 hover:underline-offset-4 md:mr-6"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-saira hover:text-demoSecondary mr-4 text-gray-700 transition-all hover:underline hover:decoration-2 hover:underline-offset-4 md:mr-6"
              >
                Licensing
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-saira hover:text-demoSecondary mr-4 text-gray-700 transition-all hover:underline hover:decoration-2 hover:underline-offset-4 md:mr-6"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="sm:mx-aut border-demoPrimary my-6 border-2 lg:my-8" />
        <span className="block text-sm text-gray-700 sm:text-center">
          © {getCurrentYear()} Billy Pace For Arcadia. All Rights Reserved.
        </span>
      </footer>
    </>
  );
}
