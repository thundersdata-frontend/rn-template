#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import "RNBootSplash.h" // <- add the header import
#import "SDImageCodersManager.h"
#import <SDWebImageWebPCoder/SDImageWebPCoder.h>  // <- add webp support for ios8+ ~ ios13
#import <CodePush/CodePush.h> // <- add code push import
#import "ShortcutModule.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"rnTemplate";
  self.initialProps = @{};

  // webp支持
  [SDImageCodersManager.sharedManager addCoder:SDImageWebPCoder.sharedCoder];
  
  [super application:application didFinishLaunchingWithOptions:launchOptions];

  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:self.window.rootViewController.view]; // <- initialization using the storyboard file name

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  // return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  return [CodePush bundleURL];
#endif
}

- (void)application:(UIApplication *)application performActionForShortcutItem:(UIApplicationShortcutItem *)shortcutItem completionHandler:(void (^)(BOOL succeeded)) completionHandler {
  [ShortcutModule onShortcutItemPress:shortcutItem completionHandler:completionHandler];
}

@end
