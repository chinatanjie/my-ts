import {DataSource} from "@/components/ProTable/data";


export interface ICInformation extends DataSource {
  id?: string | number;
  physicalID?: string;
  cardNO?: string;
  category?: string;
  status?: string;
  idNO?: string;
  remarks?: string;
  personBaseInformation?:PersonBaseInformation;
  createTime?: Date;
  lastTime?: Date;
}

interface PersonBaseInformation extends DataSource {
  id?: string | number;
  name?: string;
  sex?: string;
  cardID?: string;
  phone?: string;
  mail?: string;
  /**
   * 备注
   */
  remarks?: string;
  createTime?: Date;
  lastTime?: Date;
  department?:string;
  identificationCode?:string;
}

export interface TeacherInformationType extends PersonBaseInformation {
  employeeID?: string;
  birth?: Date | string;
  hire?: Date | string;
  departmentID?:number;
  departmentName?: string;
  status?: string;
  ics?: ICInformation[]
}

export interface AdminInformationType extends PersonBaseInformation {
  employeeID?: string;
  birth?: Date;
  /**
   * 入职日期
   */
  hire?: Date;
  departmentID?:number;
  departmentName?: string;
  status?: string;
  /**
   * 职位
   */
  post?: string;
  /**
   * 权限级别
   */
  grade?: number;
  ics?: ICInformation[]
}

export interface ClassBaseInformation extends DataSource{
  id?:number;
  name?:string;
  duration?:number;
  departmentID?:number;
  departmentName?: string;
  leader?:number;
  leaderName?: string;
  icTeacherInformation?:TeacherInformationType;
  openClass?: Date | string;
  createTime?: Date| string;
  lastTime?: Date| string;
}

export interface StudentInformationType extends PersonBaseInformation {
  studentID?: string;
  enrollment?: Date | string;
  isGraduate?: boolean;
  status?: string;
  classID?:number;
  className?: string;
  ics?: ICInformation[];
  classBaseInformation?:ClassBaseInformation;
  birth?: Date;
}

export interface MaintenanceInformationType extends PersonBaseInformation {

  department?: string;
  ics?: ICInformation[];

}

export interface TemporaryInformationType extends PersonBaseInformation {
  department?: string;
  comment?: string;
  ics?: ICInformation[];

}

export interface RTSPConfigure {
  name: string;
  serialNumber: string;
  mainStream: string;
  viceStream: string;
}

export interface EquipmentListConfigure {
  serialNumber: string;
  configureName: string;
  jsonName: string;
  configureJsonName: string;
  arrayConfig: { [name: string]: string }
}

export interface ClassroomInformation extends DataSource {
  id?: number;
  name?: string;
  nameAlias?: string;
  floor?: number;
  buildName?: string;
  buildID?: number;
  terminalIP?: string;
  terminalID?: string;
  rtsp?: RTSPConfigure[];
  equipmentList?: EquipmentListConfigure[];
  category?: string;
  categoryID?: number;
  campus?: string;
  createTime?: Date;
  lastTime?: Date;
}

export interface BuildingInformation extends DataSource {
  id?: number;
  name?: string;
  nameAlias?: string;
  floors?: number;
  startFloor?: number;
  campus?: string;
  classrooms?: ClassroomInformation[];
  createTime?: Date;
  lastTime?: Date;
}

export interface CampusInformation extends DataSource {
  id?: number;
  name?: string;
  nameAlias?: string;
  buildings?: BuildingInformation[];
  createTime?: Date;
  lastTime?: Date;
}

export interface ClassroomCategoryInformation extends DataSource {
  id?: number;
  name?: string;
  equipmentList?: EquipmentListConfigure[];
  createTime?: Date;
  lastTime?: Date;
  classrooms?: ClassroomInformation[];
}

export interface LogClassroomSwipe extends DataSource{
  id?:number;
  physicalID?:string;
  ack?:boolean;
  time?:Date|string;
  payload?:string;
  classroomID?:number;
  classroomInformation?:ClassroomInformation;
  icInformation?:ICInformation;
}

export interface LogClassroomEquipment extends DataSource{
  id?:number;
  listData?:JSON;
  time?:Date|string;
  payload?:string;
  infoClassroomID?:number;
  classroomInformation?:ClassroomInformation;

}


export type ICCardStatusPredefineType='UNACTIVATED'|'ACTIVATED'|'LOSS'|'INVALID'|'BLACKLIST'|'LOCK'|'PAUSE';
export type ICCategoryPredefineType='ADMIN'|'TEACHER'|'STUDENT'|'TEMP'|'MAINTENANCE';
export type SexualityPredefineType='MALE'|'FEMALE';