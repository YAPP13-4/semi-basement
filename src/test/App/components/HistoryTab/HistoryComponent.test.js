import React from 'react';
import { shallow, mount } from 'enzyme';
import { historyMockData } from '../../../mockData';
import { HistoryTab } from 'src/App/components/HistoryTab/HistoryTab.js';

describe('components/HistoryTab', () => {
  // let component = null;
  it('render.HistoryTab [Render Correctly]', () => {
    const mockHistoryMusic = [historyMockData];
    let enzymeWrapper = shallow(<HistoryTab historyMusic={mockHistoryMusic} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });
  //Question : hitory -> fetchMusic 흐름도 여기서 테스트 ?
  /*
  it('render.HistoryComponent [Render Correctly]', () => {
    const mockHistoryMusic = [historyMockData];
    let enzymeWrapper = shallow(<HistoryTab historyMusic={mockHistoryMusic} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });*/
});
