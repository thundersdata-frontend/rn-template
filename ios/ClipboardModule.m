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

RCT_EXPORT_METHOD(setString:(NSString *)text)
{
  UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
  pasteboard.string = (text ? : @"");
}

RCT_REMAP_METHOD(getString,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
  resolve((clipboard.string ? : @""));
}

RCT_EXPORT_METHOD(setImage:(NSString *)content
    resolve:(RCTPromiseResolveBlock) resolve
    reject:(RCTPromiseRejectBlock) reject
) {
  @try {
    UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
    NSData *imageData = [[NSData alloc]initWithBase64EncodedString:content options:NSDataBase64DecodingIgnoreUnknownCharacters];
    [pasteboard setImage:[UIImage imageWithData:imageData]];
    resolve(nil);
  }
  @catch (NSException *exception) {
    reject(@"Clipboard:setImage", exception.reason, nil);
  }
}

RCT_EXPORT_METHOD(hasString:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
  BOOL stringPresent = YES;
  UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
  if (@available(iOS 10, *)) {
    stringPresent = clipboard.hasStrings;
  } else {
    NSString* stringInPasteboard = clipboard.string;
    stringPresent = [stringInPasteboard length] == 0;
  }

  resolve([NSNumber numberWithBool: stringPresent]);
}

@end
