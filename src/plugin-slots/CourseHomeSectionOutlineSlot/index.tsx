import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import Section from '@src/course-home/outline-tab/section-outline/Section';

interface Props {
  expandAll: boolean;
  sections: object;
  sectionIds: string[];
}

const CourseHomeSectionOutlineSlot: React.FC<Props> = ({
  expandAll, sections, sectionIds,
}) => (
  <div className="tw-flex tw-flex-col tw-gap-4 tw-mb-4">
    {sectionIds.map((sectionId) => (
      <Section
        key={sectionId}
        defaultOpen={sections[sectionId].resumeBlock}
        expand={expandAll}
        section={sections[sectionId]}
      />
    ))}
  </div>
);

export default CourseHomeSectionOutlineSlot;
