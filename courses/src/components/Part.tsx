import React from 'react';
import { CoursePart } from '../App';

const Part = ({ part }: { part: CoursePart }) => {
  const body = () => {
    switch (part.type) {
      case 'normal':
        return <em>{part.description}</em>;
      case 'groupProject':
        return <span>{part.groupProjectCount}</span>;
      case 'submission':
        return (
          <span>
            <em>{part.description}</em>
            <br />
            submit to {part.exerciseSubmissionLink}
          </span>
        );
      case 'special':
        return (
          <span>
            <em>{part.description}</em>
            <br />
            required skills: {part.requirements.join(', ')}
          </span>
        );
    }
  };

  return (
    <p>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
      <br />
      {body()}
    </p>
  );
};

export default Part;
