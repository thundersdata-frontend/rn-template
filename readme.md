## 1. 如何替换启动页
```code
yarn add react-native-bootsplash

yarn react-native generate-bootsplash path-to-logo-image
```
可选参数：
- --background-color=[color]
启动页背景色。hex格式

- --logo-width=[width] 
1倍图logo大小（正方形）。默认为100

- --assets-path=[path]
logo存放在项目目录下的位置

- --flavor=[flavor]
安卓下有效。表示不是`main`目录的安卓资源文件夹

生成文件示例：
```code
android/app/src/main/res/drawable/bootsplash.xml
android/app/src/main/res/values/colors.xml (creation and edition)
android/app/src/main/res/mipmap-hdpi/bootsplash_logo.png
android/app/src/main/res/mipmap-mdpi/bootsplash_logo.png
android/app/src/main/res/mipmap-xhdpi/bootsplash_logo.png
android/app/src/main/res/mipmap-xxhdpi/bootsplash_logo.png
android/app/src/main/res/mipmap-xxxhdpi/bootsplash_logo.png

ios/YourProjectName/BootSplash.storyboard
ios/YourProjectName/Images.xcassets/BootSplashLogo.imageset/bootsplash_logo.png
ios/YourProjectName/Images.xcassets/BootSplashLogo.imageset/bootsplash_logo@2x.png
ios/YourProjectName/Images.xcassets/BootSplashLogo.imageset/bootsplash_logo@3x.png

# Only if --assets-path was specified
assets/bootsplash_logo.png
assets/bootsplash_logo@1,5x.png
assets/bootsplash_logo@2x.png
assets/bootsplash_logo@3x.png
assets/bootsplash_logo@4x.png
```

## 2. 如何替换应用图标

```code
yarn add -D @bam.tech/react-native-make

react-native set-icon --path path-to-image
```

要求：
- `path-to-image` 指向图片的路径必填
- 图片必须是正方形的
- 图片不能有透明图层，两个平台都不支持
- 图片最大尺寸是1024 * 1024
- 支持安卓自适应图标
- 图片格式支持.png 和 .jpeg
- 安卓平台下，上面的命令会在 android/app/src/main/res 目录下生成一堆图标文件

## 3. 如何生成svg图标

- 保证你的项目里安装了 `react-native-svg` 和 `@td-design/svgicon-cli`
- 把图表对应的svg文件放在根目录下的 icon-svg 文件夹下
- 执行命令 `npx svgicon-init` 生成配置文件：
```json
{
  "save_dir": "", // 生成图标文件的保存位置，推荐 ./src/components/Icon
  "trim_icon_prefix": "icon", // 图标文件的统一前缀
  "default_icon_size": 20, // 图标文件的默认大小
  "icon_svg": "./icon-svg", // 图标文件的存放位置
  "for_library": false // 是否为组件库生成图标，默认是false，表示是为项目生成图标
}
```
- 执行命令 `npx svgicon-create` 在对应的 `save_dir` 下生成图标组件