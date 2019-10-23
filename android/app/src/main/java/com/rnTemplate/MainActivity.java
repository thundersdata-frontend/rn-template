/*
 * @文件描述: 
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-09 22:42:42
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-15 18:52:14
 */
package com.rnTemplate;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, true); // here
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "rnTemplate";
    }
}
