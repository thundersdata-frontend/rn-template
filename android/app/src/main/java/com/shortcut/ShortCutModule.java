package com.shortcut;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ShortcutInfo;
import android.content.pm.ShortcutManager;
import android.graphics.drawable.Icon;
import android.os.Build;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.util.Log;

import androidx.core.content.pm.ShortcutInfoCompat;
import androidx.core.content.pm.ShortcutManagerCompat;
import androidx.core.graphics.drawable.IconCompat;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationCausedNativeException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class ShortcutModule extends ReactContextBaseJavaModule {
    static final String REACT_NAME = "ShortcutModule";

    private static final String ACTION_SHORTCUT = "ACTION_SHORTCUT";
    private static final String SHORTCUT_ITEM = "SHORTCUT_ITEM";

    private static final String SHORTCUT_ITEM_CLICKED = "onShortcutItemPressed";

    @Override
    public String getName() {
        return REACT_NAME;
    }

    ShortcutModule(ReactApplicationContext reactContext) {
        super(reactContext);

        reactContext.addActivityEventListener(new ActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

            }

            @Override
            public void onNewIntent(Intent intent) {
                sendJSEvent(intent);
            }
        });
    }

    private void sendJSEvent(Intent intent) {
        if (!ACTION_SHORTCUT.equals(intent.getAction()) || !isShortcutSupported()) {
            return;
        }

        ShortcutItem item = null;
        PersistableBundle bundle = intent.getParcelableExtra(SHORTCUT_ITEM);
        if (bundle != null) {
            item = ShortcutItem.fromPersistableBundle(bundle);
        }
        if (item != null) {
            getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(SHORTCUT_ITEM_CLICKED, item.toWritableMap());
        }
    }

    private boolean isShortcutSupported() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            return ShortcutManagerCompat.isRequestPinShortcutSupported(getReactApplicationContext());
        }
        return false;
    }

    @ReactMethod
    public void getInitialShortcut(Promise promise) {
        try {
            Activity currentActivity = getCurrentActivity();
            WritableMap map = null;

            if (currentActivity != null) {
                Intent intent = currentActivity.getIntent();

                if (ACTION_SHORTCUT.equals(intent.getAction())) {
                    PersistableBundle bundle = intent.getParcelableExtra(SHORTCUT_ITEM);
                    if (bundle != null) {
                        ShortcutItem item = ShortcutItem.fromPersistableBundle(bundle);
                        map = item.toWritableMap();
                    }
                }
            }
            promise.resolve(map);

        } catch (Exception e) {
            promise.reject(new JSApplicationCausedNativeException("AppShortcut.getInitialShortcut Error: " + e.getMessage()));
        }
    }

    @ReactMethod
    public void setShortcuts(ReadableArray items) {
        Log.d("shortcuts", "setShortcuts in the first time");
        if (!isShortcutSupported() || items.size() == 0) return;
        Log.d("shortcuts", items.size() + "shortcuts");

        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) return;

        Context context = getReactApplicationContext();

        for (int i = 0; i < items.size(); i++) {
            ShortcutItem item = ShortcutItem.fromReadableMap(items.getMap(i));

            Intent intent = new Intent(context, currentActivity.getClass());
            intent.setAction(ACTION_SHORTCUT);
            intent.putExtra(SHORTCUT_ITEM, item.toPersistableBundle());

            ShortcutInfoCompat.Builder builder = new ShortcutInfoCompat.Builder(context, "id" + i)
                .setShortLabel(item.title)
                .setLongLabel(item.title)
                .setIntent(intent);

            if (item.icon != null) {
                int iconId = context.getResources().getIdentifier(item.icon, "drawable", context.getPackageName());
                builder.setIcon(IconCompat.createWithResource(context, iconId));
            }

            ShortcutInfoCompat shortcut = builder.build();

            ShortcutManagerCompat.pushDynamicShortcut(context, shortcut);
        }
    }

    @ReactMethod
    public void clearShortcuts() {
        if (!isShortcutSupported()) return;

        ShortcutManagerCompat.removeAllDynamicShortcuts(getReactApplicationContext());
    }
}
