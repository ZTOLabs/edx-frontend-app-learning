import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWindowSize } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';
import { ArrowLeft, ArrowRight, File05 } from '@untitledui/icons';

import { useModel } from '@src/generic/model-store';
import CourseSidebar from 'course-home/outline-tab/CourseSidebar';
import background from '../../assets/images/main-content-background.png';
import messages from './messages';
import Button from '../../shared/components/Common/Button';
import { useSequenceNavigationMetadata } from './sequence/sequence-navigation/hooks';
import { shouldCelebrateOnSectionLoad } from './celebration';
import { GetCourseExitNavigation } from './course-exit';
import Sequence from './sequence';
import SidebarProvider from './sidebar/SidebarContextProvider';
import NewSidebarProvider from './new-sidebar/SidebarContextProvider';

const Course = ({
  courseId,
  sequenceId,
  unitId,
  nextSequenceHandler,
  previousSequenceHandler,
  unitNavigationHandler,
}) => {
  const intl = useIntl();
  const course = useModel('coursewareMeta', courseId);
  const { celebrations, originalUserIsStaff } = useModel('courseHomeMeta', courseId);
  const sequence = useModel('sequences', sequenceId);
  const section = useModel('sections', sequence ? sequence.sectionId : null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isNewDiscussionSidebarViewEnabled } = useModel('courseHomeMeta', courseId);

  if (!originalUserIsStaff && pathname.startsWith('/preview')) {
    const courseUrl = pathname.replace('/preview', '');
    navigate(courseUrl, { replace: true });
  }

  const pageTitleBreadCrumbs = [sequence, section, course]
    .filter((element) => element != null)
    .map((element) => element.title);

  // Below the tabs, above the breadcrumbs alerts (appearing in the order listed here)
  const dispatch = useDispatch();

  const [, setFirstSectionCelebrationOpen] = useState(false);

  useEffect(() => {
    const celebrateFirstSection = celebrations && celebrations.firstSection;
    setFirstSectionCelebrationOpen(
      shouldCelebrateOnSectionLoad(
        courseId,
        sequenceId,
        celebrateFirstSection,
        dispatch,
        celebrations,
      ),
    );
  }, [sequenceId, celebrations, courseId, dispatch]);

  const unit = useModel('units', unitId);
  const { title } = unit;

  // Navigation metadata and handlers
  const {
    isFirstUnit,
    isLastUnit,
  } = useSequenceNavigationMetadata(sequenceId, unitId);

  const handleNavigate = (destinationUnitId) => {
    unitNavigationHandler(destinationUnitId);
  };

  const handleNext = () => {
    const nextIndex = sequence.unitIds.indexOf(unitId) + 1;
    const newUnitId = sequence.unitIds[nextIndex];
    handleNavigate(newUnitId);

    if (nextIndex >= sequence.unitIds.length) {
      nextSequenceHandler();
    }
  };

  const handlePrevious = () => {
    const previousIndex = sequence.unitIds.indexOf(unitId) - 1;
    const newUnitId = sequence.unitIds[previousIndex];
    handleNavigate(newUnitId);

    if (previousIndex < 0) {
      previousSequenceHandler();
    }
  };

  const SidebarProviderComponent = isNewDiscussionSidebarViewEnabled ? NewSidebarProvider : SidebarProvider;

  return (
    <SidebarProviderComponent courseId={courseId} unitId={unitId}>
      <Helmet>
        <title>{`${pageTitleBreadCrumbs.join(' | ')} | ${getConfig().SITE_NAME}`}</title>
      </Helmet>
      <div className="tw-h-screen tw-w-full tw-relative">
        <div className="tw-flex tw-h-full">
          <CourseSidebar courseId={courseId} />
          <div className="tw-flex-1 tw-p-3 tw-h-full tw-relative">
            <div
              className="tw-absolute tw-inset-3 tw-opacity-30 tw-scale-x-[-1] tw-z-0"
              style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '20px',
              }}
            />
            <div
              className={classNames(
                'tw-relative tw-z-10 tw-h-full',
                'tw-p-8 tw-pb-0 tw-flex-1',
                'tw-border tw-border-white tw-border-solid',
                'tw-rounded-[20px]',
                'tw-flex tw-flex-col tw-gap-8 tw-overflow-y-auto',
              )}
            >
              <div className="tw-flex tw-gap-3">
                <div className="tw-flex tw-flex-col tw-gap-2 tw-flex-1">
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <File05 className="tw-text-brand-500 tw-size-4" />
                    <span className="tw-text-gray-700 tw-text-sm tw-font-semibold">
                      {intl.formatMessage(messages.pageTitle)}
                    </span>
                  </div>
                  <span className="tw-text-xl tw-font-semibold tw-text-gray-900 tw-break-words tw-wrap-anywhere tw-hyphens-auto">
                    {title}
                  </span>
                </div>
                <div className="tw-flex tw-gap-3">
                  <Button
                    variant="secondaryGray"
                    size="sm"
                    iconBefore={ArrowLeft}
                    labels={{ default: intl.formatMessage(messages.previousButtonText) }}
                    className="!tw-h-10 !tw-w-32"
                    onClick={handlePrevious}
                    disabled={isFirstUnit}
                  />
                  <Button
                    variant="secondaryGray"
                    size="sm"
                    iconAfter={ArrowRight}
                    labels={{
                      default: intl.formatMessage(messages.nextButtonText),
                    }}
                    className="!tw-h-10 !tw-w-32"
                    onClick={handleNext}
                    disabled={isLastUnit}
                  />
                </div>
              </div>

              <div className="tw-flex-1 tw-overflow-y-auto tw-mb-8">
                <Sequence
                  unitId={unitId}
                  sequenceId={sequenceId}
                  courseId={courseId}
                  unitNavigationHandler={unitNavigationHandler}
                  nextSequenceHandler={nextSequenceHandler}
                  previousSequenceHandler={previousSequenceHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProviderComponent>
  );
};

Course.propTypes = {
  courseId: PropTypes.string,
  sequenceId: PropTypes.string,
  unitId: PropTypes.string,
  nextSequenceHandler: PropTypes.func.isRequired,
  previousSequenceHandler: PropTypes.func.isRequired,
  unitNavigationHandler: PropTypes.func.isRequired,
};

Course.defaultProps = {
  courseId: null,
  sequenceId: null,
  unitId: null,
};

const CourseWrapper = (props) => {
  // useWindowSize initially returns an undefined width intentionally at first.
  // See https://www.joshwcomeau.com/react/the-perils-of-rehydration/ for why.
  // But <Course> has some tricky window-size-dependent, session-storage-setting logic and React would yell at us if
  // we exited that component early, before hitting all the useState() calls.
  // So just skip all that until we have a window size available.
  const windowWidth = useWindowSize().width;
  if (windowWidth === undefined) {
    return null;
  }

  return <Course {...props} windowWidth={windowWidth} />;
};

export default CourseWrapper;
