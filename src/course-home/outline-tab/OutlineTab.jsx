import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, Collapsible } from '@openedx/paragon';
import { CourseOutlineTabNotificationsSlot } from '../../plugin-slots/CourseOutlineTabNotificationsSlot';
import { AlertList } from '../../generic/user-messages';

import CourseDates from './widgets/CourseDates';
import CourseHandouts from './widgets/CourseHandouts';
import StartOrResumeCourseCard from './widgets/StartOrResumeCourseCard';
import WeeklyLearningGoalCard from './widgets/WeeklyLearningGoalCard';
import CourseTools from './widgets/CourseTools';
import { fetchOutlineTab } from '../data';
import messages from './messages';
import ShiftDatesAlert from '../suggested-schedule-messaging/ShiftDatesAlert';
import UpgradeToShiftDatesAlert from '../suggested-schedule-messaging/UpgradeToShiftDatesAlert';
import useCertificateAvailableAlert from './alerts/certificate-status-alert';
import useCourseEndAlert from './alerts/course-end-alert';
import useCourseStartAlert from '../../alerts/course-start-alert';
import usePrivateCourseAlert from './alerts/private-course-alert';
import useScheduledContentAlert from './alerts/scheduled-content-alert';
import { useModel } from '../../generic/model-store';
import WelcomeMessage from './widgets/WelcomeMessage';
import ProctoringInfoPanel from './widgets/ProctoringInfoPanel';
import AccountActivationAlert from '../../alerts/logistration-alert/AccountActivationAlert';
import CourseHomeSectionOutlineSlot from '../../plugin-slots/CourseHomeSectionOutlineSlot';
import CourseSidebar from "./CourseSidebar";
import classNames from "classnames";
import background from "../../assets/images/main-content-background.png";

const OutlineTab = () => {
  const intl = useIntl();
  const { courseId, proctoringPanelStatus } = useSelector(
    (state) => state.courseHome
  );

  const { isSelfPaced, org, title } = useModel("courseHomeMeta", courseId);

  const expandButtonRef = useRef();

  const {
    courseBlocks: { courses = {}, sections = {} },
    courseGoals: { selectedGoal, weeklyLearningGoalEnabled },
    datesWidget: { courseDateBlocks = [] },
    enableProctoredExams,
  } = useModel("outline", courseId);

  const [expandAll, setExpandAll] = useState(false);
  const navigate = useNavigate();

  const eventProperties = {
    org_key: org,
    courserun_key: courseId,
  };

  // Below the course title alerts (appearing in the order listed here)
  const courseStartAlert = useCourseStartAlert(courseId);
  const courseEndAlert = useCourseEndAlert(courseId);
  const certificateAvailableAlert = useCertificateAvailableAlert(courseId);
  const privateCourseAlert = usePrivateCourseAlert(courseId);
  const scheduledContentAlert = useScheduledContentAlert(courseId);

  const rootCourseId = courses && Object.keys(courses)[0];

  const hasDeadlines =
    courseDateBlocks &&
    courseDateBlocks.some((x) => x.dateType === "assignment-due-date");

  const logUpgradeToShiftDatesLinkClick = () => {
    sendTrackEvent("edx.bi.ecommerce.upsell_links_clicked", {
      ...eventProperties,
      linkCategory: "personalized_learner_schedules",
      linkName: "course_home_upgrade_shift_dates",
      linkType: "button",
      pageName: "course_home",
    });
  };

  const isEnterpriseUser = () => {
    const authenticatedUser = getAuthenticatedUser();
    const userRoleNames = authenticatedUser
      ? authenticatedUser.roles.map((role) => role.split(":")[0])
      : [];

    return userRoleNames.includes("enterprise_learner");
  };

  /** show post enrolment survey to only B2C learners */
  const learnerType = isEnterpriseUser() ? "enterprise_learner" : "b2c_learner";

  const location = useLocation();

  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const startCourse = currentParams.get("start_course");
    if (startCourse === "1") {
      sendTrackEvent("enrollment.email.clicked.startcourse", {});

      // Deleting the course_start query param as it only needs to be set once
      // whenever passed in query params.
      currentParams.delete("start_course");
      navigate({
        pathname: location.pathname,
        search: `?${currentParams.toString()}`,
        replace: true,
      });
    }
  }, [location.search]);

  return (
    <>
      <div className="tw-flex tw-h-full tw-flex-1">
        <CourseSidebar />
        <div className="tw-flex-1 tw-p-3 tw-h-full tw-relative">
          <div
            className="tw-absolute tw-inset-3 tw-opacity-30 tw-scale-x-[-1] tw-z-0"
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "20px",
            }}
          />
          <div
            className={classNames(
              "tw-relative tw-z-10 tw-h-full",
              "tw-p-8 tw-pb-0 tw-flex-1",
              "tw-border tw-border-white tw-border-solid",
              "tw-rounded-[20px]",
              "tw-flex tw-flex-col tw-gap-8 tw-overflow-y-auto"
            )}
          >
            <span className="tw-text-2xl tw-font-semibold tw-text-gray-900">{intl.formatMessage(messages.outlineTabTitle)}</span>
            <CourseHomeSectionOutlineSlot sections={sections} sectionIds={courses[rootCourseId].sectionIds} expandAll={expandAll} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OutlineTab;
