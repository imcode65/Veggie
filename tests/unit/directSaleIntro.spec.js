// require('jsdom-global')()
import { mount } from '@vue/test-utils'
import DirectSaleIntro from '@/components/DirectSaleIntro'
import {InputHourTypeEnum} from '@/constants/InputHourType'

  describe('DirectSaleIntro', () => {
    it('renders a div', () => {
      const wrapper = mount(DirectSaleIntro)
      expect(wrapper.contains('div')).toBe(true)
    })
  })

describe('DirectSaleIntro', () => {
  test('Passing right prop', () => {
    const directSale = {
      id : '',
      name: 'farm name',
      nameKana: '',
      postalCode: '',
      prefecture: '',
      city: '',
      otherCityAddress: '',
      location: '',
      category: '',
      description: '',
      businessHours: [
        {
          id: 1,
          month: 'january',
          days: [
            {
              id: 1,
              name: 'monday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 2,
              name: 'tuesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 3,
              name: 'wednesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 4,
              name: 'thursday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 5,
              name: 'friday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 6,
              name: 'saturday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 0,
              name: 'sunday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 7,
              name: 'holiday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
          ]
        },
        {
          id: 2,
          month: 'february',
          days: [
            {
              id: 1,
              name: 'monday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 2,
              name: 'tuesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 3,
              name: 'wednesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 4,
              name: 'thursday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 5,
              name: 'friday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 6,
              name: 'saturday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 0,
              name: 'sunday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 7,
              name: 'holiday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
          ]
        },
        {
          id: 3,
          month: 'march',
          days: [
            {
              id: 1,
              name: 'monday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 2,
              name: 'tuesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 3,
              name: 'wednesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 4,
              name: 'thursday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 5,
              name: 'friday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 6,
              name: 'saturday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 0,
              name: 'sunday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 7,
              name: 'holiday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
          ]
        },
        {
          id: 4,
          month: 'april',
          days: [
            {
              id: 1,
              name: 'monday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 2,
              name: 'tuesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 3,
              name: 'wednesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 4,
              name: 'thursday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 5,
              name: 'friday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 6,
              name: 'saturday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 0,
              name: 'sunday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 7,
              name: 'holiday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
          ]
        },
        {
          id: 5,
          month: 'may',
          days: [
            {
              id: 1,
              name: 'monday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 2,
              name: 'tuesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 3,
              name: 'wednesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 4,
              name: 'thursday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 5,
              name: 'friday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 6,
              name: 'saturday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 0,
              name: 'sunday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 7,
              name: 'holiday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
          ]
        },
        {
          id: 6,
          month: 'june',
          days: [
            {
              id: 1,
              name: 'monday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 2,
              name: 'tuesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 3,
              name: 'wednesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 4,
              name: 'thursday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 5,
              name: 'friday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 6,
              name: 'saturday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 0,
              name: 'sunday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 7,
              name: 'holiday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
          ]
        },
        {
          id: 7,
          month: 'july',
          days: [
            {
              id: 1,
              name: 'monday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 2,
              name: 'tuesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 3,
              name: 'wednesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 4,
              name: 'thursday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 5,
              name: 'friday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 6,
              name: 'saturday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 0,
              name: 'sunday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 7,
              name: 'holiday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
          ]
        },
        {
          id: 8,
          month: 'august',
          days: [
            {
              id: 1,
              name: 'monday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 2,
              name: 'tuesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 3,
              name: 'wednesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 4,
              name: 'thursday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 5,
              name: 'friday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 6,
              name: 'saturday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 0,
              name: 'sunday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 7,
              name: 'holiday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
          ]
        },
        {
          id: 9,
          month: 'september',
          days: [
            {
              id: 1,
              name: 'monday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 2,
              name: 'tuesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 3,
              name: 'wednesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 4,
              name: 'thursday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 5,
              name: 'friday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 6,
              name: 'saturday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 0,
              name: 'sunday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 7,
              name: 'holiday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
          ]
        },
        {
          id: 10,
          month: 'october',
          days: [
            {
              id: 1,
              name: 'monday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 2,
              name: 'tuesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 3,
              name: 'wednesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 4,
              name: 'thursday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 5,
              name: 'friday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 6,
              name: 'saturday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 0,
              name: 'sunday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 7,
              name: 'holiday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
          ]
        },
        {
          id: 11,
          month: 'november',
          days: [
            {
              id: 1,
              name: 'monday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 2,
              name: 'tuesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 3,
              name: 'wednesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 4,
              name: 'thursday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 5,
              name: 'friday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 6,
              name: 'saturday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 0,
              name: 'sunday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 7,
              name: 'holiday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
          ]
        },
        {
          id: 12,
          month: 'december',
          days: [
            {
              id: 1,
              name: 'monday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 2,
              name: 'tuesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 3,
              name: 'wednesday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 4,
              name: 'thursday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 5,
              name: 'friday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 6,
              name: 'saturday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 0,
              name: 'sunday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
            {
              id: 7,
              name: 'holiday',
              InputHourType: InputHourTypeEnum.is_closed,
              open_at: '',
              close_at: ''
            },
          ]
        },

      ],
      registeredUser: {
        firstName: '',
        firstNameKana: '',
        lastName: '',
        lastNameKana: '',
        phoneNumber: '',
      },
      imageStoragePaths: {
        path: '',
        path2: '',
        path3: ''
      },
      distanceFromCurrentLocation: 10,
    }
    const wrapper = mount(DirectSaleIntro, {
      propsData: {
        directSale: directSale,
      }
    })
    expect(wrapper.props('directSale')).toBe(directSale)
  })
})
