import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {FilePlus2} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function NoContractPopUp() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Card
                className="flex flex-col justify-center items-center max-w-[386px] mx-auto bg-violet-50 border-violet-300 drop-shadow-lg">
                <CardHeader><FilePlus2 className="w-[48px] h-[48px]" strokeWidth="1"/></CardHeader>
                <CardContent className="font-light text-xl sm:font-normal sm:text-2xl lg:font-normal lg:text-2xl">
                    Договір ще не заповнений
                </CardContent>
                <CardFooter>
                    <Button asChild>
                        <Link href="/contract">Перейти до заповнення договору</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}