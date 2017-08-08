import React from 'react';
import { shallow } from 'enzyme';
import preload from '../../data.json'
import Search from '../Search';
import ShowCard from '../ShowCard'

describe('Search', () => {
  it('renders correctly', () => {
    const component = shallow(<Search shows={preload.shows} />)
    expect(component).toMatchSnapshot();
  });

  it('should render correct amount of shows with no search term', () => {
    const component = shallow(<Search shows={preload.shows} />)
    expect(component.find(ShowCard).length).toEqual(preload.shows.length);
  })

  it('should render correct amount of shows based on search term', () => {
    const component = shallow(<Search shows={preload.shows} searchTerm={'game'}/>)
    const searchWord = 'black';
    component.find('input').simulate('change', {target: {value: searchWord}});
    const showCount = preload.shows.filter(show => `${show.title} ${show.description}`
      .toUpperCase().includes(searchWord.toUpperCase()))
      .map(show => <ShowCard key={show.imdbID} {...show} />).length
    expect(component.find(ShowCard).length).toEqual(showCount);
  })

})
