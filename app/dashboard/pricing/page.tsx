import SubmitButtons from "@/app/_components/dashboard/SubmitButtons";
import PricingTable from "@/app/_components/shared/Pricing";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/utils/requireUser";
import { stripe } from "@/utils/stripe";
import { redirect } from "next/navigation";

async function getData(userId: string) {
    const data = await prisma.subscription.findUnique({
        where: {
            userId
        },
        select: {
            status: true,
            User: {
                select: {
                    customerId: true
                }
            }
        }
    })

    return data;
}

async function PricingPage() {

    const user = await requireUser()
    const data = await getData(user.id)


    async function createCustomerPortal() {
        'use server'
        const session = await stripe.billingPortal.sessions.create({
            customer: data?.User?.customerId as string,
            return_url: `${process.env.CLIENT_URL}/dashboard`
        })

        return redirect(session.url)
    }

    if (data?.status == 'active') {
        return (
            <Card className="w-full ">
                <CardHeader>
                    <CardTitle>
                        Edit Subscription
                    </CardTitle>
                    <CardDescription>
                        Click on the button below, this will give you opportunity to change your payment details and view invoices at the same time .
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={createCustomerPortal}>
                        <SubmitButtons text="View Subscription Details" />
                    </form>
                </CardContent>
            </Card>
        )
    }

    return (
        <div>
            <PricingTable />
        </div>
    );
}

export default PricingPage;