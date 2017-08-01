import { ShipModelWithoutParentPipe } from './ship-model-without-parent.pipe';

describe('ShipModelWithoutParentPipe', () => {
  it('create an instance', () => {
    const pipe = new ShipModelWithoutParentPipe();
    expect(pipe).toBeTruthy();
  });
});
