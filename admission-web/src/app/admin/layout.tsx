import DesktopSidebarNavigation from '@/app/(application)/_components/DesktopSidebarNavigation';
import MobileNavigationHeaderAndMenu from '@/app/(application)/_components/MobileNavigationHeaderAndMenu';
import {FC} from 'react';
import {Separator} from '@/components/ui/separator';
import AvatarAndName from "@/app/(application)/_components/AvatarAndName";


interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({children}) => {
    return (
        <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
            <div className='sticky top-0 hidden h-screen border-r bg-muted/10 px-2 md:block'>
                <div className='flex h-full max-h-screen flex-col'>
                    <div className='px-4 py-3'>
                        <AvatarAndName name='Адмін' size='default' />
                    </div>

                    <Separator/>

                    <div className='py-2'>
                        <DesktopSidebarNavigation role='admin'/>
                    </div>

                    <Separator/>
                </div>
            </div>

            <div className='relative flex flex-col'>
                <MobileNavigationHeaderAndMenu role='admin' />
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
