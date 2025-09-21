import { useState } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Collapsible } from '@openedx/paragon';
import { LayoutLeft } from '@untitledui/icons';

import { useModel } from '../../generic/model-store';
import { useContextId } from '../../data/hooks';
import CourseOutlineDropdown from './CourseOutlineDropdown';
import Tag from './Tag';
import messages from './messages';
import classNames from "classnames";

const CourseSidebar = () => {
  const intl = useIntl();
  const courseId = useContextId();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const courseHomeMeta = useModel("courseHomeMeta", courseId);
  const outline = useModel("outline", courseId);
  const progress = useModel("progress", courseId);

  console.log({ progress });

  const {
    completeCount = 0,
    incompleteCount = 0,
    lockedCount = 0,
  } = progress.completionSummary || {};
  const numTotalUnits = completeCount + incompleteCount + lockedCount;
  const completePercentage = completeCount
    ? Number(((completeCount / numTotalUnits) * 100).toFixed(0))
    : 0;

  const courseEndDate = outline?.datesWidget?.courseWidgetBlocks?.find(
    (block) => block?.dateType === "course-end-date"
  )?.date;
  const dueDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(courseEndDate);
  console.log({ courseHomeMeta, outline });

  const { title, org, number } = courseHomeMeta;

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Extract run from course ID (e.g., "course-v1:MITx+CS102+2025_T1" -> "2025_T1")
  const getCourseRun = (courseId) => {
    if (!courseId) {
      return null;
    }
    const parts = courseId.split("+");
    return parts[parts.length - 1];
  };

  const chips = [org, number, getCourseRun(courseId)];

  return (
    <div
      className={classNames(
        "tw-h-screen tw-overflow-y-hidden tw-bg-brand-25 tw-border-0 tw-border-l tw-border-solid tw-flex tw-flex-col tw-border-l-gray-200 tw-transition-all tw-duration-300 tw-ease-in-out",
        isSidebarOpen ? "tw-w-64" : "tw-w-8"
      )}
    >
      <Collapsible
        open={isSidebarOpen}
        onToggle={handleToggleSidebar}
        styling=""
        iconWhenClosed=""
        iconWhenOpen=""
        title={
          <div
            className={classNames(
              "tw-py-6 tw-flex tw-flex-col tw-gap-3",
              isSidebarOpen ? "tw-px-4" : "tw-px-0 !tw-pl-2"
            )}
          >
            <div className="tw-flex tw-flex-row">
              <div className="tw-flex-1 tw-overflow-hidden">
                <img
                  className={classNames(
                    "tw-w-24 tw-h-16 tw-rounded-[8px] tw-transition-all tw-duration-300 tw-ease-in-out",
                    isSidebarOpen
                      ? "tw-opacity-100 tw-scale-100"
                      : "tw-opacity-0 tw-scale-95"
                  )}
                  src="https://placehold.co/600x400"
                  alt="Course Thumbnail"
                />
              </div>
              <div className="tw-size-6 tw-flex tw-items-center tw-justify-center tw-cursor-pointer">
                <LayoutLeft className="tw-size-4 tw-text-gray-600" />
              </div>
            </div>
            <div
              className={classNames(
                "tw-flex tw-flex-col tw-gap-3 tw-transition-all tw-duration-300 tw-ease-in-out",
                isSidebarOpen
                  ? "tw-opacity-100 tw-max-h-96"
                  : "tw-opacity-0 tw-max-h-0 tw-overflow-hidden"
              )}
            >
              <div className="tw-flex tw-flex-col tw-gap-1">
                <div className="tw-flex tw-flex-row tw-gap-1">
                  {chips.slice(0, 2).map((value) => {
                    if (value) {
                      return <Tag key={value} tagName={value} />;
                    }
                    return null;
                  })}
                </div>
                {chips[2] && (
                  <div className="tw-flex tw-flex-row tw-gap-1">
                    <Tag tagName={chips[2]} />
                  </div>
                )}
              </div>
              <div className="tw-flex tw-flex-col tw-gap-1">
                <div className="tw-self-stretch tw-justify-start tw-text-gray-900 tw-text-sm tw-font-semibold tw-leading-tight">
                  {title}
                </div>
                {dueDate && (
                  <div className="tw-text-gray-500 tw-text-xs">
                    {intl.formatMessage(messages.dueDate, { dueDate })}
                  </div>
                )}
              </div>
              <div className="tw-flex tw-flex-col tw-gap-2">
                <div className="tw-flex tw-flex-row tw-gap-2">
                  <span className="tw-text-gray-700 tw-text-xs tw-font-medium">
                    {intl.formatMessage(messages.progress, {
                      progress: completePercentage,
                    })}
                  </span>
                </div>
                <div className="tw-w-full tw-h-[6px] tw-bg-brand-100 tw-rounded-[100px] tw-overflow-hidden">
                  <div
                    className="tw-h-full tw-rounded-full tw-transition-all tw-duration-300"
                    style={{
                      width: `${completePercentage}%`,
                      background:
                        "linear-gradient(0deg, #009EFD -30.65%, #2AF598 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        }
      >
        <Collapsible.Body className="tw-px-4">
          <div>
            <CourseOutlineDropdown courseId={courseId as string} />
          </div>
        </Collapsible.Body>
      </Collapsible>
    </div>
  );
};

export default CourseSidebar;
