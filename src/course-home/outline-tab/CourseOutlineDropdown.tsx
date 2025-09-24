import { useState, useEffect } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { ChevronDown, ChevronRight } from '@untitledui/icons';
import { Collapsible } from '@openedx/paragon';

import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router';
import { useModel } from '../../generic/model-store';
import CourseOutlineSection from './CourseOutlineSection';

const CourseOutlineDropdown = ({ courseId }: { courseId: string }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [isOutlineExpanded, setIsOutlineExpanded] = useState(false);
  const { pathname } = useLocation();

  // Auto-expand outline if we're on a unit page (not home)
  useEffect(() => {
    const isOnUnitPage = pathname.includes(`/course/${courseId}/`)
      && !pathname.endsWith('/home')
      && pathname !== `/course/${courseId}`;
    if (isOnUnitPage) {
      setIsOutlineExpanded(true);
    }
  }, [pathname, courseId]);

  const { tabs } = useModel('courseHomeMeta', courseId);
  const tabsWithoutCourses = tabs.filter((tab) => !['outline', 'courseware'].includes(tab.slug));

  const {
    courseBlocks: { courses, sections },
  } = useModel('outline', courseId);

  const rootCourseId = courses && Object.keys(courses)[0];
  const sectionIds = rootCourseId ? courses[rootCourseId].sectionIds : [];

  // Check if we're on the course home page
  // Example: /course/course-v1:MITx+CS102+2025_T1/home -> true
  // Example: /course/course-v1:MITx+CS102+2025_T1/sequenceId/unitId -> false
  const isHomeActive = pathname.endsWith('/home') || pathname === `/course/${courseId}`;

  const handleTabClick = (tab) => {
    if (tab && tab.url && tab.url !== '#') {
      // All tabs in tabsWithoutCourses are external tabs (Progress, Dates, Discussion, etc.)
      // that need full page navigation to different microfrontends
      window.location.href = tab.url;
    }
  };

  const handleHomeClick = () => {
    navigate(`/course/${courseId}/home`);
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-1">
      {/* Home Section */}
      <button
        type="button"
        className={classNames(
          'tw-w-full tw-py-[10px] tw-px-3 tw-h-[40px] tw-flex tw-items-center tw-text-left tw-transition-colors tw-border-0 tw-bg-transparent tw-text-gray-700 tw-rounded-[8px]',
          {
            '!tw-bg-brand-100 !tw-text-brand-700': isHomeActive,
          },
        )}
        onClick={handleHomeClick}
      >
        <span className="tw-text-sm tw-font-medium">
          {intl.formatMessage({
            id: 'course.navigation.home',
            defaultMessage: 'Home',
          })}
        </span>
      </button>

      {/* Outline Section */}
      <Collapsible.Advanced
        open={isOutlineExpanded}
        onToggle={() => setIsOutlineExpanded(!isOutlineExpanded)}
      >
        <Collapsible.Trigger
          className={classNames(
            'tw-w-full tw-py-[10px] tw-px-3 tw-h-[40px] tw-flex tw-items-center tw-text-left tw-transition-colors tw-border-0 tw-bg-transparent tw-text-gray-700 tw-rounded-[8px]',
            isOutlineExpanded && 'tw-mb-1',
          )}
        >
          <div className="tw-flex tw-items-center tw-justify-between tw-flex-1">
            <span className="tw-text-sm tw-font-medium">
              {intl.formatMessage({
                id: 'course.navigation.outline',
                defaultMessage: 'Outline',
              })}
            </span>
            <Collapsible.Visible whenClosed>
              <ChevronRight className="tw-size-5 tw-text-gray-600" />
            </Collapsible.Visible>
            <Collapsible.Visible whenOpen>
              <ChevronDown className="tw-size-5 tw-text-gray-600" />
            </Collapsible.Visible>
          </div>
        </Collapsible.Trigger>
        <Collapsible.Body>
          <div className="tw-flex tw-flex-col tw-gap-1">
            {sectionIds.map((sectionId, index) => {
              const section = sections[sectionId];
              if (!section) {
                return null;
              }

              return (
                <CourseOutlineSection
                  key={sectionId}
                  section={section}
                  courseId={courseId}
                  index={index}
                />
              );
            })}
            {isOutlineExpanded && <div className="tw-bg-gray-200 tw-h-[1px]" />}
          </div>
        </Collapsible.Body>
      </Collapsible.Advanced>

      {tabsWithoutCourses.map((tab) => (
        <button
          key={tab.slug}
          type="button"
          className={classNames(
            'tw-w-full tw-py-[10px] tw-px-3 tw-h-[40px] tw-flex tw-items-center tw-text-left tw-transition-colors tw-border-0 tw-bg-transparent tw-text-gray-700 tw-rounded-[8px]',
            {
              '!tw-bg-brand-100 !tw-text-brand-700': pathname.endsWith(`/${tab.slug}`),
            },
          )}
          onClick={() => handleTabClick(tab)}
        >
          <span className="tw-text-sm tw-font-medium">{tab.title}</span>
        </button>
      ))}
    </div>
  );
};

export default CourseOutlineDropdown;
