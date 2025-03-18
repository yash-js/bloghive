'use client'

import { CreateSiteAction } from "@/actions";
import SubmitButtons from "@/app/_components/dashboard/SubmitButtons";
import ErrorMsg from "@/components/error-msg";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteSchema } from "@/lib/zodSchema";
import { useForm } from '@conform-to/react';
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
export default function NewSitePage() {
    const [lastResult, action] = useActionState(CreateSiteAction, undefined)
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: siteSchema
            })
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput'
    })
    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <Card className="w-full max-w-[450px]">
                <CardHeader>
                    <CardTitle>
                        Create site
                    </CardTitle>
                    <CardDescription>
                        Create your site here. Click the button below once you&apos;re done.
                    </CardDescription>
                </CardHeader>
                <form id={form.id} onSubmit={form.onSubmit} action={action}>
                    <CardContent>
                        <div className="flex flex-col gap-y-6 ">
                            <div className="grid gap-2">
                                <Label>
                                    Site Name
                                </Label>
                                <Input
                                    name={fields.name.name}
                                    key={fields.name.name}
                                    defaultValue={fields.name.initialValue}
                                    placeholder="Site Name"
                                />
                                <ErrorMsg errorMsg={fields.name.errors} />
                            </div>

                            <div className="grid gap-2">
                                <Label>
                                    Subdirectory
                                </Label>
                                <Input
                                    name={fields.subdirectory.name}
                                    key={fields.subdirectory.name}
                                    defaultValue={fields.subdirectory.initialValue}
                                    placeholder="Subdirectory"
                                />
                                <ErrorMsg errorMsg={fields.subdirectory.errors} />
                            </div>

                            <div className="grid gap-2">
                                <Label>
                                    Description
                                </Label>
                                <Textarea
                                    name={fields.description.name}
                                    key={fields.description.name}
                                    defaultValue={fields.description.initialValue}
                                    placeholder="Small description of your site"
                                />
                                <ErrorMsg errorMsg={fields.description.errors} />

                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="mt-5">
                        <SubmitButtons text="Create Site" />
                    </CardFooter>
                </form>

            </Card>

        </div>
    )
}