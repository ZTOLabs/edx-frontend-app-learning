import {
  ClipboardCheck,
  HomeLine,
  Globe01,
} from '@untitledui/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarSeparator,
} from 'shared/components/ui/sidebar';
import { useLanguageSwitch } from 'shared/hooks/useLanguageSwitch';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Switch } from 'shared/components/Common/Switch';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from 'generic/messages';

import Items from './Navigation/item';
import AppLogo from '../AppLogo';
import UserProfile from './UserProfile';
import Notification from './Notification';

const getBaseRoute = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);

  return segments[0] || '';
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const intl = useIntl();

  const location = useLocation();

  const appNavigation = useMemo(() => [
    {
      title: intl.formatMessage(messages.home),
      url: '/',
      icon: HomeLine,
      isActive: false,
    },
    {
      title: intl.formatMessage(messages.courses),
      url: '/courses',
      icon: ClipboardCheck,
      isActive: false,
    },
    {
      title: intl.formatMessage(messages.discover),
      url: '/discover',
      icon: Globe01,
      isActive: false,
    },
  ], [intl]);

  const navItems = useMemo(() => {
    const currentBaseRoute = getBaseRoute(location.pathname);
    return appNavigation.map((item) => ({
      ...item,
      isActive: getBaseRoute(item.url) === currentBaseRoute,
    }));
  }, [location.pathname]);

  return (
    <Sidebar
      collapsible="icon"
      className="tw-h-screen !tw-px-3 !tw-py-6 tw-bg-brand-25"
      {...props}
    >
      <SidebarHeader className="tw-flex tw-items-center tw-justify-center !tw-pb-6">
        <AppLogo />
      </SidebarHeader>

      <SidebarContent className="tw-flex tw-flex-col tw-justify-between tw-flex-1">
        {/* Main Menu Navigation */}
        <SidebarGroup {...props} className="!tw-p-0 !tw-pt-6 tw-flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="tw-list-none tw-flex tw-flex-col tw-gap-4 tw-pl-0">
              {navItems.map((item) => (
                <Items item={item} key={item.title} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="tw-flex tw-flex-col tw-gap-4 !tw-p-0 tw-items-center">
        <SidebarMenu className="tw-list-none tw-flex tw-flex-col tw-pl-0 tw-mb-0">
          <Notification />
        </SidebarMenu>

        <SwitchContainer />

        <SidebarSeparator className="tw-mx-0 !tw-bg-brand-200" />

        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
};

const SwitchContainer = () => {
  const { language, languageOptions, toggleLanguage } = useLanguageSwitch();

  return (
    <Switch
      reverseOptions
      values={languageOptions}
      value={language}
      onValueChange={toggleLanguage}
      className="tw-bg-grayWarm-100 tw-border tw-border-solid tw-border-brand-200 tw-font-medium"
    />
  );
};

export default AppSidebar;
