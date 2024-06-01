import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="bg-slate-800 shadow-xl">
        <div className="mx-auto max-w-6xl py-10">
          <h1 className="text-4xl font-extrabold text-white text-shadow pl-10">
            PRODUCT MANAGER
          </h1>
        </div>
      </header>
      {/* <main className="mt-10 mx-auto max-w-6xl p-10 bg-gray-300 text-gray-900 shadow-xl"> */}
      <main className="mt-10 mx-auto max-w-6xl p-10 bg-gray-300 text-gray-900 shadow-xl rounded">
        <Outlet />
      </main>
    </>
  );
}
