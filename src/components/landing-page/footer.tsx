export default function Footer() {
  return (
    <footer className="relative  mt-1 pb-6 pt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center md:w-6/12">
            <div className="text-blueGray-500 py-1 text-sm font-semibold">
              Feito por{" "}
              <a
                href="http://onsys-solutions.com.br/"
                className="text-blueGray-500 hover:text-blueGray-800"
                target="_blank"
              >
                Onsys Solutions
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
