type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value;
};

interface AjaxResponse<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

declare namespace defs {
  export namespace recruitment {
    export class AddDTO {
      /** 岗位名称 */
      postName: string;

      /** 岗位类别 */
      postType?: number;
    }

    export class ApplyAddDTO {
      /** 入职部门 */
      entryDept?: string;

      /** 是否入职 */
      entryStatus?: number;

      /** 面试记录 */
      interviewListDTOS?: Array<defs.recruitment.InterviewRecordAddDTO>;

      /** 应聘人id */
      personCode?: string;

      /** 应聘岗位id */
      postCode?: string;

      /** 应聘结果 */
      postResult?: number;

      /** 应聘时间 */
      postStartAt?: string;

      /** 备注 */
      remark?: string;
    }

    export class ApplyDeleteDTO {
      /** 应聘人编码 */
      applyCode: string;
    }

    export class ApplyResultDTO {
      /** 应聘人id */
      applyCode: string;

      /** 入职部门 */
      entryDept?: string;

      /** 是否入职 */
      entryStatus?: number;

      /** 面试记录 */
      interviewListDTOS?: Array<defs.recruitment.InterviewListDTO>;

      /** 应聘人id */
      personCode: string;

      /** 应聘人姓名 */
      personName: string;

      /** 应聘岗位编码 */
      postCode: string;

      /** 应聘终止时间 */
      postEndAt?: string;

      /** 应聘岗位名称 */
      postName: string;

      /** 应聘结果 */
      postResult?: number;

      /** 应聘起始时间 */
      postStartAt?: string;

      /** 备注 */
      remark?: string;
    }

    export class ApplyUpdateDTO {
      /** 应聘人编码 */
      applyCode: string;

      /** 入职部门 */
      entryDept?: string;

      /** 是否入职 */
      entryStatus?: number;

      /** 面试记录 */
      interviewListDTOS?: Array<defs.recruitment.InterviewRecordAddDTO>;

      /** 应聘人id */
      personCode?: string;

      /** 应聘岗位id */
      postCode?: string;

      /** 应聘结果 */
      postResult?: number;

      /** 应聘时间 */
      postStartAt?: string;

      /** 备注 */
      remark?: string;
    }

    export class AuthUserInfo {
      /** accessToken */
      accessToken?: string;

      /** clientId */
      clientId?: string;

      /** clientSecret */
      clientSecret?: string;

      /** password */
      password?: string;

      /** tenantCode */
      tenantCode?: string;

      /** userId */
      userId?: number;

      /** username */
      username?: string;
    }

    export class CandidatesMoveObjects {
      /** moves */
      moves?: Array<defs.recruitment.MoveDTO>;

      /** 目标人才库id */
      toPoolCode?: string;
    }

    export class CertificationCenterUsers {
      /** CertificationCenterUsersid */
      userId?: number;

      /** CertificationCenterUsers名 */
      username?: string;
    }

    export class CopyPersonDTO {
      /** 人才id列表 */
      personCodes?: Array<string>;

      /** 人才库id */
      poolCode?: string;
    }

    export class DeferredResult<T0 = any> {
      /** result */
      result?: object;

      /** setOrExpired */
      setOrExpired?: boolean;
    }

    export class DictionaryObjectDTO {
      /** 字典代码 */
      dictCode?: number;

      /** 字典类型 */
      dictType?: string;

      /** 字典内容 */
      dictValue?: string;
    }

    export class EmployeeAddDTO {
      /** 面试官所属部门 */
      departmentName?: string;

      /** 面试官名称 */
      name: string;

      /** 面试官职位 */
      positionName?: string;

      /** 面试官性别 */
      sex?: number;
    }

    export class EmployeeResultDTO {
      /** 面试官所属部门 */
      departmentName?: string;

      /** 面试官code */
      employeeCode: string;

      /** 面试官名称 */
      name: string;

      /** 面试官职位 */
      positionName?: string;

      /** 面试官性别 */
      sex?: number;

      /** 面试官性别 */
      sexDesc?: string;
    }

    export class EmployeeUpdateDTO {
      /** 面试官所属部门 */
      departmentName?: string;

      /** 面试官code */
      employeeCode: string;

      /** 面试官名称 */
      name: string;

      /** 面试官职位 */
      positionName?: string;

      /** 面试官性别 */
      sex?: number;
    }

    export class HrmInterview {
      /** 应聘记录Code */
      applyCode: string;

      /** 面试反馈 */
      feedback?: string;

      /** 是否是终面 */
      finalRound: number;

      /** 面试时间 */
      interviewAt?: string;

      /** 面试记录Code */
      interviewCode?: string;

      /** 面试结果，0尚未开始 1未参加面试 2未通过 3待定 4已通过 */
      interviewResult: number;

      /** 面试官Code */
      interviewerEmployeeCode: string;

      /** 面试官名称 */
      interviewerEmployeeName?: string;

      /** 面试地点 */
      location: string;

      /** 面试方式，1电话面试、2面对面 */
      method: number;

      /** 应聘人员Code */
      personCode: string;

      /** 预约时间 */
      reserveAt: string;

      /** 面试轮数 */
      round: number;

      /** tenantCode */
      tenantCode?: string;
    }

    export class HrmInterviewDTO {
      /** 应聘记录Code */
      applyCode: string;

      /** 面试反馈 */
      feedback?: string;

      /** 是否是终面 */
      finalRound: number;

      /** 是否是终面 */
      finalRoundDesc?: string;

      /** 面试时间 */
      interviewAt?: string;

      /** 面试记录Code */
      interviewCode?: string;

      /** 面试结果，0尚未开始 1未参加面试 2未通过 3待定 4已通过 */
      interviewResult: number;

      /** 面试结果描述 */
      interviewResultDesc?: string;

      /** 面试官Code */
      interviewerEmployeeCode: string;

      /** 面试官名称 */
      interviewerEmployeeName?: string;

      /** 面试地点 */
      location: string;

      /** 面试方式，1电话面试、2面对面 */
      method: number;

      /** 面试方式描述 */
      methodDesc?: string;

      /** 应聘人员Code */
      personCode: string;

      /** 岗位code */
      postCode?: string;

      /** 面试岗位 */
      postName?: string;

      /** 预约时间 */
      reserveAt: string;

      /** 面试轮数 */
      round: number;

      /** tenantCode */
      tenantCode?: string;
    }

    export class HrmPersonPool {
      /** 上级目录Code */
      parentPoolCode: string;

      /** 目录Code */
      poolCode?: string;

      /** 目录名称 */
      poolName: string;
    }

    export class InterviewListDTO {
      /** 应聘记录的code */
      applyCode?: string;

      /** 反馈 */
      feedback?: string;

      /** 面试时间 */
      interviewAt?: string;

      /** 面试记录Code */
      interviewCode?: string;

      /** 面试结果 */
      interviewResult?: number;

      /** 面试结果描述 */
      interviewResultDesc?: string;

      /** 面试官 */
      interviewerEmployeeName?: string;

      /** 面试地点 */
      location?: string;

      /** 面试方式 */
      method?: number;

      /** 面试方式描述 */
      methodDesc?: string;

      /** 应聘人Code */
      personCode?: string;

      /** 应聘人名称 */
      personName?: string;

      /** 面试岗位Code */
      postCode?: string;

      /** 面试岗位 */
      postName?: string;

      /** 预约时间 */
      reserveAt?: string;

      /** 面试轮数 */
      round?: number;
    }

    export class InterviewRecordAddDTO {
      /** 反馈 */
      feedback?: string;

      /** 是否终面 */
      finalRound?: number;

      /** 面试时间 */
      interviewAt?: string;

      /** 面试结果 */
      interviewResult?: number;

      /** 面试官id */
      interviewerEmployeeCode?: string;

      /** 面试官姓名 */
      interviewerEmployeeName?: string;

      /** 面试地点 */
      location?: string;

      /** 面试方式 */
      method?: number;

      /** 预约时间 */
      reserveAt?: string;

      /** 面试轮数 */
      round?: number;
    }

    export class InterviewResultAddDTO {
      /** 反馈 */
      feedback?: string;

      /** 面试时间 */
      interviewAt: string;

      /** 面试记录Code */
      interviewCode: string;

      /** 面试结果 */
      interviewResult: number;
    }

    export class InterviewerEnumDTO {
      /** 面试官Code */
      interviewerCode?: string;

      /** 面试官名称 */
      interviewerName?: string;
    }

    export class JobCategoryAddDTO {
      /** 字典内容 */
      dictValue: string;
    }

    export class JobCategoryUpdateDTO {
      /** 字典内容 */
      dictCode: number;

      /** 字典内容 */
      dictValue: string;
    }

    export class JobDetails {
      /** 需求个数 */
      needNum?: number;

      /** postCode */
      postCode?: string;

      /** 岗位名称 */
      postName?: string;

      /** 岗位类别 */
      postType?: number;
    }

    export class MoveDTO {
      /** 源人才库id */
      fromPoolCode?: string;

      /** 人才id */
      personCode?: string;
    }

    export class Page<T0 = any> {
      /** list */
      list?: Array<T0>;

      /** page */
      page?: number;

      /** pageSize */
      pageSize?: number;

      /** total */
      total?: number;
    }

    export class PersonAddDTO {
      /** address */
      address?: string;

      /** 最快到岗时间 */
      arrivalTime: string;

      /** 生日 */
      birthday: string;

      /** email */
      email?: string;

      /** emergencyContact */
      emergencyContact?: string;

      /** emergencyPhone */
      emergencyPhone?: string;

      /** emergencyRelation */
      emergencyRelation?: string;

      /** 工作经验 */
      experience: number;

      /** hasIntention */
      hasIntention?: number;

      /** healthStatus */
      healthStatus?: string;

      /** highGraduate */
      highGraduate?: number;

      /** hobby */
      hobby?: string;

      /** hopeMoney */
      hopeMoney?: number;

      /** household */
      household?: string;

      /** idNum */
      idNum?: string;

      /** intentionRemark */
      intentionRemark?: string;

      /** maritalStatus */
      maritalStatus?: number;

      /** nation */
      nation?: string;

      /** 姓名 */
      personName: string;

      /** 联系电话 */
      phone: string;

      /** 人才库编码 */
      poolCode?: string;

      /** 岗位code */
      postCode?: string;

      /** 岗位 */
      postName: string;

      /** pusherName */
      pusherName?: string;

      /** registerLocation */
      registerLocation?: string;

      /** 简历附件 */
      resumeAttachCode?: string;

      /** 简历附件名称 */
      resumeAttachName?: string;

      /** 简历来源 */
      resumeFrom?: number;

      /** school */
      school?: string;

      /** 性别 */
      sex: number;

      /** speciality */
      speciality?: string;
    }

    export class PersonDeleteDTO {
      /** 人才编码列表 */
      personCodes: Array<string>;

      /** 人才库编码 */
      poolCode?: string;
    }

    export class PersonResultDTO {
      /** 住址 */
      address?: string;

      /** 年龄 */
      age?: number;

      /** 最快到岗时间 */
      arrivalTime: string;

      /** 生日 */
      birthday?: string;

      /** 人邮箱才编码 */
      email?: string;

      /** 紧急联系人 */
      emergencyContact?: string;

      /** 紧急联系人电话 */
      emergencyPhone?: string;

      /** 与紧急联系人的关系 */
      emergencyRelation?: string;

      /** 创建人编码 */
      employeeCode?: string;

      /** 创建人姓名 */
      employeeName?: string;

      /** 工作经验 */
      experience: number;

      /** 工作经验描述 */
      experienceDesc: string;

      /** 是否有意向 */
      hasIntention?: number;

      /** 健康状况 */
      healthStatus?: string;

      /** 最高学历 */
      highGraduate?: number;

      /** 爱好 */
      hobby?: string;

      /** 期望薪资 */
      hopeMoney?: number;

      /** 户籍 */
      household?: string;

      /** 身份证号 */
      idNum?: string;

      /** 是否在回收站 */
      inRecycle?: boolean;

      /** 意向备注 */
      intentionRemark?: string;

      /** 婚姻状况 */
      maritalStatus?: number;

      /** 民族 */
      nation?: string;

      /** 人才编码 */
      personCode: string;

      /** 姓名 */
      personName: string;

      /** 联系电话 */
      phone: string;

      /** 人才库编码 */
      poolCode?: string;

      /** 岗位code */
      postCode: string;

      /** 岗位名称 */
      postName: string;

      /** 内推人 */
      pusherName?: string;

      /** 户口所在地 */
      registerLocation?: string;

      /** 简历附件id */
      resumeAttachCode?: string;

      /** 简历附件名称 */
      resumeAttachName?: string;

      /** 简历来源 */
      resumeFrom?: number;

      /** 毕业院系 */
      school?: string;

      /** 性别 */
      sex: number;

      /** 专业 */
      speciality?: string;
    }

    export class PersonUpdateDTO {
      /** address */
      address?: string;

      /** 最快到岗时间 */
      arrivalTime: string;

      /** 生日 */
      birthday: string;

      /** email */
      email?: string;

      /** emergencyContact */
      emergencyContact?: string;

      /** emergencyPhone */
      emergencyPhone?: string;

      /** emergencyRelation */
      emergencyRelation?: string;

      /** 工作经验 */
      experience: number;

      /** hasIntention */
      hasIntention?: number;

      /** healthStatus */
      healthStatus?: string;

      /** highGraduate */
      highGraduate?: number;

      /** hobby */
      hobby?: string;

      /** hopeMoney */
      hopeMoney?: number;

      /** household */
      household?: string;

      /** idNum */
      idNum?: string;

      /** intentionRemark */
      intentionRemark?: string;

      /** maritalStatus */
      maritalStatus?: number;

      /** nation */
      nation?: string;

      /** 人才编码 */
      personCode: string;

      /** 姓名 */
      personName: string;

      /** 联系电话 */
      phone: string;

      /** 人才库编码 */
      poolCode?: string;

      /** 岗位code */
      postCode?: string;

      /** 岗位 */
      postName: string;

      /** pusherName */
      pusherName?: string;

      /** registerLocation */
      registerLocation?: string;

      /** 简历附件 */
      resumeAttachCode?: string;

      /** 简历附件名称 */
      resumeAttachName?: string;

      /** 简历来源 */
      resumeFrom?: number;

      /** school */
      school?: string;

      /** 性别 */
      sex: number;

      /** speciality */
      speciality?: string;
    }

    export class PostDeleteDTO {
      /** 岗位编码 */
      postCode: string;
    }

    export class PostEnumDTO {
      /** postCode */
      postCode?: string;

      /** 职位名称 */
      postName?: string;
    }

    export class PostModificationDTO {
      /** 岗位编码 */
      postCode: string;

      /** 岗位名称 */
      postName: string;

      /** 岗位类别 */
      postType?: number;
    }

    export class TenantAddDTO {
      /** 管理员名 */
      adminName?: string;

      /** 认证中心clientId */
      clientId?: string;

      /** 认证中心clientSecret */
      clientSecret?: string;

      /** 管理员密码 */
      password?: string;

      /** 租户描述 */
      tenantDesc?: string;

      /** 租户英文名 */
      tenantName?: string;
    }

    export class TenantResultDTO {
      /** adminId */
      adminId?: number;

      /** adminName */
      adminName?: string;

      /** adminPassword */
      adminPassword?: string;

      /** domainName */
      domainName?: string;

      /** tenantName */
      tenantName?: string;
    }

    export class TreeListDTO {
      /** 子集目录列表 */
      childrenDTOs?: Array<defs.recruitment.TreeListDTO>;

      /** 是否放入回收站，-1放入回收站，0未放入回收站 */
      deleted?: number;

      /** 上级目录Code */
      parentPoolCode?: string;

      /** 目录Code */
      poolCode?: string;

      /** 目录名称 */
      poolName: string;
    }
  }
}

declare namespace API {
  export namespace recruitment {
    /**
     * 应聘管理相关接口
     */
    export namespace apply {
      /**
       * 添加应聘信息
       * /apply/addApply
       */
      export namespace addApply {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.ApplyAddDTO,
        ): Promise<AjaxResponse<Response>>;
      }

      /**
       * 删除应聘信息
       * /apply/delApply
       */
      export namespace delApply {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.ApplyDeleteDTO,
        ): Promise<AjaxResponse<Response>>;
      }

      /**
       * 获取应聘信息
       * /apply/getApply
       */
      export namespace getApply {
        export class Params {
          /** 人才编码 */
          personCode: string;
        }

        export type Response = Array<defs.recruitment.ApplyResultDTO>;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 更改应聘信息
       * /apply/updateApply
       */
      export namespace updateApply {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.ApplyUpdateDTO,
        ): Promise<AjaxResponse<Response>>;
      }
    }

    /**
     * 认证相关接口
     */
    export namespace auth {
      /**
       * 获取当前登录用户信息
       * /auth/user
       */
      export namespace getUserInfo {
        export class Params {}

        export type Response = defs.recruitment.AuthUserInfo;

        export const init: Response;

        export function fetch(): Promise<AjaxResponse<Response>>;
      }
    }

    /**
     * 上传文件相关接口
     */
    export namespace basic {
      /**
       * 上传文件接口
       * /basic/uploadFile
       */
      export namespace uploadFile {
        export class Params {}

        export type Response = string;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }
    }

    /**
     * 字典相关接口
     */
    export namespace dict {
      /**
       * 获取所有字典
       * /dict/getAllDict
       */
      export namespace getAllDict {
        export class Params {}

        export type Response = ObjectMap<
          any,
          Array<defs.recruitment.DictionaryObjectDTO>
        >;

        export const init: Response;

        export function fetch(): Promise<AjaxResponse<Response>>;
      }

      /**
       * 更新所有字典
       * /dict/updateAllDict
       */
      export namespace updateAllDict {
        export class Params {}

        export type Response = ObjectMap<
          any,
          Array<defs.recruitment.DictionaryObjectDTO>
        >;

        export const init: Response;

        export function fetch(): Promise<AjaxResponse<Response>>;
      }
    }

    /**
     * 面试官相关接口
     */
    export namespace employee {
      /**
       * 添加面试官信息
       * /employee/addEmployee
       */
      export namespace addEmployee {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.EmployeeAddDTO,
        ): Promise<AjaxResponse<Response>>;
      }

      /**
       * 删除面试官信息
       * /employee/delEmployee
       */
      export namespace delEmployee {
        export class Params {
          /** 面试官code */
          employeeCode: string;
        }

        export type Response = number;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 分页查询面试官信息
       * /employee/queryEmployee
       */
      export namespace queryEmployee {
        export class Params {
          /** 面试官所属部门 */
          departmentName?: string;
          /** 面试官名称 */
          name?: string;
          /** page */
          page?: number;
          /** pageSize */
          pageSize?: number;
          /** 面试官职位 */
          positionName?: string;
          /** 面试官性别 */
          sex?: number;
        }

        export type Response = defs.recruitment.Page<
          defs.recruitment.EmployeeResultDTO
        >;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 更改面试官信息
       * /employee/updateEmployee
       */
      export namespace updateEmployee {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.EmployeeUpdateDTO,
        ): Promise<AjaxResponse<Response>>;
      }
    }

    /**
     * 面试管理相关接口
     */
    export namespace interview {
      /**
       * 添加预约面试
       * /interview/addInterview
       */
      export namespace addInterview {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.HrmInterview,
        ): Promise<AjaxResponse<Response>>;
      }

      /**
       * 添加面试结果
       * /interview/addInterviewerResult
       */
      export namespace addInterviewerResult {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.InterviewResultAddDTO,
        ): Promise<AjaxResponse<Response>>;
      }

      /**
       * 删除面试记录
       * /interview/deleteInterviewer
       */
      export namespace deleteInterviewer {
        export class Params {
          /** 面试code列表 */
          interviewCode: string;
        }

        export type Response = number;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 获取应聘详情中面试管理列表
       * /interview/getInterviewListByApplying
       */
      export namespace getInterviewListByApplying {
        export class Params {
          /** 应聘的code */
          applyCode: string;
        }

        export type Response = Array<defs.recruitment.InterviewListDTO>;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 获取面试详情
       * /interview/getInterviewerDetail
       */
      export namespace getInterviewDetail {
        export class Params {
          /** 面试code */
          interviewCode: string;
        }

        export type Response = defs.recruitment.HrmInterviewDTO;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 获取面试官选择列表
       * /interview/getInterviewerEnums
       */
      export namespace getInterviewerEnums {
        export class Params {}

        export type Response = Array<defs.recruitment.InterviewerEnumDTO>;

        export const init: Response;

        export function fetch(): Promise<AjaxResponse<Response>>;
      }

      /**
       * 获取岗位信息选择列表
       * /interview/getPostEnums
       */
      export namespace getPostEnums {
        export class Params {}

        export type Response = Array<defs.recruitment.PostEnumDTO>;

        export const init: Response;

        export function fetch(): Promise<AjaxResponse<Response>>;
      }

      /**
       * 获取应聘中面试管理列表
       * /interview/queryApplyingInterviewList
       */
      export namespace queryApplyingInterviewList {
        export class Params {
          /** 是否是终面 */
          finalRound?: number;
          /** 面试结果 */
          interviewResult?: number;
          /** 面试官Code */
          interviewerEmployeeCode?: string;
          /** 页码 */
          page?: number;
          /** 行数 */
          pageSize?: number;
          /** 应聘人名称 */
          personName?: string;
          /** 面试岗位Code */
          postCode?: string;
          /** 面试轮数 */
          round?: number;
        }

        export type Response = defs.recruitment.Page<
          defs.recruitment.InterviewListDTO
        >;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 获取结束面试管理列表
       * /interview/queryFinishInterviewList
       */
      export namespace queryFinishInterviewList {
        export class Params {
          /** 是否是终面 */
          finalRound?: number;
          /** 面试结果 */
          interviewResult?: number;
          /** 面试官Code */
          interviewerEmployeeCode?: string;
          /** 页码 */
          page?: number;
          /** 行数 */
          pageSize?: number;
          /** 应聘人名称 */
          personName?: string;
          /** 面试岗位Code */
          postCode?: string;
          /** 面试轮数 */
          round?: number;
        }

        export type Response = defs.recruitment.Page<
          defs.recruitment.InterviewListDTO
        >;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 更新预约面试
       * /interview/updateInterview
       */
      export namespace updateInterview {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.HrmInterview,
        ): Promise<AjaxResponse<Response>>;
      }
    }

    /**
     * 岗位类型相关接口
     */
    export namespace jobCategory {
      /**
       * 添加岗位类型
       * /jobCategory/addJobCategory
       */
      export namespace addJobCategory {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.JobCategoryAddDTO,
        ): Promise<AjaxResponse<Response>>;
      }

      /**
       * 删除岗位类型
       * /jobCategory/deleteJobCategory
       */
      export namespace deleteJobCategory {
        export class Params {
          /** 岗位类型dictCode */
          dictCode?: ref;
        }

        export type Response = number;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 获取所有岗位类型
       * /jobCategory/getJobCategoryList
       */
      export namespace getJobCategoryList {
        export class Params {
          /** 岗位类型 */
          dictValue?: string;
        }

        export type Response = Array<defs.recruitment.DictionaryObjectDTO>;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 更新岗位类型
       * /jobCategory/updateJobCategory
       */
      export namespace updateJobCategory {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.JobCategoryUpdateDTO,
        ): Promise<AjaxResponse<Response>>;
      }
    }

    /**
     * 人才管理
     */
    export namespace person {
      /**
       * 新增人才
       * /person/addPerson
       */
      export namespace addPerson {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.PersonAddDTO,
        ): Promise<AjaxResponse<Response>>;
      }

      /**
       * 添加到人才目录
       * /person/copyPerson
       */
      export namespace copyPerson {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.CopyPersonDTO,
        ): Promise<AjaxResponse<Response>>;
      }

      /**
       * 删除人才详情
       * /person/delPerson
       */
      export namespace delPerson {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.PersonDeleteDTO,
        ): Promise<AjaxResponse<Response>>;
      }

      /**
       * 获取人才详情
       * /person/getPerson
       */
      export namespace getPerson {
        export class Params {
          /** 人才编码 */
          personCode: string;
        }

        export type Response = defs.recruitment.PersonResultDTO;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 移动至人才目录
       * /person/movePerson
       */
      export namespace movePerson {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.CandidatesMoveObjects,
        ): Promise<AjaxResponse<Response>>;
      }

      /**
       * 获取人才列表
       * /person/queryPerson
       */
      export namespace queryPerson {
        export class Params {
          /** 创建人 */
          employeeName?: string;
          /** 年龄区间-结束年龄 */
          endAge?: number;
          /** 工作经验 */
          experience?: number;
          /** 是否有意向 */
          hasIntention?: number;
          /** 起始页 */
          page?: number;
          /** 页长 */
          pageSize?: number;
          /** 姓名 */
          personName?: string;
          /** 联系方式 */
          phone?: string;
          /** 人才库编码 */
          poolCode?: string;
          /** 岗位 */
          postName?: string;
          /** 性别 */
          sex?: number;
          /** 年龄区间-开始年龄 */
          startAge?: number;
        }

        export type Response = defs.recruitment.Page<
          defs.recruitment.PersonResultDTO
        >;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 从回收站恢复
       * /person/recoverPerson
       */
      export namespace recoverPerson {
        export class Params {
          /** 人才编码 */
          personCode: string;
        }

        export type Response = number;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 更新人才
       * /person/updatePerson
       */
      export namespace updatePerson {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.PersonUpdateDTO,
        ): Promise<AjaxResponse<Response>>;
      }
    }

    /**
     * 人才目录管理
     */
    export namespace personPool {
      /**
       * 添加人才池目录
       * /personPool/addPersonPool
       */
      export namespace addPersonPool {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.HrmPersonPool,
        ): Promise<AjaxResponse<Response>>;
      }

      /**
       * 清空回收站
       * /personPool/clearRecycleBin
       */
      export namespace clearRecycleBin {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(): Promise<AjaxResponse<Response>>;
      }

      /**
       * 删除人才池目录
       * /personPool/delPersonPool
       */
      export namespace delPersonPool {
        export class Params {
          /** 人才目录code */
          poolCode: string;
        }

        export type Response = number;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 获取人才池目录
       * /personPool/getPersonPool
       */
      export namespace getPersonPool {
        export class Params {}

        export type Response = defs.recruitment.TreeListDTO;

        export const init: Response;

        export function fetch(): Promise<AjaxResponse<Response>>;
      }

      /**
       * 获取人才目录详情
       * /personPool/getPersonPoolDetail
       */
      export namespace getPersonPoolDetail {
        export class Params {
          /** 人才目录code */
          poolCode: string;
        }

        export type Response = defs.recruitment.TreeListDTO;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 从回收站恢复人才池目录
       * /personPool/restorePersonPool
       */
      export namespace restorePersonPool {
        export class Params {
          /** 人才目录code */
          poolCode: string;
        }

        export type Response = number;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 更新人才池目录
       * /personPool/updatePersonPool
       */
      export namespace updatePersonPool {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.HrmPersonPool,
        ): Promise<AjaxResponse<Response>>;
      }
    }

    /**
     * 岗位管理相关接口
     */
    export namespace post {
      /**
       * 添加岗位信息
       * /post/addPost
       */
      export namespace addApply {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.AddDTO,
        ): Promise<AjaxResponse<Response>>;
      }

      /**
       * 删除岗位信息
       * /post/delPost
       */
      export namespace delPost {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.PostDeleteDTO,
        ): Promise<AjaxResponse<Response>>;
      }

      /**
       * 获取岗位信息
       * /post/getPost
       */
      export namespace getPost {
        export class Params {
          /** 岗位编码 */
          postCode: string;
        }

        export type Response = defs.recruitment.JobDetails;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 分页查询岗位信息
       * /post/queryPost
       */
      export namespace queryPost {
        export class Params {
          /** page */
          page?: number;
          /** pageSize */
          pageSize?: number;
          /** 岗位名称 */
          postName?: string;
          /** 岗位类别 */
          postType?: number;
        }

        export type Response = defs.recruitment.Page<
          defs.recruitment.JobDetails
        >;

        export const init: Response;

        export function fetch(params: Params): Promise<AjaxResponse<Response>>;
      }

      /**
       * 更改岗位信息
       * /post/updatePost
       */
      export namespace updatePost {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.PostModificationDTO,
        ): Promise<AjaxResponse<Response>>;
      }
    }

    /**
     * 多租户相关接口
     */
    export namespace tenant {
      /**
       * 添加租户下用户
       * /tenant/addTenantUser
       */
      export namespace addTenantUser {
        export class Params {}

        export type Response = number;

        export const init: Response;

        export function fetch(
          bodyParams: Array<defs.recruitment.CertificationCenterUsers>,
        ): Promise<AjaxResponse<Response>>;
      }

      /**
       * 初始化租户信息
       * /tenant/init
       */
      export namespace initTenant {
        export class Params {}

        export type Response = defs.recruitment.DeferredResult<
          defs.recruitment.TenantResultDTO
        >;

        export const init: Response;

        export function fetch(
          bodyParams: defs.recruitment.TenantAddDTO,
        ): Promise<AjaxResponse<Response>>;
      }
    }
  }
}
