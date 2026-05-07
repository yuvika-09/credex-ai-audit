import SpendForm from "@/components/SpendForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold text-center mt-10">
          AI Spend Audit
        </h1>

        <p className="text-center text-gray-400 mt-4">
          Discover unnecessary AI tooling costs in minutes.
        </p>

        <SpendForm />

      </div>
    </main>
  );
}