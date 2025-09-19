import { Bell01 } from '@untitledui/icons';
import React, { useState } from 'react';
import Bell01SolidIcon from 'shared/icons/Bell01SolidIcon';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../../../../ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../../../ui/sidebar';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarMenu className="!tw-w-auto tw-list-none !tw-p-0">
      <SidebarMenuItem className={`tw-flex tw-items-center tw-justify-center tw-overflow-hidden tw-rounded-xl ${isOpen ? 'tw-bg-brand-100' : 'hover:tw-bg-brand-100'}`}>
        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="!tw-bg-inherit !tw-p-0 tw-border-none tw-w-full tw-flex tw-items-center tw-justify-center"
            >
              {isOpen ? <Bell01SolidIcon className="!tw-size-5 tw-text-brand-600" /> : <Bell01 className="!tw-size-5 tw-text-gray-500" />}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="tw-w-(--radix-dropdown-menu-trigger-width) tw-min-w-56 tw-rounded-lg tw-bg-white"
            side="right"
            align="end"
            sideOffset={4}
          >
            {/* TODO: Add Notification Items */}
            Notification
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default Notification;
