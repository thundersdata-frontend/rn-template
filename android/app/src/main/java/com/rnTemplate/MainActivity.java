package com.rntemplate;

import android.os.Bundle;

import androidx.core.view.WindowCompat;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate; // <- add this necessary import
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
    RNBootSplash.init(this);
    super.onCreate(savedInstanceState);
    // Layout edge-to-edge
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {

      @Override
      protected void loadApp(String appKey) {
        super.loadApp(appKey);
        RNBars.init(MainActivity.this, "dark-content"); // <- initialize with initial bars styles (could be light-content)
      }
    };
  }
}
