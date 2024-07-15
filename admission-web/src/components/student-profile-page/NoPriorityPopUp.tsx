import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import ProfileHeader from "@/app/(application)/_components/ProfileHeader";

export default function NoPriorityPopUp() {
    return (
            <div className="flex flex-col m-5">
                <ProfileHeader className="hidden sm:flex" label="Пріоритети освітніх програм"/>
                <Card
                    className="flex flex-col sm:flex-row justify-center items-center max-w-[600px] mx-auto mt-3 sm:ml-0 bg-violet-50 border-violet-300 drop-shadow-lg">
                    <CardHeader
                        className="font-light whitespace-nowrap text-lg sm:font-normal sm:text-xl lg:font-normal lg:text-2xl">
                        Заповніть пріоритетну заяву
                    </CardHeader>
                    <CardFooter className="sm:p-3">
                        <Button asChild>
                            <Link href="/priority">Вибір пріоритету</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
    );
}