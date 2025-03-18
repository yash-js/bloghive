
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Features from "./_components/frontend/Features";
import Hero from "./_components/frontend/Hero";
import Logos from "./_components/frontend/Logos";
import PricingTable from "./_components/shared/Pricing";

export default async function Home() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if(user?.id) {
    return redirect('/dashboard')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <Logos />
      <Features />
      <PricingTable />
    </div>
  );
}