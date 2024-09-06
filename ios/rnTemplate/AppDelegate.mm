#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import "RNBootSplash.h" // <- add the header import
#import <SDWebImageWebPCoder/SDImageWebPCoder.h>  // <- add webp support for ios8+ ~ ios13
#import <CodePush/CodePush.h> // <- add code push import
#import "ShortcutModule.h"

#import <React/RCTLinkingManager.h> // <- deeplinking

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"rnTemplate";
  self.initialProps = @{};

  // webp支持
  [SDImageCodersManager.sharedManager addCoder:SDImageWebPCoder.sharedCoder];
  
  [super application:application didFinishLaunchingWithOptions:launchOptions];

  return YES;
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [super application:application openURL:url options:options] || [RCTLinkingManager application:application openURL:url options:options];
}

// Universal Links
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
  BOOL result = [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  return [super application:application continueUserActivity:userActivity restorationHandler:restorationHandler] || result;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
  #if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@".expo/.virtual-metro-entry"];
  #else
    // return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    return [CodePush bundleURL];
  #endif
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  return [super application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  return [super application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

- (void)application:(UIApplication *)application performActionForShortcutItem:(UIApplicationShortcutItem *)shortcutItem completionHandler:(void (^)(BOOL succeeded)) completionHandler {
  [ShortcutModule onShortcutItemPress:shortcutItem completionHandler:completionHandler];
}

// ⬇️ Add this before file @end (for react-native 0.74+)
- (void)customizeRootView:(RCTRootView *)rootView {
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView]; // ⬅️ initialize the splash screen
}

@end
