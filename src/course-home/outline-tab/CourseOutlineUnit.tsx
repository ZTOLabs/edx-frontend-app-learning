import { File05 } from '@untitledui/icons';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

interface CourseOutlineUnitProps {
  unit: {
    id: string;
    title: string;
    complete: boolean;
    url: string;
  };
  courseId: string;
  sequenceId: string;
}

const CourseOutlineUnit = ({ unit, courseId, sequenceId }: CourseOutlineUnitProps) => {
  const { title, id } = unit;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Check if this unit is currently active
  const isActive = pathname.includes(`/${courseId}/${sequenceId}/${id}`);

  const navigateToUnit = () => {
    const targetPath = `/course/${courseId}/${sequenceId}/${id}`;
    navigate(targetPath);
  };

  if (!unit) {
    return null;
  }

  return (
    <button
      type="button"
      className={classNames(
        'tw-py-[10px] tw-pl-6 tw-pr-3 tw-flex tw-gap-2 tw-border-0 tw-bg-transparent tw-w-full tw-items-center tw-rounded-[8px]',
        {
          'tw-bg-brand-100 tw-text-brand-700': isActive,
        },
      )}
      onClick={navigateToUnit}
    >
      <File05 className="tw-size-4 tw-text-brand-700" />
      <span className="tw-text-xs tw-font-medium tw-text-gray-700 tw-text-start">
        {title}
      </span>
    </button>
  );
};

export default CourseOutlineUnit;
