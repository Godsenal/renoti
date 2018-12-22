import React from 'react';
import { Radio } from '.';
import entities from '../entities';
interface EntityProps {
  name: string;
  entity: string;
  handleChange: (item: string) => void;
}
const Entity: React.FunctionComponent<EntityProps> = ({
  name,
  entity,
  handleChange,
}) => (
  <div className="entity">
    <h2 className="sub_header">{name}</h2>
    <Radio
      checked={entity}
      items={entities[name]}
      handleChange={handleChange}
    />
  </div>
);
export default Entity;
