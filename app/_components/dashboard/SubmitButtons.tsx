'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface Props {
    text: string;
    className?: string;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}


function SubmitButtons({ text, className, variant }: Props) {
    const { pending } = useFormStatus()
    return (
        <>
            {pending ? (
                <Button disabled className={cn('w-fit', className)} variant={variant}>
                    <Loader2
                        className="mr-2 size-4 animate-spin"
                    />
                    Please wait!
                </Button>

            ) : (
                <Button variant={variant} className={cn('w-fit cursor-pointer', className)} type="submit">
                    {text}
                </Button>
            )}
        </>
    );
}

export default SubmitButtons;