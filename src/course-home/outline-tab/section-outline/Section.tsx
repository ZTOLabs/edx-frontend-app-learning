import { Collapsible } from '@openedx/paragon';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { CheckCircle } from '@untitledui/icons';
import { useContextId } from '../../../data/hooks';
import { useModel } from '../../../generic/model-store';
import SequenceLink from './SequenceLink';

const ChevronTriangleDown = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.00014 1.00016L5.00014 5.00016L9.00014 1.00016" fill="#475467" />
    <path
      d="M9.00014 0.333496C9.26975 0.333496 9.51282 0.495887 9.61603 0.744954C9.71922 0.994071 9.66216 1.28085 9.4715 1.47152L5.4715 5.47152C5.21115 5.73187 4.78914 5.73187 4.52879 5.47152L0.52879 1.47152C0.338124 1.28085 0.281071 0.994071 0.384258 0.744954C0.487466 0.495887 0.730533 0.333496 1.00014 0.333496H9.00014ZM5.00014 4.05745L7.39077 1.66683H2.60952L5.00014 4.05745Z"
      fill="#475467"
    />
  </svg>
);

interface Props {
  defaultOpen: boolean;
  expand: boolean;
  section: {
    complete: boolean;
    sequenceIds: string[];
    title: string;
    hideFromTOC: boolean;
  };
}

const Section: React.FC<Props> = ({ defaultOpen, expand, section }) => {
  const courseId = useContextId();
  const { sequenceIds, title, complete } = section;
  const {
    courseBlocks: { sequences },
  } = useModel('outline', courseId);

  const [open, setOpen] = useState(defaultOpen);

  const sectionHasNoUnit = sequences?.[sequenceIds?.[0]]?.unitIds?.length === 0;

  useEffect(() => {
    setOpen(expand);
  }, [expand]);

  useEffect(() => {
    setOpen(defaultOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="tw-rounded-2xl tw-border tw-border-solid tw-border-white tw-bg-white/70 tw-py-6 tw-px-4">
        <Collapsible.Advanced open={open} onToggle={setOpen} className="tw-w-full">
          <div className="tw-flex tw-flex-col">
            {/* Header Section */}
            <div className={classNames('tw-flex tw-gap-2 tw-items-start')}>
              <div className="tw-flex tw-flex-col tw-gap-1 tw-flex-1">
                <div className="tw-text-gray-900 tw-text-lg tw-font-bold tw-leading-7 tw-flex tw-gap-1 tw-items-center">
                  <button
                    type="button"
                    className="tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center tw-border-0 tw-bg-transparent tw-p-1 !tw-cursor-default"
                  >
                    <CheckCircle
                      className={classNames(
                        complete ? 'tw-text-green-300' : 'tw-text-gray-300',
                        'tw-size-4',
                      )}
                    />
                  </button>
                  {sectionHasNoUnit ? (
                    <div className="tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center tw-border-0 tw-bg-transparent tw-p-1 tw-cursor-not-allowed tw-rotate-[270deg]">
                      <ChevronTriangleDown />
                    </div>
                  ) : (
                    <Collapsible.Trigger
                      className={classNames(
                        'tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center tw-border-0 tw-bg-transparent tw-p-1 tw-cursor-pointer',
                        !open && 'tw-rotate-[270deg]',
                      )}
                    >
                      <Collapsible.Visible whenClosed>
                        <ChevronTriangleDown />
                      </Collapsible.Visible>
                      <Collapsible.Visible whenOpen>
                        <ChevronTriangleDown />
                      </Collapsible.Visible>
                    </Collapsible.Trigger>
                  )}
                  <span className="tw-flex-1 tw-break-words tw-wrap-anywhere tw-hyphens-auto">
                    {title}
                  </span>
                </div>
              </div>
            </div>

            {/* Collapsible Content */}
            <Collapsible.Body>
              <div className="tw-mt-6">
                {sequenceIds.map((sequenceId) => (
                  <SequenceLink key={sequenceId} sequence={sequences[sequenceId]} />
                ))}
              </div>
            </Collapsible.Body>
          </div>
        </Collapsible.Advanced>
      </div>
    </>
  );
};

export default Section;
