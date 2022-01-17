package com.rntemplate;

import com.facebook.react.bridge.JSIModuleSpec;
import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactApplicationContext;
import com.swmansion.reanimated.ReanimatedJSIModulePackage;
import com.reactnativemmkv.MmkvModule;

import java.util.Collections;
import java.util.List;

// TODO: Remove all of this when MMKV and Reanimated can be autoinstalled (maybe RN 0.65)
public class CustomJSIPackage extends ReanimatedJSIModulePackage {
    @Override
    public List<JSIModuleSpec> getJSIModules(ReactApplicationContext reactApplicationContext, JavaScriptContextHolder jsContext) {
        MmkvModule.install(jsContext, reactApplicationContext.getFilesDir().getAbsolutePath() + "/mmkv");
        return super.getJSIModules(reactApplicationContext, jsContext);
    }
}