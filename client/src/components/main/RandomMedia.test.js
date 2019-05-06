import React from "react";
import { shallow } from "enzyme";
import RandomMedia from "./RandomMedia";
import axios from "axios";

describe('RandomMedia', () => {
  it('exists', () => {
    const wrapper = shallow(<RandomMedia />)

    expect(wrapper.exists()).toEqual(true);

  })
})