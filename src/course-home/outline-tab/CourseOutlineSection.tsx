import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Collapsible } from '@openedx/paragon';

import { ChevronDown, ChevronRight } from '@untitledui/icons';
import classNames from 'classnames';
import { useModel } from '../../generic/model-store';
import CourseOutlineUnit from './CourseOutlineUnit';

interface CourseOutlineSectionProps {
  section: { sequenceIds: string[]; title: string };
  courseId: string;
  index: number;
}

const CourseOutlineSection = ({ section, courseId, index }: CourseOutlineSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  // We don't need useParams here since we're using pathname directly
  const { pathname } = useLocation();

  const {
    courseBlocks: {
      sequences,
      units,
    },
  } = useModel('outline', courseId);

  // Check if any unit in this section is active
  const isActiveSection = section.sequenceIds?.some(seqId => {
    const sequence = sequences[seqId];
    if (!sequence) {
      return false;
    }

    // Check if any unit in this sequence is active
    return sequence.unitIds?.some(uId => {
      return pathname.includes(`/${courseId}/${seqId}/${uId}`);
    });
  });

  // Expand by default if this section contains the active unit
  useEffect(() => {
    if (isActiveSection) {
      setIsCollapsed(false);
    }
  }, [isActiveSection]);

  if (!section || !section.sequenceIds) { return null; }

  return (
    <Collapsible.Advanced
      open={!isCollapsed}
      onToggle={() => setIsCollapsed(!isCollapsed)}
    >
      <Collapsible.Trigger
        className={classNames(
          'tw-w-full tw-flex-1 tw-flex tw-items-center tw-gap-2 tw-py-[10px] tw-px-3',
          !isCollapsed && 'tw-mb-1',
        )}
      >
        <span className="tw-text-xs tw-font-bold tw-text-gray-700 tw-flex-1">
          {index + 1}. {section.title}
        </span>
        <Collapsible.Visible whenClosed>
          <ChevronRight className="tw-size-5 tw-text-gray-600" />
        </Collapsible.Visible>
        <Collapsible.Visible whenOpen>
          <ChevronDown className="tw-size-5 tw-text-gray-600" />
        </Collapsible.Visible>
      </Collapsible.Trigger>
      <Collapsible.Body>
        <div className="tw-flex tw-flex-col tw-gap-1">
          {section.sequenceIds.map((seqId) => {
            const sequence = sequences[seqId];

            if (!sequence) { return null; }

            return sequence.unitIds.map((uId) => {
              const unit = units[uId];
              if (!unit) { return null; }

              return <CourseOutlineUnit unit={unit} courseId={courseId} sequenceId={seqId} key={unit.id} />;
            });
          })}
        </div>
      </Collapsible.Body>
    </Collapsible.Advanced>
  );
};

export default CourseOutlineSection;
