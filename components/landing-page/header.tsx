import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-24 items-center sm:h-32">
      <div className="container mx-auto flex items-center justify-between px-6 sm:px-12">
        <div className="flex items-start text-2xl font-black text-blue-900">
          E-Gab
          <span className="ml-2 h-3 w-3 rounded-full bg-purple-600"></span>
        </div>
        <nav className="hidden items-center text-lg text-purple-900 lg:flex">
          <Link href="/" className="flex px-8 py-2 hover:text-purple-700">
            Home
          </Link>
          <Link href="/sobre" className="flex px-8 py-2 hover:text-purple-700">
            Sobre
          </Link>
          <Link href="/precos" className="flex px-8 py-2 hover:text-purple-700">
            Preços
          </Link>
          <Link href="/contato" className="flex px-8 py-2 hover:text-purple-700">
            Contato
          </Link>
        </nav>
        <div className="flex items-center lg:hidden">
          <button className="ml-4 flex flex-col lg:hidden">
            <span className="mb-1 h-1 w-6 rounded-full bg-purple-800"></span>
            <span className="mb-1 h-1 w-6 rounded-full bg-purple-800"></span>
            <span className="mb-1 h-1 w-6 rounded-full bg-purple-800"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
