import React from 'react';
import { shallow, mount } from 'enzyme';
import { historyMockData } from '../../../mockData';
import { HistoryTab } from 'src/App/components/HistoryTab/HistoryTab.js';

describe('components/HistoryTab', () => {
  // let component = null;
  it('render.HistoryTab [Render Correctly]', () => {
    const mockHistorySong = [historyMockData];
    let enzymeWrapper = shallow(<HistoryTab historySong={mockHistorySong} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });
  //Question : hitory -> fetchSong 흐름도 여기서 테스트 ?
  /*
  it('render.HistoryComponent [Render Correctly]', () => {
    const mockHistorySong = [historyMockData];
    let enzymeWrapper = shallow(<HistoryTab historySong={mockHistorySong} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });*/
});
