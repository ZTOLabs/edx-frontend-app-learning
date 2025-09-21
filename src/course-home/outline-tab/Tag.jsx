import React from 'react';

const Tag = ({ tagName }) => {
  if (!tagName) return null;

  return (
    <div className="tw-px-1.5 tw-py-0.5 tw-bg-white tw-rounded-[6px] tw-shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] tw-outline tw-outline-1 tw-outline-offset-[-1px] tw-outline-gray-300 tw-inline-flex tw-justify-start tw-items-center tw-w-fit tw-h-[18px]">
      <div className="tw-text-center tw-justify-start tw-text-slate-700 tw-text-xs tw-font-medium tw-leading-none">
        {tagName}
      </div>
    </div>
  );
};

export default Tag;
