import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import SubmitButtons from "../dashboard/SubmitButtons";
import { CreateSubscription } from "@/actions";
import Link from "next/link";

interface IProps {
    id: number;
    cardTitle: string;
    cardDescription: string
    priceTitle: string;
    benefits: string[]
}


export const PricingPlans: IProps[] = [
    {
        id: 0,
        cardTitle: "Freelancer",
        cardDescription: "The best pricing plan for people just starting out.",
        benefits: [
            "1 Free Site", "Up to 2 GB Storage", "Basic Support"
        ],
        priceTitle: "Free"
    },
    {
        id: 1,
        cardTitle: "Starup",
        cardDescription: "The best pricing plan for professionals and small teams.",
        priceTitle: "$29",
        benefits: [
            "5 Free Sites", "10 GB Storage", "Advanced Support"
        ]
    }
]

function PricingTable() {
    return (
        <>
            <div className="max-w-3xl mx-auto text-center">
                <p className="text-primary font-semibold">Pricing</p>
                <h1 className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>Pricing plans for everyone and every budget!</h1>

            </div>

            <p className="mx-auto max-w-2xl mt-6 text-center leading-tight text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi iusto magni repellendus fugit magnam. Dicta enim eveniet laudantium ducimus nemo?
            </p>

            <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-2 ">
                {PricingPlans.map(item => (
                    <Card key={item.id} className={`max-w-md${item.id == 1 ? "border border-primary" : ""}`}>
                        <CardHeader>
                            <CardTitle>
                                {item.id == 1 ? (
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-primary">
                                            Startup
                                        </h3>
                                        <p className='rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold leading-5 text-primary'>
                                            Most Popular
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {item.cardTitle}
                                    </>
                                )}
                            </CardTitle>
                            <CardDescription>
                                {item?.cardDescription}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mt-6 text-4xl font-bold tracking-tight">
                                {item.priceTitle}
                            </p>

                            <ul className="mt-8 space-y-3 text-sm leading-06 text-muted-foreground">
                                {item.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex gap-x-3">
                                        <Check className="text-primary size-5" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            {item?.id == 1 ?
                                <form action={CreateSubscription} className="w-full">
                                    <SubmitButtons
                                        text="Buy plan"
                                        className="mt-5 w-full"
                                    />
                                </form>
                                : (
                                    <Button asChild variant={'outline'} className='cursor-pointer mt-5 w-full'>
                                        <Link href={'/dashboard'}>
                                            Try for free
                                        </Link>
                                    </Button>
                                )}
                        </CardFooter>
                    </Card>
                ))}
            </div >
        </>
    );
}

export default PricingTable;