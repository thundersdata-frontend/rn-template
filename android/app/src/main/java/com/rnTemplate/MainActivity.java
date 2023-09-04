package com.rntemplate;
import expo.modules.ReactActivityDelegateWrapper;

import android.os.Bundle;

import androidx.core.view.WindowCompat;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import com.zoontek.rnbootsplash.RNBootSplash; // <- add this necessary import
import com.zoontek.rnbars.RNBars; // <- add this necessary import

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "rnTemplate";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    if (savedInstanceState != null) {
			savedInstanceState.remove("android:support:fragments");
			savedInstanceState.remove("android:fragments");
		}
    // 初始化启动页
    RNBootSplash.init(this);
    super.onCreate(savedInstanceState);
    // 初始化状态栏
    // 必须在super.onCreate方法之后，不然在顶部会出现app name
    RNBars.init(this, "light-content");
    // Layout edge-to-edge
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled()));
  }
}
