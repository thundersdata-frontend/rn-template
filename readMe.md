## RN bug 收集：

1. `React/RCTBridgeModule.h` file not found

```js
What happened was that Xcode was trying to build the react-native libraries in parallel and was building libraries with implicit react dependencies before actually building the react library.

The solution in my case was to:

Disable the parallel builds:

Xcode menu -> Product -> Scheme -> Manage Shemes...
Double click on your application
Build tab -> uncheck Parallelize Build
Add react as a project dependecy

Xcode Project Navigator -> drag React.xcodeproj from Libraries to root tree
Build Phases Tab -> Target Dependencies -> + -> add React
```
