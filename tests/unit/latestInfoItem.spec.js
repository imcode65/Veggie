
import { mount } from '@vue/test-utils'
import LatestInfoItem from '@/components/directSale/Detail/LatestInfoItem'

describe('LatestInfoItem', () => {
  test('Passing right prop', () => {
    const post = {
      createdAt: 12345,
      description: 'description',
      directSaleId: 'directSaleId',
      id: '8SijttqShGWavRpoW58m',
      uid: 'uid'
    }

    const wrapper = mount(LatestInfoItem, {
      propsData: {
        post: post
      }
    })
    expect(wrapper.props('post')).toBe(post)
  })
})