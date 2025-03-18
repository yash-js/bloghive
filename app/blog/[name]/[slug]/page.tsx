import RenderArticle from "@/app/_components/dashboard/RenderArticle";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JSONContent } from "novel";


async function getData(slug: string) {
    const data = await prisma.post.findUnique({
        where: {
            slug
        },
        select: {
            createdAt: true,
            articleContent: true,
            title: true,
            smallDescription: true,
            image: true,
        }
    })

    if (!data) {
        return notFound()
    }

    return data

}

async function SlugPage({ params }: { params: { slug: string, name: string } }) {

    const data = await getData(params.slug)

    return (
        <>
            <div className="flex items-center gap-x-2 pt-10 pb-5">
                <Button variant={'outline'} size={'icon'} asChild className={'mr-3'}>
                    <Link href={`/blog/${params.name}`}>
                        <ArrowLeft className="size-4" />
                    </Link>
                </Button>
                <h1 className="text-lg font-light">Go Back</h1>
            </div>

            <div className="flex flex-col items-center justify-center mb-10">
                <div className="m-auto w-full text-center md:w-7/12">
                    <p className="m-auto my-5 w-10/12 text-sm font-light md:text-base">
                        {Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(data.createdAt)}</p>
                    <h1 className="mb-5 text-3xl font-bold md:text-6xl tracking-tight">{data.title}</h1>
                    <p className="m-auto w-10/12 text-muted-foreground line-clamp-3">{data.smallDescription}</p>
                </div>
            </div>


            <div className="relative m-auto mb-10 h-80 w-full max-w-lg overflow-hidden md:mb-20 md:h-[450px] md:w-5/6 md:rounded-2xl lg:w-2/3">
                <Image
                    src={data.image ?? ''}
                    alt={data.title}
                    width={1200}
                    height={630}
                    priority
                    className="h-full w-full object-cover"
                />
            </div>

            <RenderArticle json={data?.articleContent as JSONContent} />
        </>
    );
}

export default SlugPage;