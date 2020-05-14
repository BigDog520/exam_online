import Vue from 'vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import login from '@/pages/login'
import register from '@/pages/register'
import AddTitle from '@/pages/AddTitle'
import TitleList from '@/pages/TitleList'
import StudentList from '@/pages/StudentList'
import CourseList from '@/pages/CourseList'
import NewCourse from '@/pages/NewCourse'
import ExaminationList from '@/pages/ExaminationList'
import NewExamination from '@/pages/NewExamination'
import AddStudent from '@/pages/AddStudent'
import ClassList from '@/pages/ClassList'
import NewClass from '@/pages/NewClass'
import TeachClass from '@/pages/TeachClass'

// 学生端
import stuindex from '@/pages/student/stuindex'
import StuPage from '@/pages/student/index'
import ExamList from '@/pages/student/ExamList'
import Score from '@/pages/student/Score'
import Exam from '@/pages/student/Exam'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/',
        redirect: 'HomePage'
      }, {
        path: 'HomePage',
        name: 'HelloWorld',
        component: HelloWorld
      }, {
        path: 'TitleList',
        name: 'TitleList',
        component: TitleList
      }, {
        path: 'addTitle',
        name: 'addTitle',
        component: AddTitle
      }, {
        path: 'StudentList',
        name: 'StudentList',
        component: StudentList
      }, {
        path: 'TeachClass',
        name: 'TeachClass',
        component: TeachClass
      }, {
        path: 'ClassList',
        name: 'ClassList',
        component: ClassList
      }, {
        path: 'NewClass',
        name: 'NewClass',
        component: NewClass
      }, {
        path: 'CourseList',
        name: 'CourseList',
        component: CourseList
      }, {
        path: 'NewCourse',
        name: 'NewCourse',
        component: NewCourse
      }, {
        path: 'ExaminationList',
        name: 'ExaminationList',
        component: ExaminationList
      }, {
        path: 'NewExamination',
        name: 'NewExamination',
        component: NewExamination
      }, {
        path: '6-1',
        name: ''
      }, {
        path: 'AddStudent',
        name: 'AddStudent',
        component: AddStudent
      }]
    }, {
      path: '/stuindex',
      name: 'stuindex',
      component: stuindex,
      children: [{
        path: '/',
        redirect: 'StuPage'
      }, {
        path: 'StuPage',
        name: 'StuPage',
        component: StuPage
      }, {
        path: 'ExamList',
        name: 'ExamList',
        component: ExamList
      }, {
        path: 'Score',
        name: 'Score',
        component: Score
      },{
        path:'Exam',
        name:'Exam',
        component:Exam
      }]
    }
  ]
})
