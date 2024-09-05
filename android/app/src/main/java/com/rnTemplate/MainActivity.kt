package com.rntemplate

import android.os.Bundle
import androidx.core.view.WindowCompat
import expo.modules.ReactActivityDelegateWrapper

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.zoontek.rnbars.RNBars
import com.zoontek.rnbootsplash.RNBootSplash

class MainActivity: ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "rnTemplate"

  override fun onCreate(savedInstanceState: Bundle?) { // Made the parameter nullable
    if (savedInstanceState != null) {
			savedInstanceState.remove("android:support:fragments")
			savedInstanceState.remove("android:fragments")
		}
    RNBootSplash.init(this, R.style.BootTheme) // ⬅️ 初始化启动页
    super.onCreate(savedInstanceState)
    // 初始化状态栏
    // 必须在super.onCreate方法之后，不然在顶部会出现app name
    RNBars.init(this, "light-content", false)
    // Layout edge-to-edge
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false)
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate = 
    ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled))
}
