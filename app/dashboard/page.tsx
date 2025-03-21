import { prisma } from "@/lib/prisma";
import { requireUser } from "@/utils/requireUser";
import EmptyState from "../_components/dashboard/EmptyState";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DefaultImage from '@/public/default.png'

async function getData(userId: string) {

    const [sites, articles] = await Promise.all([
        prisma.site.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 3
        }),
        prisma.post.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 3
        })
    ])

    return { sites, articles }

}

export default async function DashboardPage() {
    const user = await requireUser()
    const { sites, articles } = await getData(user.id)
    return (
        <div className="">
            <h1 className='text-2xl font-semibold mb-5'>Your Sites</h1>
            {sites.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                    {sites.map((item) => (
                        <Card className="pt-0" key={item.id}>
                            <Image
                                src={item.imageUrl ?? DefaultImage}
                                alt={item.name}
                                className="rounded-t-lg object-cover w-full h-[200px]"
                                width={400}
                                height={200}
                            />
                            <CardHeader>
                                <CardTitle className="truncate">{item.name}</CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {item.description}
                                </CardDescription>
                            </CardHeader>

                            <CardFooter className="mt-auto">
                                <Button asChild className="w-full">
                                    <Link href={`/dashboard/sites/${item.id}`}>
                                        View Articles
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="You have no sites"
                    buttonText="Create Site"
                    description="You currently don't have any sites. Please create a site to get started."
                    href={'/dashboard/sites/new'}
                />
            )}

            <h1 className='text-2xl font-semibold mt-10 mb-5'>Recent Articles</h1>

            {articles.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                    {articles.map((item) => (
                        <Card className="pt-0" key={item.id}>
                            <Image
                                src={item.image ?? DefaultImage}
                                alt={item.title}
                                className="rounded-t-lg object-cover w-full h-[200px]"
                                width={400}
                                height={200}
                            />
                            <CardHeader>
                                <CardTitle className="truncate">{item.title}</CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {item.smallDescription}
                                </CardDescription>
                            </CardHeader>

                            <CardFooter className="mt-auto">
                                <Button asChild className="w-full">
                                    <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>
                                        Edit Article
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="You have no articles"
                    buttonText="Create Article"
                    description="You currently don't have any articles. Please create an article to get started."
                    href={'/dashboard/sites/'}
                />
            )}

        </div>
    );
}