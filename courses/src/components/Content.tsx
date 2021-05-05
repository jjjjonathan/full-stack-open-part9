import React from 'react';
import { CoursePart } from '../App';
import Part from './Part';

const Content = ({ parts }: { parts: Array<CoursePart> }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </div>
);

export default Content;
