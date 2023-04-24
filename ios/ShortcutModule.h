//
//  ShortcutModule.h
//  rnTemplate
//
//  Created by chjdamon on 2023/4/20.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface ShortcutModule : RCTEventEmitter <RCTBridgeModule>
+(void) onShortcutItemPress:(UIApplicationShortcutItem *) shortcutItem completionHandler:(void (^)(BOOL succeeded)) completionHandler;
@end
