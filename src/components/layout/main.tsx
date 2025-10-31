import { cn } from "@/lib/utils";
import React from "react";

type MainProps = React.HTMLAttributes<HTMLElement> & {
    fixed?: boolean;
    ref?: React.Ref<HTMLElement>;
    fluid?: boolean;
}
export function Main({ fixed, className, fluid, ...props }: MainProps) {
    return (
        <main className={cn(className)} {...props} />
    )
}