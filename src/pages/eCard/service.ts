import request ,{GenericResult, Restful} from '@/utils/request';
import {
  AdminInformationType,
  BuildingInformation,
  CampusInformation,
  ClassroomCategoryInformation,
  ClassroomInformation, EquipmentListConfigure, ICInformation, LogClassroomSwipe,
  MaintenanceInformationType,
  StudentInformationType,
  TeacherInformationType,
  TemporaryInformationType
} from './data.d';

import {Moment} from "moment";

export async function getClassroom(params: {
  campus?: string;
  building?: string;
  name?: string;
  floor?: number;
  category?: string;
  fuzzy?: boolean;
  page?: number;
  pageSize?: number,
}) {
  return request.get<Restful<GenericResult<ClassroomInformation[]>>>('/api/information/classroom/config/classroom', {params});
}

export async function insertClassroom(params: {
  campus?: string;
  building?: string;
  name?: string;
  floor?: number;
  category?: string;
}) {
  return request.post<Restful<ClassroomInformation>>('/api/information/classroom/config/classroom', {params});
}

export async function updateClassroom(params: {
  campus?: string;
  building?: string;
  name?: string;
  floor?: number;
  category?: string;
}) {
  return request.put<Restful<ClassroomInformation>>('/api/information/classroom/config/classroom', {params});
}

export async function deleteClassroom(params: {
  campus?: string;
  building?: string;
  name?: string;
  floor?: number;
  category?: string;
}) {
  return request.delete<Restful<ClassroomInformation>>('/api/information/classroom/config/classroom', {params});
}

export async function getBuilding(params: {
  campus?: string,
  name?: string,
  floors?: number,
  startFloor?: number,
  classrooms?: number
}) {
  return request.get<Restful<BuildingInformation[]>>('/api/information/classroom/config/build', {params});
}

export async function insertBuilding(params: {
  campus: string,
  name: string,
  nameAlias: string,
  floors: number,
  startFloor: number,
}) {
  return request.post<Restful<BuildingInformation[]>>('/api/information/classroom/config/build', {data: {...params}});
}

export async function updateBuilding(campus: string, name: string, params: {
  campus?: string,
  name?: string,
  nameAlias?: string,
  floors?: number,
  startFloor?: number
}) {
  // console.log('/api/information/classroom/config/build/' + `${campus}/${name}`)
  return request.put<Restful<BuildingInformation>>('/api/information/classroom/config/build' + `/${campus}/${name}`, {data: {...params}});
}

export async function deleteBuilding(params: {
  campus: string,
  name: string,
  nameAlias?: string,
  floors?: number,
  startFloor?: number
}) {
  const {campus, name} = params;
  return request.delete<Restful<BuildingInformation>>('/api/information/classroom/config/build' + `/${campus}/${name}`);
}

export async function getCampus(params: {
  name?: string,
  buildings?: number
}) {
  return request.get<Restful<CampusInformation[]>>('/api/information/classroom/config/campus', {params});
}

export async function updateCampus(prev: string, params: {
  name: string,
  nameAlias: string,
}) {
  return request.put<Restful<CampusInformation>>('/api/information/classroom/config/campus/' + prev, {
    data: {
      name: params.name,
      nameAlias: params.nameAlias
    }
  });
}

export async function insertCampus(params: {
  name: string,
  nameAlias: string,
}) {
  return request.post<Restful<CampusInformation>>('/api/information/classroom/config/campus', {
    data: {
      name: params.name,
      nameAlias: params.nameAlias
    }
  });
}

export async function deleteCampus(prev: string) {
  return request.delete<Restful<CampusInformation>>('/api/information/classroom/config/campus/' + prev);
}

export async function getClassroomCategory(params: {
  name?: string,
}) {
  return request.get<Restful<ClassroomCategoryInformation[]>>('/api/information/classroom/config/category', {params});
}

export async function updateClassroomCategory(prev: string, params: {
  name?: string,
  equipmentList?: EquipmentListConfigure,
}) {
  return request.put<Restful<ClassroomCategoryInformation>>('/api/information/classroom/config/category/' + prev, {
    data: {
      name:params.name,
      equipmentList:params.equipmentList
    }
  });
}

export async function insertClassroomCategory(params: {
  name: string,
  equipmentList?: EquipmentListConfigure,
}) {
  return request.post<Restful<ClassroomCategoryInformation>>('/api/information/classroom/config/category', {
    data: {
      name: params.name,
      equipmentList:params.equipmentList
    }
  });
}

export async function deleteClassroomCategory(prev: string) {
  return request.delete<Restful<ClassroomCategoryInformation>>('/api/information/classroom/config/category/' + prev);
}

export async function getAdministrator(params: {
  name?: string;
  cardID?: string;
  employeeID?: number;
  departmentName?: string;
  sex?: string;
  grade?: number;
  hire?: Moment[] | string[];
  post?: string;
  phone?: string;
  mail?: string;
  status?: string;
  fuzzy?: boolean;
  ASC?: boolean;

}) {
  return request.get<Restful<GenericResult<AdminInformationType[]>>>('/api/information/personnel/config/administrator', {params});
}

export async function getStudent(params: {
  name?: string;
  cardID?: string;
  employeeID?: number;
  departmentName?: string;
  sex?: string;
  grade?: number;
  hire?: Moment[];
  post?: string;
  phone?: string;
  mail?: string;
  status?: string;
  fuzzy?: boolean;
  ASC?: boolean;

}) {
  return request.get<Restful<GenericResult<StudentInformationType[]>>>('/api/information/personnel/config/student', {params});
}

export async function getTeacher(params: {
  name?: string;
  cardID?: string;
  employeeID?: number;
  departmentName?: string;
  sex?: string;
  grade?: number;
  hire?: Moment[];
  post?: string;
  phone?: string;
  mail?: string;
  status?: string;
  fuzzy?: boolean;
  ASC?: boolean;

}) {
  return request.get<Restful<GenericResult<TeacherInformationType[]>>>('/api/information/personnel/config/teacher', {params});
}

export async function getTemporary(params: {
  name?: string;
  cardID?: string;
  employeeID?: number;
  departmentName?: string;
  sex?: string;
  grade?: number;
  hire?: Moment[];
  post?: string;
  phone?: string;
  mail?: string;
  status?: string;
  fuzzy?: boolean;
  ASC?: boolean;

}) {
  return request.get<Restful<GenericResult<TemporaryInformationType[]>>>('/api/information/personnel/config/temporary', {params});
}

export async function getMaintenance(params: {
  name?: string;
  cardID?: string;
  employeeID?: number;
  departmentName?: string;
  sex?: string;
  grade?: number;
  hire?: Moment[];
  post?: string;
  phone?: string;
  mail?: string;
  status?: string;
  fuzzy?: boolean;
  ASC?: boolean;

}) {
  return request.get<Restful<GenericResult<MaintenanceInformationType[]>>>('/api/information/personnel/config/maintenance', {params});
}

export async function getSwipe(params: {
  name?: string;
  cardID?: string;
  department?: string;
  phone?: string;
  mail?: string;
  physicalID?: string;
  time?: Moment[];
  cardNO?: string;
  category?: string;
  ack?: boolean;
  identificationCode?: string;
  fuzzy?: boolean;
  ASC?: boolean;

}, name: string) {
  // console.log(name)
  return request.get<Restful<GenericResult<LogClassroomSwipe[]>>>(`/api/log/swipe/history/${name}`, {params});
}

export async function getICCard(params: {
  name?: string;
  cardID?: string;
  department?: string;
  phone?: string;
  mail?: string;
  physicalID?: string;
  cardNO?: string;
  category?: string;
  identificationCode?: string;
  fuzzy?: boolean;
  ASC?: boolean;

}) {
  // console.log(name)
  return request.get<Restful<GenericResult<ICInformation[]>>>('/api/information/ic/config/icCardInformation', {params});
}



