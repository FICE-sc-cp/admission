import { AvatarAndName } from './AvatarAndName';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { DesktopSidebarNavigationItems } from './DesktopSidebarNavigationItems';

export const DesktopSidebarNavigation = () => {
  return (
    <div className='sticky top-0 hidden max-h-[97vh] md:block md:flex-[0_0_220px] lg:flex-[0_0_280px]'>
      <div className='m-[10px] flex h-full flex-col rounded-md border border-[#CBD5E1] bg-muted/10 px-2 shadow-md shadow-[#00000040]'>
        <div className='px-4 py-3'>
          <AvatarAndName size='default' />
        </div>

        <Separator />

        <div className='py-2'>
          <DesktopSidebarNavigationItems />
        </div>

        <Separator />
      </div>
    </div>
  );
};
