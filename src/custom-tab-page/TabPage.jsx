import { useIntl } from "@edx/frontend-platform/i18n";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { Spinner, Toast } from "@openedx/paragon";
import { useModel } from "../generic/model-store";
import { getAccessDeniedRedirectUrl } from "../shared/access";

import { setCallToActionToast } from "../course-home/data/slice";
import genericMessages from "../generic/messages";
import LaunchCourseHomeTourButton from "../product-tours/newUserCourseHomeTour/LaunchCourseHomeTourButton";
import LoadedTabPage from "./LoadedTabPage";
import messages from "./messages";

const TabPage = (props) => {
  const intl = useIntl();
  const { activeTabSlug, courseId, courseStatus, metadataModel } = props;
  const { toastBodyLink, toastBodyText, toastHeader } = useSelector(
    (state) => state.courseHome
  );
  const dispatch = useDispatch();
  const { courseAccess, number, org, start, title } = useModel(
    "courseHomeMeta",
    courseId
  );

  if (courseStatus === "denied") {
    const redirectUrl = getAccessDeniedRedirectUrl(
      courseId,
      activeTabSlug,
      courseAccess,
      start
    );
    if (redirectUrl) {
      return <Navigate to={redirectUrl} replace />;
    }
  }

  return (
    <>
      {["loaded", "denied"].includes(courseStatus) && (
        <>
          <Toast
            action={
              toastBodyText
                ? {
                    label: toastBodyText,
                    href: toastBodyLink,
                  }
                : null
            }
            closeLabel={intl.formatMessage(genericMessages.close)}
            onClose={() =>
              dispatch(
                setCallToActionToast({
                  header: "",
                  link: null,
                  link_text: null,
                })
              )
            }
            show={!!toastHeader}
          >
            {toastHeader}
          </Toast>
          {metadataModel === "courseHomeMeta" && (
            <LaunchCourseHomeTourButton srOnly />
          )}
        </>
      )}

      {courseStatus === "loading" && (
        <div className="tw-flex tw-h-full tw-flex-1 tw-relative">
          <div className="tw-absolute tw-top-1/2 tw-left-1/2">
            <Spinner animation="border" variant="primary" />
          </div>
        </div>
      )}

      {["loaded", "denied"].includes(courseStatus) && (
        <LoadedTabPage {...props} />
      )}

      {/* courseStatus 'failed' and any other unexpected course status. */}
      {!["loading", "loaded", "denied"].includes(courseStatus) && (
        <p className="text-center py-5 mx-auto" style={{ maxWidth: "30em" }}>
          {intl.formatMessage(messages.failure)}
        </p>
      )}
    </>
  );
};

TabPage.defaultProps = {
  courseId: null,
  unitId: null,
};

TabPage.propTypes = {
  activeTabSlug: PropTypes.string.isRequired,
  courseId: PropTypes.string,
  courseStatus: PropTypes.string.isRequired,
  metadataModel: PropTypes.string.isRequired,
  unitId: PropTypes.string,
};

export default TabPage;
