import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import Logo from '@/public/logo.svg'
import { ThemeToggle } from "@/app/_components/dashboard/ThemeToggle";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DefaultImage from '@/public/default.png'
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getData(subdirectory: string) {
    const data = await prisma.site.findUnique({
        where: {
            subdirectory
        },
        select: {
            name: true,
            subdirectory: true,
            description: true,
            imageUrl: true,
            posts: {
                select: {
                    title: true,
                    slug: true,
                    createdAt: true,
                    id: true,
                    image: true,
                    smallDescription: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        },
    })

    if (!data) {
        return notFound()
    }

    return data
}

async function Page({ params }: { params: { name: string } }) {
    const subdirectory = params?.name
    const data = await getData(subdirectory)
    return (
        <>
            <nav className="grid grid-cols-3 my-10  ">
                <div
                    className="col-span-1"
                />
                <div className="flex items-center gap-x-4 justify-center">
                    <Image
                        src={Logo}
                        alt="Logo"
                        height={40}
                        width={40}
                    />
                    <h1 className="text-3xl font-semibold tracking-tight line-clamp-2">
                        {data?.name}
                    </h1>
                </div>
                <div className="col-span-1 flex w-full justify-end  ">
                    <ThemeToggle />
                </div>
            </nav>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {data.posts.map((item) => (
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
                                <Link href={`/blog/${params.name}/${item.slug}`}>
                                    Read More
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default Page;