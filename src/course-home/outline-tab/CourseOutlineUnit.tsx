import { File05 } from '@untitledui/icons';

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

  const navigateToUnit = (url: string) => {
    if (url && url !== '#') {
      window.location.href = url;
    }
  };

  if (!unit) { return null; }

  return (
    <button
      type="button"
      className="tw-py-[10px] tw-pl-6 tw-pr-3 tw-flex tw-gap-2 tw-border-0 tw-bg-transparent tw-w-full tw-items-center"
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
