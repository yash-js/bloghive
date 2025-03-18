import EmptyState from "@/app/_components/dashboard/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Book, MoreHorizontal, PlusCircle, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData(userId: string, siteId: string) {
    // const data = await prisma.post.findMany({
    //     where: {
    //         userId,
    //         siteId
    //     },
    //     select: {
    //         image: true,
    //         title: true,
    //         slug: true,
    //         createdAt: true,
    //         id: true,
    //         Site: {
    //             select: {
    //                 subdirectory: true
    //             }
    //         }
    //     },
    //     orderBy: {
    //         createdAt: 'desc'
    //     }
    // })

    const data = await prisma.site.findUnique({
        where: {
            id: siteId,
            userId
        },
        select: {
            subdirectory: true,
            posts: {
                select: {
                    id:true,
                    image: true,
                    title: true,
                    createdAt: true,
                    smallDescription: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    })

    return data
}

export default async function SitePage({ params }: { params: Promise<{ siteId: string }> }) {

    const { getUser } = getKindeServerSession()

    const user = await getUser()

    if (!user) {
        return redirect('/api/auth/login')
    }

    const data = await getData(user.id, (await params)?.siteId)

    return (
        <>
            <div className="flex w-full justify-end gap-x-4">
                <Button asChild variant={'secondary'}>
                    <Link href={`/blog/${data?.subdirectory}`}>
                        <Book className="size-4 mr-2" />
                        View Blog
                    </Link>
                </Button>
                <Button asChild variant={'secondary'}>
                    <Link href={`/dashboard/sites/${(await params).siteId}/settings`}>
                        <Settings
                            className="size-4 mr-2"
                        />
                        Settings
                    </Link>
                </Button>
                <Button asChild>
                    <Link href={`/dashboard/sites/${(await params).siteId}/create`}>
                        <PlusCircle className="size-4 mr-2" />
                        Create an Article
                    </Link>
                </Button>
            </div>

            {data?.posts == undefined || data?.posts.length == 0 ? (
                <EmptyState
                    title="You don&apos;t have any articles created."
                    buttonText="Create an Article"
                    description="You currently don&apos;t have any articles. Please create an article to get started."
                    href={`/dashboard/sites/${(await params).siteId}/create`}
                />
            ) : (
                <div className="">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Articles
                            </CardTitle>
                            <CardDescription>
                                Manage your Articles in a simple and intuitive interface
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            Image
                                        </TableHead>
                                        <TableHead>
                                            Title
                                        </TableHead>
                                        <TableHead>
                                            Status
                                        </TableHead>
                                        <TableHead>
                                            Created At
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.posts.map(async item => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Image
                                                    src={item.image}
                                                    width={64}
                                                    height={64}
                                                    alt={item.title}
                                                    className="size-16 rounded-md object-cover"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {item.title}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={'outline'} className="bg-green-500/10 text-green-500">
                                                    Published
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Intl.DateTimeFormat('en-US', {
                                                    dateStyle: 'medium',

                                                }).format(item.createdAt)}
                                            </TableCell>

                                            <TableCell className="text-end">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size='icon' variant={'ghost'} className="cursor-pointer">
                                                            <MoreHorizontal className="size-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>
                                                            Actions
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/dashboard/sites/${(await params).siteId}/${item.id}`}>Edit</Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/dashboard/sites/${(await params).siteId}/${item.id}/delete`}>Delete</Link>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    )
}