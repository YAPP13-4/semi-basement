import React from 'react';
import { shallow } from 'enzyme';
import { musicInfoMockData } from "../../../../mockData"
import ArtWorkPlay from "src/App/pages/Home/components/ArtworkPlay.js"

/*
Related issue : #134
*/
describe('pages/Home/components/ArtWorkPlay', () => {

  it('render.ArtWorkPlay [root div Name Test]', () => {
    //Given
    const musicInfo = musicInfoMockData
    const key = musicInfoMockData.id
    const component = <ArtWorkPlay musicInfo={musicInfo} key={key} onClickPlay={() => jest.fn()} />

    //When (shallow mount)
    const wrapper = shallow(component)
    const target = wrapper.find('div').first()

    //Then
    //check root div class name is ArtworkPlay to be True.
    const targetClass = 'ArtworkPlay'
    expect(target.hasClass(targetClass)).toBe(true)
  })
  it('render.ArtWorkPlay [onClickPlay test]', () => {
    //Given
    const musicInfo = musicInfoMockData
    const key = musicInfoMockData.id
    const spyFn = jest.fn()
    const component = <ArtWorkPlay musicInfo={musicInfo} key={key} onClickPlay={spyFn} />
    //When
    const wrapper = shallow(component)
    const target = wrapper.find('.ArtworkPlay-music-body-card-artwork')
    target.simulate('click')

    //Then
    expect(spyFn).toBeCalled()
  })
})
