import { DeletePost } from "@/actions";
import SubmitButtons from "@/app/_components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

async function DeletePage({ params }: { params: Promise<{ siteId: string, articleId: string }> }) {
    return (
        <div className="flex flex-1 items-center justify-center">
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle>Are you absolutely sure?</CardTitle>
                    <CardDescription>
                        This action cannot be undone. This will permanently delete your article.
                    </CardDescription>

                </CardHeader>
                <CardFooter className="w-full flex justify-end gap-4">
                    <Button variant={'secondary'} asChild>
                        <Link href={`/dashboard/sites/${(await params)?.siteId}`}>
                            Cancel
                        </Link>
                    </Button>
                    <form action={DeletePost}>
                        <input type="hidden" name="articleId" value={(await params)?.articleId} />
                        <input type="hidden" name="siteId" value={(await params)?.siteId} />
                        <SubmitButtons
                            className="cursor-pointer"
                            variant={'destructive'}
                            text="Delete Article"
                        />
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}

export default DeletePage;