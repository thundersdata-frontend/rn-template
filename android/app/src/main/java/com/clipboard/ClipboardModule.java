package com.clipboard;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ClipboardModule extends ReactContextBaseJavaModule {
    private static final String TAG = "ClipboardModule";
    private ClipboardManager clipboardManager;

    public ClipboardModule(ReactApplicationContext reactContext) {
        super(reactContext);
        clipboardManager = (ClipboardManager) reactContext.getSystemService(Context.CLIPBOARD_SERVICE);
    }

    @Override
    public String getName() {
        return "ClipboardModule";
    }

    @ReactMethod
    public void copy(String text) {
        ClipData clipData = ClipData.newPlainText("text", text);
        clipboardManager.setPrimaryClip(clipData);
    }

    @ReactMethod
    public void paste(Promise promise) {
        ClipData clipData = clipboardManager.getPrimaryClip();
        if (clipData != null && clipData.getItemCount() > 0) {
            ClipData.Item item = clipData.getItemAt(0);
            String text = item.getText().toString();
            promise.resolve(text);
        } else {
            promise.reject("粘贴板内没有内容");
        }
    }
}
