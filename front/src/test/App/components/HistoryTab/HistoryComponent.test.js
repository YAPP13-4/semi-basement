import React from 'react';
import { shallow, mount } from 'enzyme';
import { historyMockData } from '../../../mockData';
import { HistoryTab } from 'src/App/components/HistoryTab/HistoryTab.js';

describe('components/HistoryTab/HistoryComponent', () => {
  // let component = null;
  it('render.HistoryComponent [Render Correctly]', () => {
    const mockHistorySong = [historyMockData];
    let enzymeWrapper = shallow(<HistoryTab historySong={mockHistorySong} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });
});
