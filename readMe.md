# RN模板
雷数科技前端app组件库及模板页面

## 组件列表

| 名称 | 组件 | 功能说明 | 示例页面 | 辅助说明 |
| :----- | :--- | :------- | :------- | :------  |
| 走马灯 | Carousel | 轮播图 | `/screens/home` 首页 | 此组件未进行二次封装，配置参考antd |
| 宫格布局 | GridItems | 类似于九宫格的布局，每行可配置为放置3/4个 | `/screens/home` 首页 | - |
| 标签页 | Tabs | 用于让用户在不同的视图中进行切换。 | `/screens/home` 首页 | 配置参考antd |
| 预警消息 | TodoTip | 一般用作系统提醒、活动提醒等通知 | `/screens/show/components/List` 展示-列表 | - |
| 列表项 | CustomListItem | 单个连续模块垂直排列，显示当前的内容、状态和可进行的操作。 | `/screens/show/components/List` 展示-列表 、 `/screens/formDemo` 表单 | - |
| 通用手风琴组件 | CustomAccordion | 可以折叠/展开的内容区域。 | `/screens/show/components/List` 展示-列表 、 `/screens/formDemo` 表单 | - |
| 标签 | CustomTag | 进行标记和分类的小标签，分为三种形态，是否可点击选中、是否为圆角 | `/screens/show/components/List` 展示-卡片 | - |
| 卡片 | CustomCard | 作为一块信息展示的载体，可灵活配置，footer可配置为按钮组 | `/screens/show/components/List` 展示-卡片 | - |
| 带有预览图片的商品列表的item | ImgLinkItem | 作为典型的图片加文字的展示项 | `/screens/show/components/List` 展示-卡片 | - |
| 头像 | Avatar | 头像展示 | `/screens/mine` 我的 | `<Avatar uri={state.avatar} width={px(54)} />` |
| 带背景图片的header | BackgroundImgHeader | 头部导航栏为背景图片加文字 | `/screens/mine` 我的 | - |
| picker 级联组件 | CascadePicker | 封装后的级联组件，是picker和头部文字的结合体 | 暂无 | - |
| 页面容器组件 | Container | 通用的页面容器组件，包含了SafeAreaView和StatusBar | `/screens/home` 首页 | - |
| 日期选择组件 | CustomDatePicker | 样式改造后的datePicker组件 | `/screens/formDemo` 表单 | 可与field和CustomListItem结合使用 |
| 图片上传组件 | CustomImagePicker | 进行图片上传 | `/screens/formDemo` 表单 | 实际使用时在组件中配置上传图片的接口 |
| List.Item与picker的结合体 | CustomListItemPicker | 用于List.Item和CustomPicker组合的选择框，主要用于表单里选择数据 | `/screens/formDemo` 表单 | - |
| 数字输入键盘 | CustomNumberInput | 自定义的数字输入组件 | `/screens/formDemo` 表单 | - |
| picker组件 | CustomPicker | 根据antd的picker组件进行了样式改造 | `/screens/formDemo` 表单 | - |
| 打分组件 | CustomRating | 用于评分，可编辑可展示 | 暂无 | - |
| Switch | CustomSwitch | 自定义的开关组件 | `/screens/formDemo` 表单 | 暂不支持disable，后续持续关注 |
| 表格table | CustomTable | 表格组件 | 暂无 | - |
| 暂无数据组件 | DataEmpty | 没有数据时的展示情况 | 暂无 | - |
| 删除弹窗组件 | deleteModal | - | `/screens/show/components/List` 展示-列表 | - |
| 渐变按钮 | GradientButton | 可支持渐变颜色的按钮展示 | 暂无 | - |
| 水平柱图 | HorizontalBarChart | - | `/screens/show/components/Chart` 展示-图表 | - |
| 图标 | Iconfont | - | 暂无 | `<Iconfont style={{ marginRight: Size.px(8) }} name={icon} size={Size.px(20)} color={Color.primary} />` |
| 输入组件 | Input | 样式改造后的input组件 | `/screens/signIn/register` | - |
| 展示item组件 | ListItem | 封装的列表项组件，有统一的边距，有上下和左右留白 | `/screens/formDemo` 表单 | 建议有上下留白和左右留白的地方统一使用，有利于app整体的留白统一 |
| 列表项文字组件 | ListItemText | 可作为表单中的label展示，可展示为该表单项是否必填，是否error，风格统一为14px+mainTextColor | `/screens/formDemo` 表单 | - |
| picker中的多选组件 | MultiplePicker | 在picker中可进行多选的操作 | `/screens/formDemo` 表单 | - |
| 按钮形式的Radio | RadioButtonGroup | 单选按钮组合 | `/screens/show/components/Chart` 展示-图表 | - |
| 圆圈形式的Radio | RadioGroup | 单选圆圈组件，可一行展示也可多行展示 | `/screens/formDemo` 表单 | - |
| 下拉加载、上拉刷新的组件 | RefreshListView | - | 暂无 | 与hooks中的useRefresh结合使用 |
| 带搜索功能的picker | SearchPicker | 可在picker中进行搜索 | `/screens/formDemo` 表单 | - |
| 标题组件 | Title | 用于灰色背景色的title展示 | `/screens/formDemo` 表单 | `<Title title="选择列表" />` |
| 渐变色的导航栏顶部 | TitleBar | - | `common.tsx` | - |



## demo页面

| 名称 | 示例代码 | 功能说明 | 辅助说明 |
| :--- | :--- | :------- | :------- |
| 抽屉导航 | `/stacks/mainStack` 、 `/stacks/drawer` | 用于在屏幕边缘显示应用导航等内容的面板 | - |
| 底部导航 | `/stacks/mainStack` 、 `/stacks/tab` | 用于在屏幕底部显示应用导航等内容。 | 可在首页中的选项四点击跳转查看 |
| 登录 | `/screens/signIn` | 用账号、密码实现登录 | 目前可以输入任意账号密码登录成功，后续根据需要自行配置校验规则 |
| 注册 | `/screens/signIn/register` | 用账号、密码、手机号、验证码实现注册 | - |
| 忘记密码 | `/screens/signIn/forgetPassword` | 用手机号、验证码、密码实现找回密码功能 | - |


## 头部导航
可分为三种：
- 常规头部导航栏样式，配置参照 `common.tsx` 中的commonStackOptions，页面参考首页
- 头部导航栏与内容区自然衔接的样式，配置参照 `common.tsx` 中的linearGradientStackOptions，页面参考联赛
```typescript
return {
          ...linearGradientStackOptions,
          headerTitle: '联赛',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginLeft: Size.px(5), padding: Size.px(10) }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Iconfont name="navMenu" size={Size.px(20)} color={Color.white} />
            </TouchableOpacity>
          )
        };
```
- 以背景图片作为头部导航栏样式，示例页面：我的 `/screens/mine`
```typescript
<BackgroundImgHeader
  showRadius={false}
  backgroundImg={require('../../images/pic_my_head.png')}
  leftIcon={<Iconfont name="navMenu" size={Size.px(20)} color={Color.white} />}
  onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
  {...props}>
  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Avatar uri={state.avatar} width={px(54)} />
    <Text style={{ fontSize: px(18), fontWeight: '500', color: Color.white, marginTop: Size.px(10) }}>
      {state.name}
    </Text>
  </View>
</BackgroundImgHeader>
```

## pont生成工具与umi的useRequest结合使用

### pont配置
1. 在pont-config.json文件中配置origins，一个swagger地址对应一个name和originUrl，name的命名没有约束，但是会在接口调用的时候用到，例如authorization（权限中心），originUrl就是api-docs的地址，例如'http://xxxx/v2/api-docs'，可以支持配置多个swagger地址，但是注意：除了origins之外的配置项不要改动
2. server.config.js文件是用于从pont-config.json文件中读取后端接口地址的，不需要进行改动（如果随意的更改可能会引起调用接口的时候nameSpace对应不上）
3. pontTemplate.ts文件是定义生成代码的模板文件，不需要进行改动
4. 在项目的入口文件，即src目录下的global.ts文件中加入一句'import '@/services';'，把API引入进来

### pont使用
1. 在 vscode 中安装 vscode 插件 pont，使用方法参考'https://github.com/nefe/vscode-pont'
2. 当vscode-pont检测到项目中含有合法的pont-config.json之后，插件会马上启动生成services文件夹
3. 如果后端接口发生了更新，那么需要手动的点击VS code左下方的sync按钮，这样才会去比较线上和线下的差异实现和服务端同步变更，但是这个变更是存在于内存中的，all/mod/bo都是把对应内容更新到api.lock中，generate是根据lock生成最后的代码
4. 当重新打开项目时，会自动调用一次sync，获取和服务端的差异
5. 目前API已经配置为全局变量，当需要调用接口时，我们不需要再进行import操作，只需要API.[nameSpace].[mod].[方法的文件名].fetch()，nameSpace即在pont-config.json文件中配置的origins的name，mod即是module，例如：API.authorization.role.resourceSave.fetch()
6. 更多细节：'https://github.com/alibaba/pont'

### pont最佳实践
基于我们自定义的pontTemplate，pont已经帮我们生成了我们需要的TypeScript类型声明文件，以及对应的调用后端接口的胶水代码，同时也为我们生成好了初始值。那么我们使用pont的最佳实践应该是什么样的呢？我在这里大致总结一下：
1. 不要自己定义初始值，直接使用pont生成的init值作为useState或者store里面的初始值。例如：
```typescript
const [detail, setDetail] = useState<defs.gazelle.CompanyFinancialIndicatorDTO>(API.gazelle.companyFinancialIndicator.getById.init);
```
2. 与umi的useRequest结合使用

我们自定义生成的请求方法的格式如下：当接口请求的success为false时，我们会把错误throw出去，在useRequest的onError中进行处理，此时返回的data是接口数据的默认值
```typescript
export async function fetch(params = {}) {
  const result = await request.get(
    backEndUrl + '/interview/getInterviewerDetail',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      params,
    },
  );
  if (!result.success) throw new Error(result.message);
  return result.data || new defs.recruitment.HrmInterviewDTO();
}
```

```typescript
useRequest(() => API.recruitment.dict.getAllDict.fetch(), {
  onSuccess: data => {
    setEnums(data);
  },
  onError: error => {
    console.log(error.message);
  }
});
```
3. 如果前端需要的数据格式和后端返回的格式有区别（最常见的就是日期和文件），那么你需要自己构造一个类型来对这些特殊属性进行处理。这个时候最好是使用typescript提供的`Utility Types(工具类型)`来尽可能复用已有的类型。例如：
```typescript
export type PolicyDetailDTO = Pick<
  defs.gazelle.PolicyDTO,
  | 'policyId'
  | 'policyType'
  | 'title'
  | 'indexCode'
  | 'issueNumber'
  | 'issueOrg'
  | 'subjectType'
  | 'subjectWord'
  | 'tenantCode'
> & {
  issueDate: moment.Moment;
  finalDate: moment.Moment;
  attachment?: UploadFile[];
};
```