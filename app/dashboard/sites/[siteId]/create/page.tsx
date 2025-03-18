'use client'

import { CreatePostAction } from "@/actions";
import EditorWrapper from "@/app/_components/dashboard/EditorWrapper";
import ErrorMsg from "@/components/error-msg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { postSchema } from "@/lib/zodSchema";
import { UploadDropzone } from "@/utils/uploadthing";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ArrowLeft, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { JSONContent } from "novel";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import slugify from 'react-slugify'
import SubmitButtons from "@/app/_components/dashboard/SubmitButtons";

export default function CreateArticle() {
    const params = useParams<{ siteId: string }>()
    const [imageUrl, setImageUrl] = useState<undefined | string>(undefined)
    const [value, setValue] = useState<JSONContent | undefined>(undefined)
    const [title, setTitle] = useState<string | undefined>(undefined)
    const [slug, setSlug] = useState<string | undefined>(undefined)
    const [lastResult, action] = useActionState(CreatePostAction, undefined)
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: postSchema
            })
        },

        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput'
    })

    const handleSlugGeneration = () => {
        const titleInput = title;
        if (!titleInput) {
            return toast.error('Please enter a title');
        }

        setSlug(slugify(titleInput))
        toast.success('Slug has been generated');
    }

    return (
        <>
            <div className="flex items-center">
                <Button size={'icon'} variant={'outline'} className="mr-3" asChild>
                    <Link href={`/dashboard/sites/${params.siteId}`}>
                        <ArrowLeft className="size-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold">
                    Create Article
                </h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Article Details
                    </CardTitle>
                    <CardDescription>
                        Create your article here and publish it to your site.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id={form.id} onSubmit={form.onSubmit} action={action} className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <input type="hidden" name="siteId" value={params.siteId} />
                            <Label>
                                Title
                            </Label>
                            <Input
                                key={fields.title.key}
                                name={fields.title.name}
                                defaultValue={fields.title.initialValue}
                                placeholder="Enter title"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                            <ErrorMsg errorMsg={fields.title.errors} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Slug</Label>
                            <Input
                                key={fields.slug.key}
                                name={fields.slug.name}
                                defaultValue={fields.slug.initialValue}
                                placeholder="Article Slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                            />
                            <Button onClick={handleSlugGeneration} className="w-fit cursor-pointer" variant={'secondary'} type='button'>
                                <Atom className="size-4 mr-2" />
                                Generate Slug
                            </Button>
                            <ErrorMsg errorMsg={fields.slug.errors} />
                        </div>

                        <div className="grid gap-2">
                            <Label>
                                Small Description
                            </Label>
                            <Textarea
                                key={fields.smallDescription.key}
                                name={fields.smallDescription.name}
                                defaultValue={fields.smallDescription.initialValue}
                                placeholder="Enter small description for your article..."
                                className="h-32 resize-none"
                            />
                            <ErrorMsg errorMsg={fields.smallDescription.errors} />
                        </div>

                        <div className="grid gap-2">
                            <Label>
                                Cover Image
                            </Label>
                            <Input
                                type="hidden"
                                name={fields.image.name}
                                key={fields.image.key}
                                defaultValue={fields.image.initialValue}
                                value={imageUrl}
                            />
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt="Uploaded Image"
                                    width={200}
                                    height={200}
                                    className="object-cover w-[200px] h-[200px] rounded-lg"

                                />
                            ) : (
                                <UploadDropzone
                                    endpoint={'imageUploader'}
                                    onClientUploadComplete={
                                        (res) => {
                                            // Do something with the response
                                            setImageUrl(res?.[0].url)
                                            toast.success('Image uploaded successfully')
                                        }}
                                    onUploadError={() => {
                                        toast.error("Failed to upload image")
                                    }}
                                />
                            )}
                            <ErrorMsg errorMsg={fields.image.errors} />
                        </div>

                        <div className="grid gap-2">
                            <Label>
                                Article Content
                            </Label>
                            <Input
                                type="hidden"
                                name={fields.articleContent.name}
                                key={fields.articleContent.key}
                                defaultValue={fields.articleContent.initialValue}
                                value={JSON.stringify(value)}
                            />
                            <EditorWrapper
                                initialValue={value}
                                onChange={(value) => setValue(value)}
                            />
                            <ErrorMsg errorMsg={fields.articleContent.errors} />
                        </div>
                        <SubmitButtons text="Create Article" />
                    </form>
                </CardContent>
            </Card>
        </>
    )
}