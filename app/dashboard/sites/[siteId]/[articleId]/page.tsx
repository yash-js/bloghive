import { EditArticleForm } from "@/app/_components/dashboard/forms/EditArticleForm"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"


async function getData(postId: string) {
    const data = await prisma.post.findUnique({
        where: {
            id: postId
        }, select: {
            image: true,
            title: true,
            smallDescription: true,
            articleContent: true,
            slug: true,
            createdAt: true,
            id: true
        }
    })

    if (!data) {
        return notFound()
    }

    return data
}

export default async function EditRoute({ params }: { params: Promise<{ articleId: string, siteId: string }> }) {


    const data = await getData(await (await params)?.articleId)

    return (
        <div className="">
            <div className="flex items-center ">
                <Button variant={'outline'} size='icon' asChild className="mr-3">
                    <Link href={`/dashboard/sites/${(await params)?.siteId}`}>
                        <ArrowLeft
                            className="size-4"
                        />
                    </Link>
                </Button>
                <h1 className="text-2xl font-semibold">Edit Article</h1>
            </div>
            <EditArticleForm data={data} siteId={(await params)?.siteId} />
        </div>
    )
}