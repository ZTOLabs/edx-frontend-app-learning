import { File05 } from '@untitledui/icons';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

interface CourseOutlineUnitProps {
  unit: {
    id: string;
    title: string;
    complete: boolean;
    url: string;
  };
}

const CourseOutlineUnit = ({ unit }: CourseOutlineUnitProps) => {
  const { title, url } = unit;
  const { pathname } = useLocation();

  // Extract slug from current URL pathname
  const getCurrentSlug = () => {
    const pathSegments = pathname.split('/');
    return pathSegments[pathSegments.length - 1] || 'home';
  };

  // Extract slug from unit URL
  const getUnitSlug = (unitUrl: string) => {
    if (unitUrl.startsWith('http')) {
      const urlObj = new URL(unitUrl);
      const pathSegments = urlObj.pathname.split('/');
      return pathSegments[pathSegments.length - 1] || 'home';
    }
    const pathSegments = unitUrl.split('/');
    return pathSegments[pathSegments.length - 1] || 'home';
  };

  const currentSlug = getCurrentSlug();
  const unitSlug = getUnitSlug(url);
  const isActive = currentSlug === unitSlug;

  const navigateToUnit = (url: string) => {
    if (url && url !== '#') {
      window.location.href = url;
    }
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
      onClick={() => navigateToUnit(url)}
    >
      <File05 className="tw-size-4 tw-text-brand-700" />
      <span className="tw-text-xs tw-font-medium tw-text-gray-700 tw-text-start">
        {title}
      </span>
    </button>
  );
};

export default CourseOutlineUnit;
