import { by, expect, element } from 'detox';

describe('SignIn', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have signIn screen', async () => {
    await expect(element(by.id('signIn'))).toBeVisible();
  });
});
