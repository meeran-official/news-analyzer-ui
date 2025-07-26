export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 lg:p-24 bg-gray-900 text-white">
      <div className="w-full max-w-5xl font-sans animate-pulse">
        <header className="mb-12 border-b border-gray-700 pb-4 text-center">
          <div className="h-10 bg-gray-700 rounded-md w-3/4 mx-auto"></div>
          <div className="mt-4 h-5 bg-gray-700 rounded-md w-full max-w-3xl mx-auto"></div>
          <div className="mt-2 h-5 bg-gray-700 rounded-md w-1/2 max-w-3xl mx-auto"></div>
        </header>
        <section className="mb-10 p-6 bg-gray-800 rounded-lg">
          <div className="h-8 bg-gray-700 rounded-md w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-700 rounded-md w-full"></div>
          <div className="mt-2 h-6 bg-gray-700 rounded-md w-5/6"></div>
        </section>
        <section className="mb-12">
           <div className="h-8 bg-gray-700 rounded-md w-1/4 mx-auto mb-4"></div>
           <div className="h-6 bg-gray-700 rounded-md w-1/2 mx-auto"></div>
        </section>
      </div>
    </main>
  );
}