import React from 'react';
import classNames from 'classnames';
import { useContextId } from 'data/hooks';
import { CheckCircle, File05 } from '@untitledui/icons';
import { useModel } from '../../../generic/model-store';

interface Props {
  id: string;
}

const Unit: React.FC<Props> = ({ id }) => {
  const courseId = useContextId();
  const {
    courseBlocks: { units },
  } = useModel('outline', courseId);
  const unit = units[id];
  const { complete, title, url } = unit;

  const navigateToUnit = (urlToNavigate: string) => {
    if (urlToNavigate) {
      window.location.href = urlToNavigate;
    }
  };

  return (
    <div className="tw-flex tw-gap-2 tw-items-center">
      <button
        type="button"
        className="tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center tw-border-0 tw-bg-transparent tw-p-1 !tw-cursor-default"
      >
        <CheckCircle className={classNames(complete ? 'tw-text-green-300' : 'tw-text-gray-300', 'tw-size-4')} />
      </button>
      <button
        type="button"
        className="tw-w-fit tw-h-6 tw-flex tw-items-center tw-justify-center tw-border-0 tw-bg-transparent tw-p-1 tw-cursor-pointer tw-gap-2"
        onClick={() => navigateToUnit(url)}
      >
        <File05 className="tw-text-brand-500 tw-size-4" />
        <span className="tw-text-gray-700 tw-font-semibold tw-text-sm tw-break-words tw-wrap-anywhere tw-hyphens-auto">{title}</span>
      </button>
    </div>
  );
};

export default Unit;
