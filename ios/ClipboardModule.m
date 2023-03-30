//
//  ClipboardModule.m
//  rnTemplate
//
//  Created by chjdamon on 2023/3/30.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface ClipboardModule : NSObject <RCTBridgeModule>
@end

@implementation ClipboardModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(copy:(NSString *)text)
{
  UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
  pasteboard.string = text;
}

RCT_REMAP_METHOD(paste,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
  NSString *text = pasteboard.string;
  if (text != nil) {
    resolve(text);
  } else {
    reject(@"没有内容", @"粘贴板内没有内容", nil);
  }
}

@end
