import { DeleteSite } from '@/actions';
import { UploadImageForm } from '@/app/_components/dashboard/forms/UploadImageForm';
import SubmitButtons from '@/app/_components/dashboard/SubmitButtons';
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

function SettingsPage({ params }: { params: { siteId: string } }) {
    return (
        <>
            <div className="flex items-center gap-x-2">
                <Button variant={'outline'} size={'icon'} asChild>
                    <Link href={`/dashboard/sites/${params?.siteId}`}>
                        <ChevronLeft className="size-4" />
                    </Link>
                </Button>
                <h3 className="text-xl font-semibold">Go Back</h3>
            </div>
            <UploadImageForm siteId={params?.siteId} />
            <Card className="border-red-500 bg-red-500/10">
                <CardHeader>
                    <CardTitle className="text-red-500">
                        Danger
                    </CardTitle>
                    <CardDescription>
                        This will delete your site and all article associated with it. Click button below to delete everything.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <form action={DeleteSite}>
                        <input type="hidden" name="siteId" value={params?.siteId} />
                        <SubmitButtons variant={'destructive'} text="Delete Site" />
                    </form>
                </CardFooter>
            </Card>
        </>
    );
}

export default SettingsPage;