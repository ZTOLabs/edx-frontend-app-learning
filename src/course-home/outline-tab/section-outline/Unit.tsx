import React from 'react';
import { useContextId } from 'data/hooks';
import { File05 } from '@untitledui/icons';
import { useNavigate } from 'react-router';
import { useModel } from '../../../generic/model-store';
import CheckCircle from './CheckCircle';
import CheckCircleComplete from './CheckCircleComplete';

interface Props {
  id: string;
  sequenceId: string;
}

const Unit: React.FC<Props> = ({ id, sequenceId }) => {
  const navigate = useNavigate();
  const courseId = useContextId();
  const {
    courseBlocks: { units },
  } = useModel('outline', courseId);
  const unit = units[id];
  const { complete, title } = unit;

  return (
    <div className="tw-flex tw-gap-2 tw-items-center">
      <button
        type="button"
        className="tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center tw-border-0 tw-bg-transparent tw-p-1 !tw-cursor-default"
      >
        {complete ? <CheckCircleComplete /> : <CheckCircle />}
      </button>
      <button
        type="button"
        className="tw-w-fit tw-h-6 tw-flex tw-items-center tw-justify-center tw-border-0 tw-bg-transparent tw-p-1 tw-cursor-pointer tw-gap-2"
        onClick={() => navigate(`/course/${courseId}/${sequenceId}/${id}`)}
      >
        <File05 className="tw-text-brand-500 tw-size-4" />
        <span className="tw-text-gray-700 tw-font-semibold tw-text-sm tw-break-words tw-wrap-anywhere tw-hyphens-auto tw-text-start">{title}</span>
      </button>
    </div>
  );
};

export default Unit;
