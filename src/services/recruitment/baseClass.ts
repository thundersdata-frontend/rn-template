class AddDTO {
  /** 岗位名称 */
  postName = '';

  /** 岗位类别 */
  postType = undefined;
}

class ApplyAddDTO {
  /** 入职部门 */
  entryDept = '';

  /** 是否入职 */
  entryStatus = undefined;

  /** 面试记录 */
  interviewListDTOS = [];

  /** 应聘人id */
  personCode = '';

  /** 应聘岗位id */
  postCode = '';

  /** 应聘结果 */
  postResult = undefined;

  /** 应聘时间 */
  postStartAt = '';

  /** 备注 */
  remark = '';
}

class ApplyDeleteDTO {
  /** 应聘人编码 */
  applyCode = '';
}

class ApplyResultDTO {
  /** 应聘人id */
  applyCode = '';

  /** 入职部门 */
  entryDept = '';

  /** 是否入职 */
  entryStatus = undefined;

  /** 面试记录 */
  interviewListDTOS = [];

  /** 应聘人id */
  personCode = '';

  /** 应聘人姓名 */
  personName = '';

  /** 应聘岗位编码 */
  postCode = '';

  /** 应聘终止时间 */
  postEndAt = '';

  /** 应聘岗位名称 */
  postName = '';

  /** 应聘结果 */
  postResult = undefined;

  /** 应聘起始时间 */
  postStartAt = '';

  /** 备注 */
  remark = '';
}

class ApplyUpdateDTO {
  /** 应聘人编码 */
  applyCode = '';

  /** 入职部门 */
  entryDept = '';

  /** 是否入职 */
  entryStatus = undefined;

  /** 面试记录 */
  interviewListDTOS = [];

  /** 应聘人id */
  personCode = '';

  /** 应聘岗位id */
  postCode = '';

  /** 应聘结果 */
  postResult = undefined;

  /** 应聘时间 */
  postStartAt = '';

  /** 备注 */
  remark = '';
}

class AuthUserInfo {
  /** accessToken */
  accessToken = '';

  /** clientId */
  clientId = '';

  /** clientSecret */
  clientSecret = '';

  /** password */
  password = '';

  /** tenantCode */
  tenantCode = '';

  /** userId */
  userId = undefined;

  /** username */
  username = '';
}

class CandidatesMoveObjects {
  /** moves */
  moves = [];

  /** 目标人才库id */
  toPoolCode = '';
}

class CertificationCenterUsers {
  /** CertificationCenterUsersid */
  userId = undefined;

  /** CertificationCenterUsers名 */
  username = '';
}

class CopyPersonDTO {
  /** 人才id列表 */
  personCodes = [];

  /** 人才库id */
  poolCode = '';
}

class DeferredResult {
  /** result */
  result = undefined;

  /** setOrExpired */
  setOrExpired = false;
}

class DictionaryObjectDTO {
  /** 字典代码 */
  dictCode = undefined;

  /** 字典类型 */
  dictType = '';

  /** 字典内容 */
  dictValue = '';
}

class EmployeeAddDTO {
  /** 面试官所属部门 */
  departmentName = '';

  /** 面试官名称 */
  name = '';

  /** 面试官职位 */
  positionName = '';

  /** 面试官性别 */
  sex = undefined;
}

class EmployeeResultDTO {
  /** 面试官所属部门 */
  departmentName = '';

  /** 面试官code */
  employeeCode = '';

  /** 面试官名称 */
  name = '';

  /** 面试官职位 */
  positionName = '';

  /** 面试官性别 */
  sex = undefined;

  /** 面试官性别 */
  sexDesc = '';
}

class EmployeeUpdateDTO {
  /** 面试官所属部门 */
  departmentName = '';

  /** 面试官code */
  employeeCode = '';

  /** 面试官名称 */
  name = '';

  /** 面试官职位 */
  positionName = '';

  /** 面试官性别 */
  sex = undefined;
}

class HrmInterview {
  /** 应聘记录Code */
  applyCode = '';

  /** 面试反馈 */
  feedback = '';

  /** 是否是终面 */
  finalRound = undefined;

  /** 面试时间 */
  interviewAt = '';

  /** 面试记录Code */
  interviewCode = '';

  /** 面试结果，0尚未开始 1未参加面试 2未通过 3待定 4已通过 */
  interviewResult = undefined;

  /** 面试官Code */
  interviewerEmployeeCode = '';

  /** 面试官名称 */
  interviewerEmployeeName = '';

  /** 面试地点 */
  location = '';

  /** 面试方式，1电话面试、2面对面 */
  method = undefined;

  /** 应聘人员Code */
  personCode = '';

  /** 预约时间 */
  reserveAt = '';

  /** 面试轮数 */
  round = undefined;

  /** tenantCode */
  tenantCode = '';
}

class HrmInterviewDTO {
  /** 应聘记录Code */
  applyCode = '';

  /** 面试反馈 */
  feedback = '';

  /** 是否是终面 */
  finalRound = undefined;

  /** 是否是终面 */
  finalRoundDesc = '';

  /** 面试时间 */
  interviewAt = '';

  /** 面试记录Code */
  interviewCode = '';

  /** 面试结果，0尚未开始 1未参加面试 2未通过 3待定 4已通过 */
  interviewResult = undefined;

  /** 面试结果描述 */
  interviewResultDesc = '';

  /** 面试官Code */
  interviewerEmployeeCode = '';

  /** 面试官名称 */
  interviewerEmployeeName = '';

  /** 面试地点 */
  location = '';

  /** 面试方式，1电话面试、2面对面 */
  method = undefined;

  /** 面试方式描述 */
  methodDesc = '';

  /** 应聘人员Code */
  personCode = '';

  /** 岗位code */
  postCode = '';

  /** 面试岗位 */
  postName = '';

  /** 预约时间 */
  reserveAt = '';

  /** 面试轮数 */
  round = undefined;

  /** tenantCode */
  tenantCode = '';
}

class HrmPersonPool {
  /** 上级目录Code */
  parentPoolCode = '';

  /** 目录Code */
  poolCode = '';

  /** 目录名称 */
  poolName = '';
}

class InterviewListDTO {
  /** 应聘记录的code */
  applyCode = '';

  /** 反馈 */
  feedback = '';

  /** 面试时间 */
  interviewAt = '';

  /** 面试记录Code */
  interviewCode = '';

  /** 面试结果 */
  interviewResult = undefined;

  /** 面试结果描述 */
  interviewResultDesc = '';

  /** 面试官 */
  interviewerEmployeeName = '';

  /** 面试地点 */
  location = '';

  /** 面试方式 */
  method = undefined;

  /** 面试方式描述 */
  methodDesc = '';

  /** 应聘人Code */
  personCode = '';

  /** 应聘人名称 */
  personName = '';

  /** 面试岗位Code */
  postCode = '';

  /** 面试岗位 */
  postName = '';

  /** 预约时间 */
  reserveAt = '';

  /** 面试轮数 */
  round = undefined;
}

class InterviewRecordAddDTO {
  /** 反馈 */
  feedback = '';

  /** 是否终面 */
  finalRound = undefined;

  /** 面试时间 */
  interviewAt = '';

  /** 面试结果 */
  interviewResult = undefined;

  /** 面试官id */
  interviewerEmployeeCode = '';

  /** 面试官姓名 */
  interviewerEmployeeName = '';

  /** 面试地点 */
  location = '';

  /** 面试方式 */
  method = undefined;

  /** 预约时间 */
  reserveAt = '';

  /** 面试轮数 */
  round = undefined;
}

class InterviewResultAddDTO {
  /** 反馈 */
  feedback = '';

  /** 面试时间 */
  interviewAt = '';

  /** 面试记录Code */
  interviewCode = '';

  /** 面试结果 */
  interviewResult = undefined;
}

class InterviewerEnumDTO {
  /** 面试官Code */
  interviewerCode = '';

  /** 面试官名称 */
  interviewerName = '';
}

class JobCategoryAddDTO {
  /** 字典内容 */
  dictValue = '';
}

class JobCategoryUpdateDTO {
  /** 字典内容 */
  dictCode = undefined;

  /** 字典内容 */
  dictValue = '';
}

class JobDetails {
  /** 需求个数 */
  needNum = undefined;

  /** postCode */
  postCode = '';

  /** 岗位名称 */
  postName = '';

  /** 岗位类别 */
  postType = undefined;
}

class MoveDTO {
  /** 源人才库id */
  fromPoolCode = '';

  /** 人才id */
  personCode = '';
}

class Page {
  /** list */
  list = [];

  /** page */
  page = undefined;

  /** pageSize */
  pageSize = undefined;

  /** total */
  total = undefined;
}

class PersonAddDTO {
  /** address */
  address = '';

  /** 最快到岗时间 */
  arrivalTime = '';

  /** 生日 */
  birthday = '';

  /** email */
  email = '';

  /** emergencyContact */
  emergencyContact = '';

  /** emergencyPhone */
  emergencyPhone = '';

  /** emergencyRelation */
  emergencyRelation = '';

  /** 工作经验 */
  experience = undefined;

  /** hasIntention */
  hasIntention = undefined;

  /** healthStatus */
  healthStatus = '';

  /** highGraduate */
  highGraduate = undefined;

  /** hobby */
  hobby = '';

  /** hopeMoney */
  hopeMoney = undefined;

  /** household */
  household = '';

  /** idNum */
  idNum = '';

  /** intentionRemark */
  intentionRemark = '';

  /** maritalStatus */
  maritalStatus = undefined;

  /** nation */
  nation = '';

  /** 姓名 */
  personName = '';

  /** 联系电话 */
  phone = '';

  /** 人才库编码 */
  poolCode = '';

  /** 岗位code */
  postCode = '';

  /** 岗位 */
  postName = '';

  /** pusherName */
  pusherName = '';

  /** registerLocation */
  registerLocation = '';

  /** 简历附件 */
  resumeAttachCode = '';

  /** 简历附件名称 */
  resumeAttachName = '';

  /** 简历来源 */
  resumeFrom = undefined;

  /** school */
  school = '';

  /** 性别 */
  sex = undefined;

  /** speciality */
  speciality = '';
}

class PersonDeleteDTO {
  /** 人才编码列表 */
  personCodes = [];

  /** 人才库编码 */
  poolCode = '';
}

class PersonResultDTO {
  /** 住址 */
  address = '';

  /** 年龄 */
  age = undefined;

  /** 最快到岗时间 */
  arrivalTime = '';

  /** 生日 */
  birthday = '';

  /** 人邮箱才编码 */
  email = '';

  /** 紧急联系人 */
  emergencyContact = '';

  /** 紧急联系人电话 */
  emergencyPhone = '';

  /** 与紧急联系人的关系 */
  emergencyRelation = '';

  /** 创建人编码 */
  employeeCode = '';

  /** 创建人姓名 */
  employeeName = '';

  /** 工作经验 */
  experience = undefined;

  /** 工作经验描述 */
  experienceDesc = '';

  /** 是否有意向 */
  hasIntention = undefined;

  /** 健康状况 */
  healthStatus = '';

  /** 最高学历 */
  highGraduate = undefined;

  /** 爱好 */
  hobby = '';

  /** 期望薪资 */
  hopeMoney = undefined;

  /** 户籍 */
  household = '';

  /** 身份证号 */
  idNum = '';

  /** 是否在回收站 */
  inRecycle = false;

  /** 意向备注 */
  intentionRemark = '';

  /** 婚姻状况 */
  maritalStatus = undefined;

  /** 民族 */
  nation = '';

  /** 人才编码 */
  personCode = '';

  /** 姓名 */
  personName = '';

  /** 联系电话 */
  phone = '';

  /** 人才库编码 */
  poolCode = '';

  /** 岗位code */
  postCode = '';

  /** 岗位名称 */
  postName = '';

  /** 内推人 */
  pusherName = '';

  /** 户口所在地 */
  registerLocation = '';

  /** 简历附件id */
  resumeAttachCode = '';

  /** 简历附件名称 */
  resumeAttachName = '';

  /** 简历来源 */
  resumeFrom = undefined;

  /** 毕业院系 */
  school = '';

  /** 性别 */
  sex = undefined;

  /** 专业 */
  speciality = '';
}

class PersonUpdateDTO {
  /** address */
  address = '';

  /** 最快到岗时间 */
  arrivalTime = '';

  /** 生日 */
  birthday = '';

  /** email */
  email = '';

  /** emergencyContact */
  emergencyContact = '';

  /** emergencyPhone */
  emergencyPhone = '';

  /** emergencyRelation */
  emergencyRelation = '';

  /** 工作经验 */
  experience = undefined;

  /** hasIntention */
  hasIntention = undefined;

  /** healthStatus */
  healthStatus = '';

  /** highGraduate */
  highGraduate = undefined;

  /** hobby */
  hobby = '';

  /** hopeMoney */
  hopeMoney = undefined;

  /** household */
  household = '';

  /** idNum */
  idNum = '';

  /** intentionRemark */
  intentionRemark = '';

  /** maritalStatus */
  maritalStatus = undefined;

  /** nation */
  nation = '';

  /** 人才编码 */
  personCode = '';

  /** 姓名 */
  personName = '';

  /** 联系电话 */
  phone = '';

  /** 人才库编码 */
  poolCode = '';

  /** 岗位code */
  postCode = '';

  /** 岗位 */
  postName = '';

  /** pusherName */
  pusherName = '';

  /** registerLocation */
  registerLocation = '';

  /** 简历附件 */
  resumeAttachCode = '';

  /** 简历附件名称 */
  resumeAttachName = '';

  /** 简历来源 */
  resumeFrom = undefined;

  /** school */
  school = '';

  /** 性别 */
  sex = undefined;

  /** speciality */
  speciality = '';
}

class PostDeleteDTO {
  /** 岗位编码 */
  postCode = '';
}

class PostEnumDTO {
  /** postCode */
  postCode = '';

  /** 职位名称 */
  postName = '';
}

class PostModificationDTO {
  /** 岗位编码 */
  postCode = '';

  /** 岗位名称 */
  postName = '';

  /** 岗位类别 */
  postType = undefined;
}

class TenantAddDTO {
  /** 管理员名 */
  adminName = '';

  /** 认证中心clientId */
  clientId = '';

  /** 认证中心clientSecret */
  clientSecret = '';

  /** 管理员密码 */
  password = '';

  /** 租户描述 */
  tenantDesc = '';

  /** 租户英文名 */
  tenantName = '';
}

class TenantResultDTO {
  /** adminId */
  adminId = undefined;

  /** adminName */
  adminName = '';

  /** adminPassword */
  adminPassword = '';

  /** domainName */
  domainName = '';

  /** tenantName */
  tenantName = '';
}

class TreeListDTO {
  /** 子集目录列表 */
  childrenDTOs = [];

  /** 是否放入回收站，-1放入回收站，0未放入回收站 */
  deleted = undefined;

  /** 上级目录Code */
  parentPoolCode = '';

  /** 目录Code */
  poolCode = '';

  /** 目录名称 */
  poolName = '';
}

export const recruitment = {
  AddDTO,
  ApplyAddDTO,
  ApplyDeleteDTO,
  ApplyResultDTO,
  ApplyUpdateDTO,
  AuthUserInfo,
  CandidatesMoveObjects,
  CertificationCenterUsers,
  CopyPersonDTO,
  DeferredResult,
  DictionaryObjectDTO,
  EmployeeAddDTO,
  EmployeeResultDTO,
  EmployeeUpdateDTO,
  HrmInterview,
  HrmInterviewDTO,
  HrmPersonPool,
  InterviewListDTO,
  InterviewRecordAddDTO,
  InterviewResultAddDTO,
  InterviewerEnumDTO,
  JobCategoryAddDTO,
  JobCategoryUpdateDTO,
  JobDetails,
  MoveDTO,
  Page,
  PersonAddDTO,
  PersonDeleteDTO,
  PersonResultDTO,
  PersonUpdateDTO,
  PostDeleteDTO,
  PostEnumDTO,
  PostModificationDTO,
  TenantAddDTO,
  TenantResultDTO,
  TreeListDTO
};
