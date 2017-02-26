import Vue from 'vue';
import Focus from 'mixins/focus';
import { mixin as focus } from 'vue-focus';

describe('Focus - mixin', () => {
  it('should be injected into Vue', () => {
    const spy = sinon.spy(Vue, 'mixin');
    spy.withArgs(focus);
    Focus(Vue);
    sinon.assert.calledOnce(spy);
    spy.calledWith(focus);
  });
});
