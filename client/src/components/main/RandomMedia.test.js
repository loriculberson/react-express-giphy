import React from "react";
import { shallow } from "enzyme";
import RandomMedia from "./RandomMedia";
import axios from "axios";
// shows it is a mocked function
console.log('axios', axios)

function flushResolvedPromises(millis = 0) {
  return new Promise(res => setTimeout(res, millis))
}

describe('RandomMedia', () => {
  it('exists', () => {
    const wrapper = shallow(<RandomMedia />)

    expect(wrapper.exists()).toEqual(true);
  })

  describe('surprise button is clicked', () => {
    describe('when data is returned', () => {
      it('displays a random word and giphy', async () => {

      // jest.mock('axios', () => {
      axios.get.mockImplementation(() => { 
        console.log('axios mock getting config')
        // return {
        //   get: jest.fn(() => {
            return (
              Promise.resolve({
                data: {
                  word: "wonderful", 
                  imageUrl: "https://media1.giphy.com/media/HTywC8XmlFG1i/200.gif"
                }
              }))
            // })
        // }
      })

        const wrapper = shallow(<RandomMedia />)
        const surpriseButton = wrapper.find('[data-surprise]')

        surpriseButton.simulate('click');
        console.log('just clicked')
        await flushResolvedPromises()

        const mediaResults = wrapper.find('[data-media-results]')
        // console.log(wrapper.debug())
        expect(mediaResults.children()).toHaveLength(1)
        // expect(surpriseButton.text()).toBe('Surprise!')
      })
    })

    xdescribe('when data is not returned', () => {
      
    })
  })
})