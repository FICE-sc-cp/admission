import NoContractPopUp from "@/components/student-profile-page/NoContractPopUp";
import NoPriorityPopUp from "@/components/student-profile-page/NoPriorityPopUp";
import StudentPersonalDataBlock from "@/components/student-profile-page/StudentPersonalDataBlock";
import StudentPrioritiesBlock from "@/components/student-profile-page/StudentPrioritiesBlock";
import StudentRepresentativeBlock from "@/components/student-profile-page/StudentRepresentativeBlock";
import StudentPayerBlock from '../../components/student-profile-page/StudentPayerBlock';

export default function Dashboard() {
    return (
        <>
            <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col min-w-[50%]">
                    <StudentPersonalDataBlock/>
                    <StudentPrioritiesBlock/>
                </div>
                {/*<NoContractPopUp />*/}
                {/*<NoPriorityPopUp />*/}
                <div className="flex flex-col min-w-[50%]">
                    <StudentRepresentativeBlock/>
                    <StudentPayerBlock/>
                </div>
            </div>
        </>
    );
}
