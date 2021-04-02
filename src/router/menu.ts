import {MenuConfigType} from "./data";
import Test from "@/components/Test"
import Admin from "@/pages/eCard/ICCard/admin";
import Error404 from "../error/error404";
import CampusAndBuilding from "../pages/eCard/ClassroomConfig/CampusAndBuilding";
import ClassroomCategoryEdit from "../pages/eCard/ClassroomConfig/ClassroomCategoryEdit";
import ClassroomEdit from "../pages/eCard/ClassroomConfig/ClassroomEdit";
import Administrator from "../pages/eCard/PeopleEdit/administrator";
import Maintenance from "../pages/eCard/PeopleEdit/maintenance";
import Student from "../pages/eCard/PeopleEdit/student";
import Teacher from "../pages/eCard/PeopleEdit/teacher";
import Temporary from "../pages/eCard/PeopleEdit/temporary";
import SwipeDoor from "../pages/eCard/log/SwipeDoor";
import SwipeEquipment from "../pages/eCard/log/SwipeEquipment";

const menus: MenuConfigType[] = [
  {
    path: '/home',
    title: '主页',
    component: Test,
    icon: 'home'
  }, {
    path: '/multimedia',
    title: '多媒体系统',
    component: Test,
    icon: 'home'
  }, {
    path: '/eCard',
    title: '一卡通',
    icon: 'ic-card',
    children: [{
      path: 'log',
      title: '刷卡记录',
      children: [{
        path: 'realEquipment',
        title: '设备实时刷卡',

      }, {
        path: 'realDoor',
        title: '门禁实时刷卡',

      }, {
        path: 'equipment',
        title: '设备历史刷卡',
        component: SwipeEquipment
      }, {
        path: 'door',
        title: '门禁历史刷卡',
        component: SwipeDoor
      },
      ]
    }, {
      path: 'ICCard',
      title: 'IC管理',
      children: [{
        path: 'admin',
        title: '基础信息维护',
        component: Admin
      }, {
        path: 'lock',
        title: '锁卡管理',

      }, {
        path: 'loss',
        title: '挂失管理',

      },
      ]
    }, {
      path: 'people',
      title: '人员信息维护',
      children: [
        {
          path: 'administrator',
          title: '管理人员',
          component: Administrator
        }, {
          path: 'teacher',
          title: '教职员工',
          component: Teacher
        }, {
          path: 'student',
          title: '学生',
          component: Student
        }, {
          path: 'maintenance',
          title: '维护人员',
          component: Maintenance
        }, {
          path: 'temporary',
          title: '临时人员',
          component: Temporary
        },
      ]
    }, {
      path: 'classroomConfig',
      title: '教室管理',
      children: [
        {
          path: 'campusAndBuilding',
          title: '校区及楼栋',
          component: CampusAndBuilding,
        }, {
          path: 'category',
          title: '教室分类配置',
          component: ClassroomCategoryEdit
        }, {
          path: 'classroomEdit',
          title: '教室编辑',
          component: ClassroomEdit
        }
      ]
    }]
  }, {
    path: '/error/404',
    title: undefined,
    component: Error404

  }
];


export default menus;