## 1. 如何替换启动页

```code
yarn add react-native-bootsplash

yarn react-native generate-bootsplash path-to-logo-image
```

可选参数：

- --background-color=[color]
  启动页背景色。hex 格式

- --logo-width=[width]
  1 倍图 logo 大小（正方形）。默认为 100

- --assets-path=[path]
  logo 存放在项目目录下的位置

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

npx react-native set-icon --path path-to-image
```

要求：

- `path-to-image` 指向图片的路径必填
- 图片必须是正方形的
- 图片不能有透明图层，两个平台都不支持
- 图片最大尺寸是 1024 \* 1024
- 支持安卓自适应图标
- 图片格式支持.png 和 .jpeg
- 安卓平台下，上面的命令会在 android/app/src/main/res 目录下生成一堆图标文件

## 3. 如何生成 svg 图标

- 保证你的项目里安装了 `react-native-svg` 和 `@td-design/svgicon-cli`
- 把图表对应的 svg 文件放在根目录下的 icon-svg 文件夹下
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

## 4. 如何应用字体文件

在@td-design/react-native 组件库中，我们内置了对`PingFang SC Regular` 和 `Roboto` 字体的默认支持，但是需要在项目中加载这两个字体文件。做法如下：

- 在`react-native.config.js`文件中增加以下配置：

```code
module.exports = {
  // 其他配置
  assets: ['./assets/fonts/'], // stays the same
};

```

- 在`assets/fonts/`目录下，将这两个字体文件复制进来
- 执行`npx react-native link`命令，会自动将字体文件映射到 Android 和 IOS 原生配置中

通过以上步骤增加字体之后，不需要其他额外的配置就可以在项目中看到效果了。
你也可以通过在`theme.ts`文件中定义自己的 textVariants。
