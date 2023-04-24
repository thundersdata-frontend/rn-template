//
//  ShortcutModule.m
//  rnTemplate
//
//  Created by chjdamon on 2023/4/20.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTUtils.h>

#import "ShortcutModule.h"

NSString *const RCTShortcutItemClicked = @"onShortcutItemPressed";

NSDictionary *ShortcutAction(UIApplicationShortcutItem *item) {
  if (!item) return nil;
  
  return @{
    @"type": item.type,
    @"title": item.localizedTitle,
  };
}

@implementation ShortcutModule
{
  UIApplicationShortcutItem *_initialAction;
}

RCT_EXPORT_MODULE();

- (instancetype)init
{
  if (self = [super init]) {
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(handleShortcutItemPress:)
                                                 name:RCTShortcutItemClicked
                                               object:nil];
  }
  return self;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)setBridge: (RCTBridge *) bridge
{
  _initialAction = [bridge.launchOptions[UIApplicationLaunchOptionsShortcutItemKey] copy];
}

- (NSArray*)dynamicShortcutItemsForPassedArray: (NSArray*)passedArray
{
  NSDictionary *icons = @{
    @"Compose": @(UIApplicationShortcutIconTypeCompose),
    @"Play": @(UIApplicationShortcutIconTypePlay),
    @"Pause": @(UIApplicationShortcutIconTypePause),
    @"Add": @(UIApplicationShortcutIconTypeAdd),
    @"Location": @(UIApplicationShortcutIconTypeLocation),
    @"Search": @(UIApplicationShortcutIconTypeSearch),
    @"Share": @(UIApplicationShortcutIconTypeShare),
    @"Prohibit": @(UIApplicationShortcutIconTypeProhibit),
    @"Contact": @(UIApplicationShortcutIconTypeContact),
    @"Home": @(UIApplicationShortcutIconTypeHome),
    @"MarkLocation": @(UIApplicationShortcutIconTypeMarkLocation),
    @"Favorite": @(UIApplicationShortcutIconTypeFavorite),
    @"Love": @(UIApplicationShortcutIconTypeLove),
    @"Cloud": @(UIApplicationShortcutIconTypeCloud),
    @"Invitation": @(UIApplicationShortcutIconTypeInvitation),
    @"Confirmation": @(UIApplicationShortcutIconTypeConfirmation),
    @"Mail": @(UIApplicationShortcutIconTypeMail),
    @"Message": @(UIApplicationShortcutIconTypeMessage),
    @"Date": @(UIApplicationShortcutIconTypeDate),
    @"Time": @(UIApplicationShortcutIconTypeTime),
    @"CapturePhoto": @(UIApplicationShortcutIconTypeCapturePhoto),
    @"CaptureVideo": @(UIApplicationShortcutIconTypeCaptureVideo),
    @"Task": @(UIApplicationShortcutIconTypeTask),
    @"TaskCompleted": @(UIApplicationShortcutIconTypeTaskCompleted),
    @"Alarm": @(UIApplicationShortcutIconTypeAlarm),
    @"Bookmark": @(UIApplicationShortcutIconTypeBookmark),
    @"Shuffle": @(UIApplicationShortcutIconTypeShuffle),
    @"Audio": @(UIApplicationShortcutIconTypeAudio),
    @"Update": @(UIApplicationShortcutIconTypeUpdate)
  };
  
  NSMutableArray *shortcutItems = [NSMutableArray new];
  
  [passedArray enumerateObjectsUsingBlock:^(NSDictionary *item, NSUInteger idx, BOOL *stop) {
    NSString *iconName = item[@"icon"];
    
    UIApplicationShortcutIcon *shortcutIcon;
    NSNumber *iconType = icons[iconName];
    
    if (iconType) {
      shortcutIcon = [UIApplicationShortcutIcon iconWithType:[iconType intValue]];
    } else if (iconName) {
      shortcutIcon = [UIApplicationShortcutIcon iconWithTemplateImageName:iconName];
    }
    
    [shortcutItems addObject:[[UIApplicationShortcutItem alloc] initWithType:item[@"type"]
                                                              localizedTitle:item[@"title"]
                                                           localizedSubtitle:item[@"subtitle"]
                                                                        icon:shortcutIcon
                                                                    userInfo:item[@"userInfo"]]];
  }];
  
  return shortcutItems;
}

+ (void)onShortcutItemPress:(UIApplicationShortcutItem *)shortcutItem completionHandler:(void (^)(BOOL))completionHandler
{
  RCTLogInfo(@"[ShortcutModule] shortcut item pressed: %@", [shortcutItem type]);
  
  [[NSNotificationCenter defaultCenter] postNotificationName:RCTShortcutItemClicked
                                                      object:self
                                                    userInfo:ShortcutAction(shortcutItem)];
  
  completionHandler(YES);
}

- (void)handleShortcutItemPress: (NSNotification *)notification
{
  [self sendEventWithName:RCTShortcutItemClicked body:notification.userInfo];
}

- (NSDictionary *)constantsToExport
{
    return @{
      @"initialAction": RCTNullIfNil(ShortcutAction(_initialAction))
    };
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[RCTShortcutItemClicked];
}

RCT_EXPORT_METHOD(setShortcuts:(NSArray *) shortcutItems)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    NSArray *dynamicShortcuts = [self dynamicShortcutItemsForPassedArray:shortcutItems];
    [UIApplication sharedApplication].shortcutItems = dynamicShortcuts;
  });
}

RCT_EXPORT_METHOD(clearShortcuts)
{
  [UIApplication sharedApplication].shortcutItems = nil;
}

@end
