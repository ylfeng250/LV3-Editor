import React from 'react';
import { shallow } from 'enzyme';
import LV3Editor from '../src/index';
import '../src/main.scss';

it('renders', () => {
  const wrapper = shallow(<LV3Editor />);
  expect(wrapper.find('.LV3Editor').length).toBe(1);
});
