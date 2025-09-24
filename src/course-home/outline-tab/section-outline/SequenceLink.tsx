import React from 'react';

import Unit from './Unit';

interface Props {
  sequence: {
    unitIds: string[];
    id: string;
  }
}

const SequenceLink: React.FC<Props> = ({
  sequence,
}) => {
  const {
    unitIds,
    id,
  } = sequence;

  return (
    <div className="tw-flex tw-flex-col tw-pl-8 tw-gap-6">
      {unitIds.map((unitId) => (
        <Unit key={unitId} id={unitId} sequenceId={id} />
      ))}
    </div>
  );
};

export default SequenceLink;
